// Human Intent Translator — chat endpoint (open beta)
// Anonymous. Rate-limited by ip_hash. Logs to hit_conversations via service role.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";
// V2 do prompt (secret LOLALAB_FILTER_PROMPT_V2) tem precedência quando setada.
// Rollback instantâneo: apagar o secret V2 e a V1 volta a valer.
const FILTER_PROMPT =
  (Deno.env.get("LOLALAB_FILTER_PROMPT_V2") ?? "").trim() ||
  (Deno.env.get("LOLALAB_FILTER_PROMPT") ?? "");
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
    const { message, sessionId, imageDataUrl } = await req.json();
    if (!message || typeof message !== "string" || !sessionId) {
      return json({ error: "bad_request" }, 400);
    }
    const trimmed = message.slice(0, 2000);

    // Imagem de referência (opcional): data URL validada + teto de ~6MB.
    // V1: a imagem entra no contexto do modelo, mas não é persistida — o
    // histórico guarda o marcador [reference image attached].
    let image: string | null = null;
    if (typeof imageDataUrl === "string" && imageDataUrl.length > 0) {
      if (!/^data:image\/(png|jpe?g|webp|gif);base64,/.test(imageDataUrl)) {
        return json({ error: "bad_image" }, 400);
      }
      if (imageDataUrl.length > 8_000_000) {
        return json({ error: "image_too_large" }, 413);
      }
      image = imageDataUrl;
    }

    const userId = await getUserIdFromAuth(req);

    // Entitlement (Founding/Personal/Studio): controla o frost-glass do Pack no frontend.
    let entitled = false;
    if (userId) {
      const { data: ent } = await admin
        .from("entitlements")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();
      entitled = !!ent;
    }

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
    // 30/h durante a Refinement Phase (QA + testes da Gé no preview).
    // Reavaliar antes do lançamento público (custo gpt-4.1 x degustação).
    if ((count ?? 0) >= 30) {
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

    // v4 — memória de conversa. Se autenticado, memória persiste por user_id
    // (cross-session). Anônimo mantém o comportamento por session_id.
    const historyQuery = admin
      .from("hit_conversations")
      .select("user_message, ai_response")
      .order("created_at", { ascending: true })
      .limit(40);
    const { data: history } = userId
      ? await historyQuery.eq("user_id", userId)
      : await historyQuery.eq("session_id", sessionId);
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
          user_id: userId,
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
    // Cadeia de modelos: tenta o mais avançado disponível na conta e cai de
    // volta sozinho se o ID não existir (à prova de futuro — canon Gé 11/jul).
    const MODEL_CANDIDATES = ["gpt-5.1", "gpt-5", "gpt-4.1"];
    const messages = [
      { role: "system", content: FILTER_PROMPT },
      // v4 — últimos ~12 turnos como contexto (cap pra controlar custo/token)
      ...priorTurns.slice(-12).flatMap((h) => [
        { role: "user", content: h.user_message },
        { role: "assistant", content: h.ai_response },
      ]),
      // Imagem de referência: entra como conteúdo multimodal (detail low
      // controla custo). O Walter lê a imagem como material criativo.
      image
        ? {
            role: "user",
            content: [
              { type: "text", text: trimmed },
              { type: "image_url", image_url: { url: image, detail: "low" } },
            ],
          }
        : { role: "user", content: trimmed },
    ];

    let data: any = null;
    let usedModel = "";
    for (const model of MODEL_CANDIDATES) {
      const params: Record<string, unknown> = { model, messages };
      if (!model.startsWith("gpt-5")) {
        // 0.5–0.6 (QA Mary): acima disso o modelo desobedece a pergunta única
        // e inventa clichê. Família gpt-5 pode não aceitar temperature — omite.
        params.temperature = 0.55;
      }
      const r = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(params),
      });
      if (r.ok) {
        data = await r.json();
        usedModel = model;
        break;
      }
      const txt = await r.text();
      const modelMissing =
        (r.status === 404 || r.status === 400) && /model/i.test(txt);
      console.error("openai error", model, r.status, txt.slice(0, 200));
      if (!modelMissing) break; // erro real (quota, auth): não adianta trocar de modelo
    }

    if (!data) {
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

    const ai_response: string = data?.choices?.[0]?.message?.content?.trim() ?? "";
    const latency_ms = Date.now() - started;

    // Ciclo completo = resposta contendo o marcador fixo do Pack (contrato com o prompt V2).
    // Base do contador de degustação (paywall) e da métrica "Taxa de Ativação do Pack".
    const is_pack = /^##\s+CREATIVE DIRECTION PACK\b/m.test(ai_response);

    // Rastreador de qualidade silencioso (Mary): densidade de adjetivos genéricos no Pack.
    // >3 = o Walter não elevou o nicho e entregou o básico.
    let generic_adjective_hits: number | null = null;
    if (is_pack) {
      const GENERIC_ADJ = /\b(modern[oa]s?|inovador(?:a|es|as)?|prátic[oa]s?|eficientes?|tecnológic[oa]s?)\b/gi;
      generic_adjective_hits = (ai_response.match(GENERIC_ADJ) ?? []).length;
      if (generic_adjective_hits > 3) {
        console.error("LOW_QUALITY_OUTPUT", { sessionId, generic_adjective_hits });
      }
    }

    const { data: inserted, error: insErr } = await admin
      .from("hit_conversations")
      .insert({
        session_id: sessionId,
        user_id: userId,
        // marcador no histórico: turnos futuros sabem que houve referência visual
        user_message: image ? `${trimmed}\n[reference image attached]` : trimmed,
        ai_response,
        latency_ms,
        model_used: usedModel,
        ip_hash,
        is_pack,
        generic_adjective_hits,
      })
      .select("id")
      .single();

    if (insErr) console.error("insert error", insErr);

    // Paywall de utilidade: a camada 6 (prompts técnicos) só sai da API para
    // assinantes. O texto completo fica no banco — vira histórico/contexto e é
    // liberado quando o entitlement chegar. Enforcement no servidor, não no CSS.
    let response_text = ai_response;
    let tech_locked = false;
    if (is_pack && !entitled) {
      const m = ai_response.match(/^6\.\s/m);
      if (m && typeof m.index === "number" && m.index > 0) {
        response_text = ai_response.slice(0, m.index).trimEnd();
        tech_locked = true;
      }
    }

    return json({
      ai_response: response_text,
      message_id: inserted?.id ?? null,
      latency_ms,
      is_pack,
      entitled,
      tech_locked,
    });
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
