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
// Resend (aprovado p/ staging pela rodada final): ativa quando a key existir.
// From/Reply-To conforme spec; tracking de open/click DESLIGADO (payload não pede).
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const MAIL_FROM = "LolaLab Library <library@letters.lolalabstudio.com>";
const MAIL_REPLY_TO = "hello@lolalabstudio.com";

function emailTemplates(locale: string, confirmUrl: string) {
  const pt = locale === "pt-BR";
  const unsubNote = pt
    ? "Você recebeu este e-mail porque pediu o Capítulo 01 em lolalabstudio.com. Para cancelar, responda com o assunto UNSUBSCRIBE."
    : "You received this email because you requested Chapter 01 at lolalabstudio.com. To unsubscribe, reply with the subject UNSUBSCRIBE.";
  const subject = pt
    ? "Confirme seu acesso · Direction Over Prompt"
    : "Confirm your access · Direction Over Prompt";
  const body = pt
    ? `Você pediu o Capítulo 01 de Direction Over Prompt.\n\nConfirme seu e-mail para abrir a edição de leitura.\n\n${confirmUrl}\n\n— LolaLab Library\n\n${unsubNote}`
    : `You requested Chapter 01 of Direction Over Prompt.\n\nConfirm your email to open the reader edition.\n\n${confirmUrl}\n\n— LolaLab Library\n\n${unsubNote}`;
  const html = `<!DOCTYPE html><html lang="${pt ? "pt-BR" : "en"}"><body style="margin:0;background:#F7F3EA;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#2A2520;">
  <div style="max-width:520px;margin:0 auto;">
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#8A6B4A;text-transform:uppercase;">LolaLab Library</p>
    <h1 style="font-weight:400;font-size:24px;line-height:1.3;">${pt ? "Você pediu o Capítulo 01 de <em>Direction Over Prompt</em>." : "You requested Chapter 01 of <em>Direction Over Prompt</em>."}</h1>
    <p style="font-size:16px;line-height:1.7;">${pt ? "Confirme seu e-mail para abrir a edição de leitura." : "Confirm your email to open the reader edition."}</p>
    <p style="margin:32px 0;"><a href="${confirmUrl}" style="background:#2A2520;color:#F7F3EA;text-decoration:none;padding:14px 32px;border-radius:9999px;font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">${pt ? "Confirmar e abrir o capítulo" : "Confirm and open the chapter"}</a></p>
    <p style="font-size:12px;color:#6E6257;line-height:1.6;">${pt ? "Se o botão não funcionar, copie este endereço:" : "If the button does not work, copy this address:"}<br><a href="${confirmUrl}" style="color:#8A6B4A;">${confirmUrl}</a></p>
    <hr style="border:none;border-top:1px solid #E4DCCB;margin:32px 0;">
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#6E6257;line-height:1.6;">${unsubNote}</p>
  </div></body></html>`;
  return { subject, text: body, html };
}

function deliveryTemplates(locale: string, readUrl: string, pdfUrl: string) {
  const pt = locale === "pt-BR";
  const unsubNote = pt
    ? "Você recebeu este e-mail porque pediu o Capítulo 01 em lolalabstudio.com. Para cancelar, responda com o assunto UNSUBSCRIBE."
    : "You received this email because you requested Chapter 01 at lolalabstudio.com. To unsubscribe, reply with the subject UNSUBSCRIBE.";
  const subject = pt
    ? "Capítulo 01 · Quando tudo pode ser feito"
    : "Chapter 01 · When Everything Can Be Made";
  const text = pt
    ? `Seu capítulo está pronto.\n\nVocê pode ler no navegador ou guardar a edição em PDF.\n\nLer no navegador: ${readUrl}\nBaixar o PDF: ${pdfUrl}\n\n— LolaLab Library\n\n${unsubNote}`
    : `Your chapter is ready.\n\nYou can read it online or keep the PDF reader edition.\n\nRead online: ${readUrl}\nDownload the PDF: ${pdfUrl}\n\n— LolaLab Library\n\n${unsubNote}`;
  const btn = (href: string, labelTxt: string, solid: boolean) =>
    `<a href="${href}" style="${solid
      ? "background:#2A2520;color:#F7F3EA;"
      : "background:transparent;color:#2A2520;border:1px solid #2A2520;"}text-decoration:none;padding:14px 32px;border-radius:9999px;font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;display:inline-block;margin:0 8px 8px 0;">${labelTxt}</a>`;
  const html = `<!DOCTYPE html><html lang="${pt ? "pt-BR" : "en"}"><body style="margin:0;background:#F7F3EA;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#2A2520;">
  <div style="max-width:520px;margin:0 auto;">
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#8A6B4A;text-transform:uppercase;">LolaLab Library</p>
    <h1 style="font-weight:400;font-size:24px;line-height:1.3;">${pt ? "Seu capítulo está pronto." : "Your chapter is ready."}</h1>
    <p style="font-size:16px;line-height:1.7;">${pt ? "Você pode ler no navegador ou guardar a edição em PDF." : "You can read it online or keep the PDF reader edition."}</p>
    <p style="margin:32px 0;">${btn(readUrl, pt ? "Ler no navegador" : "Read online", true)}${btn(pdfUrl, pt ? "Baixar o PDF" : "Download the PDF", false)}</p>
    <hr style="border:none;border-top:1px solid #E4DCCB;margin:32px 0;">
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#6E6257;line-height:1.6;">${unsubNote}</p>
  </div></body></html>`;
  return { subject, text, html };
}

