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

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

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

    // v3.1 — greeting guard (canon Fred 03/jul): calor antes de função.
    // Só dispara quando a mensagem é APENAS saudação/small-talk (âncoras ^...$),
    // então "oi, quero um vídeo" NÃO cai aqui — segue fluxo normal.
    const GREETING_RE =
      /^\s*(oi+|ol[áa]|opa|e a[íi]|bom dia|boa tarde|boa noite|tudo bem|tudo bom|como vai|hey+|hi+|hello|hola|yo|good (morning|afternoon|evening)|how are you)\b[\s!?.…,]*$/i;
    const isGreeting = GREETING_RE.test(trimmed);

    const messages = [
      { role: "system", content: FILTER_PROMPT },
      ...(isGreeting
        ? [
            {
              role: "system",
              content:
                "The user sent only a greeting or small-talk. Reply warmly in THE USER'S LANGUAGE: acknowledge the greeting in one line, be present (you are the Lab, not a form), then invite openly what brought them today. Do NOT jump straight to 'what do you want to create?'.",
            },
          ]
        : []),
      { role: "user", content: trimmed },
    ];

    const started = Date.now();
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
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
