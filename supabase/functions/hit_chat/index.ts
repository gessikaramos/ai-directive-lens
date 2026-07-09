// Human Intent Translator — chat endpoint (open beta)
// Anonymous. Rate-limited by ip_hash. Logs to hit_conversations via service role.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";
const FILTER_PROMPT = Deno.env.get("LOLALAB_FILTER_PROMPT") ?? "";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

async function getUserIdFromAuth(req: Request): Promise<string | null> {
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) return null;
  try {
    const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data } = await client.auth.getUser(token);
    return data?.user?.id ?? null;
  } catch {
    return null;
  }
}

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  try {
    const { message, sessionId } = await req.json();
    if (!message || typeof message !== "string" || !sessionId) {
      return json({ error: "bad_request" }, 400);
    }
    const trimmed = message.slice(0, 2000);

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    const ip_hash = await sha256(ip + "::lolalab_lab");

    // Rate limit: 10 msgs / hour / ip
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await admin
      .from("hit_conversations")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ip_hash)
      .gte("created_at", since);
    if ((count ?? 0) >= 10) {
      return json(
        {
          ai_response:
            "The Lab is processing many ideas right now. You can try again in a few minutes, or write directly to LolaLab at hello@lolalabstudio.com.",
          message_id: null,
          latency_ms: 0,
        },
        200,
      );
    }

    // If filter prompt not configured, gate the Lab.
    if (!FILTER_PROMPT.trim() || !OPENAI_API_KEY) {
      return json({
        ai_response:
          "The Lab is not open yet. Notify me when it launches by writing to hello@lolalabstudio.com.",
        message_id: null,
        latency_ms: 0,
      });
    }

    // v4 — memória de conversa: carrega o histórico desta conversa (por session_id)
    // pra dar contexto ao modelo. Persistência entre sessões chega com login (Camada B).
    const { data: history } = await admin
      .from("hit_conversations")
      .select("user_message, ai_response")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true })
      .limit(40);
    const priorTurns = history ?? [];
    const hasHistory = priorTurns.length > 0;

    // v3.2 — greeting short-circuit (canon Fred 03/jul + briefing Walter).
    // Saudação pura NÃO chama o modelo: resposta fixa, humana, sem funil "criar"
    // ("perguntar antes de assumir" + reduzir fricção). A regex só casa quando a
    // mensagem INTEIRA é composta de tokens de saudação + separadores (ex.: "oi
    // tudo bem?"). v4: só dispara na ABERTURA da conversa (sem histórico) — num
    // "oi" no meio do papo, Walter responde com contexto em vez da copy fixa.
    // Walter = nome INTERNO: a resposta não se autonomeia (público vê "Human Intent Translator").
    const GREETING_RE =
      /^(?:[\s,!?.…]|oi+|ol[áa]|opa|e a[íi]|bom dia|boa tarde|boa noite|tudo bem|tudo bom|tudo certo|como vai|como (?:você|voce) est[áa]|hey+|hi+|hello+|hola|yo|good (?:morning|afternoon|evening)|how are you|how'?s it going)+$/i;
    const PT_GREETING_RE =
      /(oi+|ol[áa]|opa|e a[íi]|bom dia|boa tarde|boa noite|tudo bem|tudo bom|tudo certo|como vai|como (?:você|voce) est)/i;
    if (!hasHistory && GREETING_RE.test(trimmed)) {
      const ai_response = PT_GREETING_RE.test(trimmed)
        ? "Oi — que bom te ver por aqui. Me conta, com tuas próprias palavras, o que você tem em mente. Eu te ajudo a dar forma."
        : "Hey — good to have you here. Tell me, in your own words, what you have in mind. I'll help give it shape.";
      const { data: inserted } = await admin
        .from("hit_conversations")
        .insert({
          session_id: sessionId,
          user_message: trimmed,
          ai_response,
          latency_ms: 0,
          model_used: "greeting_guard_v3.2",
          ip_hash,
        })
        .select("id")
        .single();
      return json({ ai_response, message_id: inserted?.id ?? null, latency_ms: 0 });
    }

    const started = Date.now();
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: FILTER_PROMPT },
          // v4 — últimos ~12 turnos como contexto (cap pra controlar custo/token)
          ...priorTurns.slice(-12).flatMap((h) => [
            { role: "user", content: h.user_message },
            { role: "assistant", content: h.ai_response },
          ]),
          { role: "user", content: trimmed },
        ],
        temperature: 0.7,
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error("openai error", r.status, txt);
      return json(
        {
          ai_response:
            "The Lab is processing many ideas right now. You can try again in a few minutes, or write directly to LolaLab at hello@lolalabstudio.com.",
          message_id: null,
          latency_ms: Date.now() - started,
        },
        200,
      );
    }

    const data = await r.json();
    const ai_response: string = data?.choices?.[0]?.message?.content?.trim() ?? "";
    const latency_ms = Date.now() - started;

    const { data: inserted, error: insErr } = await admin
      .from("hit_conversations")
      .insert({
        session_id: sessionId,
        user_message: trimmed,
        ai_response,
        latency_ms,
        model_used: "gpt-4o-mini",
        ip_hash,
      })
      .select("id")
      .single();

    if (insErr) console.error("insert error", insErr);

    return json({ ai_response, message_id: inserted?.id ?? null, latency_ms });
  } catch (e) {
    console.error(e);
    return json(
      {
        ai_response:
          "The Lab is processing many ideas right now. You can try again in a few minutes, or write directly to LolaLab at hello@lolalabstudio.com.",
        message_id: null,
        latency_ms: 0,
      },
      200,
    );
  }
});