async function sendDelivery(email: string, locale: string) {
  if (!RESEND_API_KEY || locale === "es") return { sent: false };
  const p = locale === "pt-BR" ? "pt-br" : "en";
  const pdf = locale === "pt-BR"
    ? "Direction_Over_Prompt_CH01_PT-BR_Reader_Edition_v1.pdf"
    : "Direction_Over_Prompt_CH01_EN_Reader_Edition_v1.pdf";
  const t = deliveryTemplates(
    locale,
    `${SITE}/${p}/library/direction-over-prompt/read`,
    `${SITE}/downloads/${pdf}`,
  );
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [email],
      reply_to: MAIL_REPLY_TO,
      subject: t.subject,
      text: t.text,
      html: t.html,
    }),
  });
  if (!r.ok) {
    console.error("resend delivery error", r.status, (await r.text()).slice(0, 180));
    return { sent: false };
  }
  console.log("dop delivery_sent", { locale });
  return { sent: true };
}

async function sendConfirmation(email: string, locale: string, confirmUrl: string) {
  if (!RESEND_API_KEY) return { sent: false, reason: "no_provider" };
  const t = emailTemplates(locale, confirmUrl);
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [email],
      reply_to: MAIL_REPLY_TO,
      subject: t.subject,
      text: t.text,
      html: t.html,
    }),
  });
  if (!r.ok) {
    console.error("resend error", r.status, (await r.text()).slice(0, 180));
    return { sent: false, reason: "provider_error" };
  }
  console.log("dop confirmation_sent", { locale });
  return { sent: true };
}

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

      // Envio real via Resend quando a key existir; caso contrário fica pendente.
      const mail = locale === "es" ? { sent: false, reason: "es_no_email" } : await sendConfirmation(email, locale, confirm_url);
      console.log("dop subscribe ok", { locale, dev: DEV_MODE, sent: mail.sent });

      // Link DEV visível SOMENTE enquanto não há envio real (regra da rodada final).
      const exposeDevLink = DEV_MODE && !mail.sent;
      return json({
        ok: true,
        state: "check_email",
        ...(exposeDevLink ? { confirm_url } : {}),
      });
    }

    if (action === "confirm") {
      const token = String(body.token ?? "");
      if (!/^[0-9a-f-]{36}$/.test(token)) return json({ error: "invalid_token" }, 400);
      const { data: reader } = await admin
        .from("direction_over_prompt_readers")
        .select("id, email, status, token_expires_at, locale")
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

      // E-MAIL 2 (entrega permanente · spec §14): o leitor reencontra o capítulo
      // mesmo se fechar a página de confirmação. Não bloqueia a resposta.
      sendDelivery(reader.email, reader.locale).catch((e) =>
        console.error("delivery send failed", String(e).slice(0, 120)),
      );

      return json({ ok: true, state: "confirmed", locale: reader.locale });
    }

    if (action === "unsubscribe") {
      // idempotente; resposta genérica (não vaza estado da base)
      const email = String(body.email ?? "").trim().toLowerCase();
      if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        await admin
          .from("direction_over_prompt_readers")
          .update({
            status: "unsubscribed",
            unsubscribed_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("email", email);
        console.log("dop unsubscribed");
      }
      return json({ ok: true });
    }

    return json({ error: "unknown_action" }, 400);
  } catch (e) {
    console.error("dop error", String(e).slice(0, 200));
    return json({ error: "internal" }, 500);
  }
});
