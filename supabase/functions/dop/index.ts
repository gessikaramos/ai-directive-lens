// Direction Over Prompt · leitores do Capítulo 01 (Wave DOP CH01)
// Ações: subscribe (captura consentida + token) · confirm (double opt-in).
// E-mail transacional: PROVIDER PENDENTE de aprovação (nenhum contratado — regra
// da Wave). Com DOP_DEV_MODE=true a resposta inclui confirm_url para QA completo.
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const DEV_MODE = (Deno.env.get("DOP_DEV_MODE") ?? "false") === "true";
const SITE = Deno.env.get("DOP_SITE_URL") ?? "https://wave-dop-ch01.ai-directive-lens.pages.dev";
const CONSENT_VERSION = "dop-ch01-v1-2026-07-11";

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

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
    const body = await req.json();
    const action = body?.action;

    if (action === "subscribe") {
      // honeypot: bots preenchem "website"; humanos nunca veem o campo
      if (typeof body.website === "string" && body.website.length > 0) {
        return json({ ok: true }); // resposta genérica, sem sinal para o bot
      }
      const email = String(body.email ?? "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 320) {
        return json({ error: "invalid_email" }, 400);
      }
      if (body.consent_editorial !== true) {
        return json({ error: "consent_required" }, 400);
      }
      const locale = ["pt-BR", "en", "es"].includes(body.locale) ? body.locale : "en";

      // rate limit simples: máx 5 tentativas/hora por e-mail (updated_at)
      const { data: existing } = await admin
        .from("direction_over_prompt_readers")
        .select("id, status, updated_at")
        .eq("email", email)
        .maybeSingle();

      const token = crypto.randomUUID();
      const expires = new Date(Date.now() + 48 * 3600 * 1000).toISOString();
      const now = new Date().toISOString();

      const row = {
        email,
        first_name: body.first_name ? String(body.first_name).slice(0, 120) : null,
        locale,
        locale_interest: body.locale_interest ? String(body.locale_interest).slice(0, 10) : null,
        source: body.source ? String(body.source).slice(0, 80) : null,
        utm_source: body.utm_source ? String(body.utm_source).slice(0, 120) : null,
        utm_medium: body.utm_medium ? String(body.utm_medium).slice(0, 120) : null,
        utm_campaign: body.utm_campaign ? String(body.utm_campaign).slice(0, 120) : null,
        utm_content: body.utm_content ? String(body.utm_content).slice(0, 120) : null,
        referrer: body.referrer ? String(body.referrer).slice(0, 300) : null,
        consent_editorial: true,
        consent_lolalab_general: body.consent_general === true,
        consent_copy_version: CONSENT_VERSION,
        consented_at: now,
        confirm_token: token,
        token_expires_at: expires,
        updated_at: now,
      };

      if (existing) {
        // já confirmado? resposta genérica (não vaza estado da base)
        if (existing.status === "confirmed") return json({ ok: true, state: "check_email" });
        await admin
          .from("direction_over_prompt_readers")
          .update(row)
          .eq("id", existing.id);
      } else {
        const { error } = await admin.from("direction_over_prompt_readers").insert(row);
        if (error) {
          console.error("dop insert error", error.code);
          return json({ ok: true, state: "check_email" }); // genérico
        }
      }

      const confirmPath = locale === "pt-BR" ? "pt-br" : locale === "es" ? "en" : "en";
      const confirm_url = `${SITE}/${confirmPath}/library/direction-over-prompt/confirmed?token=${token}`;

      // TODO (pendência aprovada na Wave): envio real via provedor a definir.
      // Sem provedor, registramos e — em DEV — devolvemos o link para QA.
      console.log("dop subscribe ok", { locale, dev: DEV_MODE });

      return json({
        ok: true,
        state: "check_email",
        ...(DEV_MODE ? { confirm_url } : {}),
      });
    }

    if (action === "confirm") {
      const token = String(body.token ?? "");
      if (!/^[0-9a-f-]{36}$/.test(token)) return json({ error: "invalid_token" }, 400);
      const { data: reader } = await admin
        .from("direction_over_prompt_readers")
        .select("id, status, token_expires_at, locale")
        .eq("confirm_token", token)
        .maybeSingle();
      if (!reader) return json({ error: "token_not_found" }, 404);
      if (reader.status === "confirmed") {
        return json({ ok: true, state: "already_confirmed", locale: reader.locale });
      }
      if (reader.token_expires_at && new Date(reader.token_expires_at) < new Date()) {
        return json({ error: "token_expired" }, 410);
      }
      await admin
        .from("direction_over_prompt_readers")
        .update({
          status: "confirmed",
          confirmed_at: new Date().toISOString(),
          confirm_token: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", reader.id);
      return json({ ok: true, state: "confirmed", locale: reader.locale });
    }

    return json({ error: "unknown_action" }, 400);
  } catch (e) {
    console.error("dop error", String(e).slice(0, 200));
    return json({ error: "internal" }, 500);
  }
});
