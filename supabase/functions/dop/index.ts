// Direction Over Prompt · leitores do Capítulo 01 (Wave DOP CH01)
// Ações JSON (POST): subscribe · confirm · unsub_info · unsubscribe_link · unsubscribe (fallback legado)
// Ações por query string (sem JWT): ?action=one_click&u=… (RFC 8058) · ?action=webhook (Resend/svix)
// Com DOP_DEV_MODE=true e sem envio real, a resposta expõe confirm_url/unsubscribe_url para QA.
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
const FUNC_URL = `${SUPABASE_URL}/functions/v1/dop`;
const CONSENT_VERSION = "dop-ch01-v1-2026-07-11";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const RESEND_WEBHOOK_SECRET = Deno.env.get("RESEND_WEBHOOK_SECRET") ?? "";
const MAIL_FROM = "LolaLab Library <library@letters.lolalabstudio.com>";
const MAIL_REPLY_TO = "hello@lolalabstudio.com";
// Chave do HMAC do token de unsubscribe (dedicada se existir; senão derivada da service role)
const UNSUB_SECRET = Deno.env.get("DOP_UNSUB_SECRET") ?? `dop-unsub:${SERVICE_ROLE}`;
const MAX_DELIVERY_ATTEMPTS = 3;

// ---------- utilidades ----------

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  return `${local.slice(0, 2)}***@${domain}`;
}

async function hmacHex(key: string, message: string) {
  const k = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Token de unsubscribe: <uuid do leitor>.<HMAC truncado>. O uuid identifica o
// leitor sem expor e-mail; o HMAC impede manipulação; uuid aleatório impede enumeração.
async function signUnsubToken(uuid: string) {
  return `${uuid}.${(await hmacHex(UNSUB_SECRET, uuid)).slice(0, 32)}`;
}

async function verifyUnsubToken(token: string): Promise<string | null> {
  const m = /^([0-9a-f-]{36})\.([0-9a-f]{32})$/.exec(token ?? "");
  if (!m) return null;
  const expected = (await hmacHex(UNSUB_SECRET, m[1])).slice(0, 32);
  // comparação de tempo constante
  let diff = 0;
  for (let i = 0; i < 32; i++) diff |= expected.charCodeAt(i) ^ m[2].charCodeAt(i);
  return diff === 0 ? m[1] : null;
}

function unsubPageUrl(locale: string, token: string) {
  const p = locale === "pt-BR" ? "pt-br" : "en";
  return `${SITE}/${p}/library/direction-over-prompt/unsubscribe?u=${token}`;
}

function oneClickUrl(token: string) {
  return `${FUNC_URL}?action=one_click&u=${encodeURIComponent(token)}`;
}

// ---------- e-mails ----------

function unsubBlock(pt: boolean, unsubUrl: string) {
  const q = pt
    ? "Não quer mais receber comunicações sobre Direction Over Prompt?"
    : "No longer want to receive updates about Direction Over Prompt?";
  const cta = pt ? "Cancelar inscrição" : "Unsubscribe";
  const origin = pt
    ? "Você recebeu este e-mail porque pediu o Capítulo 01 em lolalabstudio.com."
    : "You received this email because you requested Chapter 01 at lolalabstudio.com.";
  return {
    text: `${origin}\n${q}\n${cta}: ${unsubUrl}`,
    html: `<p style="font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#6E6257;line-height:1.6;">${origin}<br>${q}<br><a href="${unsubUrl}" style="color:#8A6B4A;text-decoration:underline;">${cta}</a></p>`,
  };
}

function emailTemplates(locale: string, confirmUrl: string, unsubUrl: string) {
  const pt = locale === "pt-BR";
  const unsub = unsubBlock(pt, unsubUrl);
  const subject = pt
    ? "Confirme seu acesso · Direction Over Prompt"
    : "Confirm your access · Direction Over Prompt";
  const body = pt
    ? `Você pediu o Capítulo 01 de Direction Over Prompt.\n\nConfirme seu e-mail para abrir a edição de leitura.\n\n${confirmUrl}\n\n— LolaLab Library\n\n${unsub.text}`
    : `You requested Chapter 01 of Direction Over Prompt.\n\nConfirm your email to open the reader edition.\n\n${confirmUrl}\n\n— LolaLab Library\n\n${unsub.text}`;
  const html = `<!DOCTYPE html><html lang="${pt ? "pt-BR" : "en"}"><body style="margin:0;background:#F7F3EA;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#2A2520;">
  <div style="max-width:520px;margin:0 auto;">
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:10px;letter-spacing:3px;color:#8A6B4A;text-transform:uppercase;">LolaLab Library</p>
    <h1 style="font-weight:400;font-size:24px;line-height:1.3;">${pt ? "Você pediu o Capítulo 01 de <em>Direction Over Prompt</em>." : "You requested Chapter 01 of <em>Direction Over Prompt</em>."}</h1>
    <p style="font-size:16px;line-height:1.7;">${pt ? "Confirme seu e-mail para abrir a edição de leitura." : "Confirm your email to open the reader edition."}</p>
    <p style="margin:32px 0;"><a href="${confirmUrl}" style="background:#2A2520;color:#F7F3EA;text-decoration:none;padding:14px 32px;border-radius:9999px;font-family:Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;">${pt ? "Confirmar e abrir o capítulo" : "Confirm and open the chapter"}</a></p>
    <p style="font-size:12px;color:#6E6257;line-height:1.6;">${pt ? "Se o botão não funcionar, copie este endereço:" : "If the button does not work, copy this address:"}<br><a href="${confirmUrl}" style="color:#8A6B4A;">${confirmUrl}</a></p>
    <hr style="border:none;border-top:1px solid #E4DCCB;margin:32px 0;">
    ${unsub.html}
  </div></body></html>`;
  return { subject, text: body, html };
}

function deliveryTemplates(locale: string, readUrl: string, pdfUrl: string, unsubUrl: string) {
  const pt = locale === "pt-BR";
  const unsub = unsubBlock(pt, unsubUrl);
  const subject = pt
    ? "Capítulo 01 · Quando tudo pode ser feito"
    : "Chapter 01 · When Everything Can Be Made";
  const text = pt
    ? `Seu capítulo está pronto.\n\nVocê pode ler no navegador ou guardar a edição em PDF.\n\nLer no navegador: ${readUrl}\nBaixar o PDF: ${pdfUrl}\n\n— LolaLab Library\n\n${unsub.text}`
    : `Your chapter is ready.\n\nYou can read it online or keep the PDF reader edition.\n\nRead online: ${readUrl}\nDownload the PDF: ${pdfUrl}\n\n— LolaLab Library\n\n${unsub.text}`;
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
    ${unsub.html}
  </div></body></html>`;
  return { subject, text, html };
}

// Envio via Resend com headers RFC 8058 e retry interno para erros transitórios.
// Retorna { sent, id?, transient?, error? } — nunca lança.
async function resendSend(
  to: string,
  t: { subject: string; text: string; html: string },
  unsubToken: string,
  idempotencyKey: string,
) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({
          from: MAIL_FROM,
          to: [to],
          reply_to: MAIL_REPLY_TO,
          subject: t.subject,
          text: t.text,
          html: t.html,
          headers: {
            "List-Unsubscribe": `<${oneClickUrl(unsubToken)}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
        }),
      });
      if (r.ok) {
        const data = await r.json();
        return { sent: true, id: data?.id ?? null };
      }
      const transient = r.status === 429 || r.status >= 500;
      const errTxt = `${r.status} ${(await r.text()).slice(0, 140)}`;
      if (transient && attempt === 1) {
        await new Promise((res) => setTimeout(res, 700));
        continue;
      }
      return { sent: false, transient, error: errTxt };
    } catch (e) {
      if (attempt === 1) {
        await new Promise((res) => setTimeout(res, 700));
        continue;
      }
      return { sent: false, transient: true, error: String(e).slice(0, 140) };
    }
  }
  return { sent: false, transient: true, error: "unreachable" };
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

type ReaderRow = {
  id: string;
  email: string;
  locale: string;
  status: string;
  suppressed: boolean;
  unsubscribe_token: string | null;
  delivery_email_status: string | null;
  delivery_email_attempts: number;
  consent_lolalab_general: boolean;
  token_expires_at?: string | null;
};

const READER_COLS =
  "id, email, locale, status, suppressed, unsubscribe_token, delivery_email_status, delivery_email_attempts, consent_lolalab_general, token_expires_at";

async function ensureUnsubToken(reader: ReaderRow): Promise<string> {
  if (reader.unsubscribe_token) return reader.unsubscribe_token;
  const uuid = crypto.randomUUID();
  await admin
    .from("direction_over_prompt_readers")
    .update({ unsubscribe_token: uuid })
    .eq("id", reader.id)
    .is("unsubscribe_token", null);
  return uuid;
}

function canEmail(reader: Pick<ReaderRow, "status" | "suppressed">) {
  return !reader.suppressed && reader.status !== "unsubscribed" && reader.status !== "bounced";
}

async function sendConfirmation(reader: ReaderRow, confirmUrl: string) {
  if (!RESEND_API_KEY) return { sent: false, reason: "no_provider" };
  if (!canEmail(reader) || reader.locale === "es") return { sent: false, reason: "suppressed_or_es" };
  const unsubToken = await signUnsubToken(await ensureUnsubToken(reader));
  const t = emailTemplates(reader.locale, confirmUrl, unsubPageUrl(reader.locale, unsubToken));
  const res = await resendSend(reader.email, t, unsubToken, `dop-confirm-${reader.id}`);
  if (!res.sent) {
    console.error("resend confirm error", res.error, maskEmail(reader.email));
    return { sent: false, reason: "provider_error" };
  }
  console.log("dop confirmation_sent", { locale: reader.locale, to: maskEmail(reader.email) });
  return { sent: true };
}

// E-MAIL 2 (entrega permanente). Idempotente por leitor: "claim" atômico do
// estado pending impede envio duplo em confirmações concorrentes; Idempotency-Key
// dop-delivery-<reader.id>-a<N> protege na camada do provedor; máx 3 tentativas.
async function sendDelivery(reader: ReaderRow) {
  if (reader.locale === "es") return { state: "na_es" };
  if (!canEmail(reader)) return { state: "suppressed" };
  if (reader.delivery_email_status === "sent" || reader.delivery_email_status === "delivered") {
    return { state: "already_sent" };
  }
  if (reader.delivery_email_attempts >= MAX_DELIVERY_ATTEMPTS) return { state: "attempts_exhausted" };
  if (!RESEND_API_KEY) {
    // provedor ainda não ativo: fica pendente, sem consumir tentativa
    await admin
      .from("direction_over_prompt_readers")
      .update({ delivery_email_status: "pending", updated_at: new Date().toISOString() })
      .eq("id", reader.id)
      .or("delivery_email_status.is.null,delivery_email_status.eq.pending");
    return { state: "pending_no_provider" };
  }

  // claim atômico: só um processo passa de null/pending/failed → pending
  const attempt = reader.delivery_email_attempts + 1;
  const { data: claimed } = await admin
    .from("direction_over_prompt_readers")
    .update({
      delivery_email_status: "pending",
      delivery_email_attempts: attempt,
      updated_at: new Date().toISOString(),
    })
    .eq("id", reader.id)
    .eq("delivery_email_attempts", reader.delivery_email_attempts)
    .or("delivery_email_status.is.null,delivery_email_status.eq.pending,delivery_email_status.eq.failed")
    .select("id");
  if (!claimed || claimed.length === 0) return { state: "claim_lost" };

  const p = reader.locale === "pt-BR" ? "pt-br" : "en";
  const pdf = reader.locale === "pt-BR"
    ? "Direction_Over_Prompt_CH01_PT-BR_Reader_Edition_v1.pdf"
    : "Direction_Over_Prompt_CH01_EN_Reader_Edition_v1.pdf";
  const unsubToken = await signUnsubToken(await ensureUnsubToken(reader));
  const t = deliveryTemplates(
    reader.locale,
    `${SITE}/${p}/library/direction-over-prompt/read`,
    `${SITE}/downloads/${pdf}`,
    unsubPageUrl(reader.locale, unsubToken),
  );
  const res = await resendSend(reader.email, t, unsubToken, `dop-delivery-${reader.id}-a${attempt}`);

  if (res.sent) {
    await admin
      .from("direction_over_prompt_readers")
      .update({
        delivery_email_status: "sent",
        delivery_email_id: res.id,
        delivery_email_last_error: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", reader.id);
    console.log("dop delivery_sent", { locale: reader.locale, to: maskEmail(reader.email), attempt });
    return { state: "sent" };
  }
  await admin
    .from("direction_over_prompt_readers")
    .update({
      delivery_email_status: "failed",
      delivery_email_last_error: res.error ?? "unknown",
      updated_at: new Date().toISOString(),
    })
    .eq("id", reader.id);
  console.error("dop delivery_failed", { to: maskEmail(reader.email), attempt, error: res.error });
  return { state: "failed" };
}

async function applyUnsubscribe(readerId: string, scope: "dop" | "all") {
  const now = new Date().toISOString();
  const patch: Record<string, unknown> = {
    status: "unsubscribed",
    unsubscribed_at: now,
    suppressed: true,
    updated_at: now,
  };
  if (scope === "all") patch.consent_lolalab_general = false;
  await admin.from("direction_over_prompt_readers").update(patch).eq("id", readerId);
}

// ---------- webhook Resend (assinatura svix) ----------

async function verifySvix(req: Request, payload: string): Promise<boolean> {
  if (!RESEND_WEBHOOK_SECRET) return false;
  const id = req.headers.get("svix-id") ?? "";
  const ts = req.headers.get("svix-timestamp") ?? "";
  const sigHeader = req.headers.get("svix-signature") ?? "";
  if (!id || !ts || !sigHeader) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false; // anti-replay 5 min
  const secret = RESEND_WEBHOOK_SECRET.replace(/^whsec_/, "");
  const keyBytes = Uint8Array.from(atob(secret), (c) => c.charCodeAt(0));
  const k = await crypto.subtle.importKey("raw", keyBytes, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(`${id}.${ts}.${payload}`));
  const expected = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return sigHeader.split(" ").some((part) => part.split(",")[1] === expected);
}

async function handleWebhook(req: Request): Promise<Response> {
  const payload = await req.text();
  if (!(await verifySvix(req, payload))) {
    console.error("dop webhook: assinatura inválida ou secret ausente");
    return new Response("unauthorized", { status: 401 });
  }
  const evt = JSON.parse(payload);
  const type = String(evt?.type ?? "");
  const emailId = evt?.data?.email_id ?? null;
  const to = (evt?.data?.to?.[0] ?? "").toLowerCase();
  const now = new Date().toISOString();

  if (type === "email.delivered" && emailId) {
    await admin
      .from("direction_over_prompt_readers")
      .update({ delivery_email_status: "delivered", updated_at: now })
      .eq("delivery_email_id", emailId);
  } else if (type === "email.bounced") {
    // bounce permanente: marca e suprime qualquer envio futuro
    const q = admin
      .from("direction_over_prompt_readers")
      .update({ status: "bounced", suppressed: true, delivery_email_status: "failed", delivery_email_last_error: "bounced", updated_at: now });
    await (emailId ? q.eq("delivery_email_id", emailId) : q.eq("email", to));
  } else if (type === "email.complained") {
    const q = admin
      .from("direction_over_prompt_readers")
      .update({ suppressed: true, updated_at: now });
    await (emailId ? q.eq("delivery_email_id", emailId) : q.eq("email", to));
  } else if ((type === "email.failed" || type === "email.suppressed") && emailId) {
    await admin
      .from("direction_over_prompt_readers")
      .update({ delivery_email_status: "failed", delivery_email_last_error: type, updated_at: now })
      .eq("delivery_email_id", emailId);
  }
  console.log("dop webhook", { type, matched_by: emailId ? "email_id" : "address" });
  return new Response("ok", { status: 200 });
}

// ---------- servidor ----------

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const url = new URL(req.url);
  const qAction = url.searchParams.get("action");

  // RFC 8058 one-click: provedores de e-mail fazem POST form-encoded direto aqui.
  if (qAction === "one_click" && req.method === "POST") {
    const uuid = await verifyUnsubToken(url.searchParams.get("u") ?? "");
    if (uuid) {
      const { data: reader } = await admin
        .from("direction_over_prompt_readers")
        .select("id")
        .eq("unsubscribe_token", uuid)
        .maybeSingle();
      if (reader) await applyUnsubscribe(reader.id, "dop");
      console.log("dop one_click_unsubscribe", { found: !!reader });
    }
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (qAction === "webhook" && req.method === "POST") return handleWebhook(req);

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

      const { data: existing } = await admin
        .from("direction_over_prompt_readers")
        .select(READER_COLS)
        .eq("email", email)
        .maybeSingle();

      // hard bounce permanece suprimido mesmo com novo pedido (endereço inválido)
      if (existing && existing.status === "bounced") {
        return json({ ok: true, state: "check_email" }); // genérico
      }

      const token = crypto.randomUUID();
      const expires = new Date(Date.now() + 48 * 3600 * 1000).toISOString();
      const now = new Date().toISOString();

      const row: Record<string, unknown> = {
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

      let readerId = existing?.id ?? null;
      if (existing) {
        // já confirmado? resposta genérica (não vaza estado da base)
        if (existing.status === "confirmed") return json({ ok: true, state: "check_email" });
        // re-inscrição após unsubscribe = consentimento novo e explícito → reativa
        if (existing.status === "unsubscribed") {
          row.status = "pending";
          row.suppressed = false;
        }
        await admin.from("direction_over_prompt_readers").update(row).eq("id", existing.id);
      } else {
        const { data: inserted, error } = await admin
          .from("direction_over_prompt_readers")
          .insert(row)
          .select("id")
          .maybeSingle();
        if (error) {
          console.error("dop insert error", error.code);
          return json({ ok: true, state: "check_email" }); // genérico
        }
        readerId = inserted?.id ?? null;
      }

      const { data: fresh } = await admin
        .from("direction_over_prompt_readers")
        .select(READER_COLS)
        .eq("id", readerId)
        .maybeSingle();

      const confirmPath = locale === "pt-BR" ? "pt-br" : "en";
      const confirm_url = `${SITE}/${confirmPath}/library/direction-over-prompt/confirmed?token=${token}`;

      const mail = locale === "es" || !fresh
        ? { sent: false, reason: "es_no_email" }
        : await sendConfirmation(fresh as ReaderRow, confirm_url);
      console.log("dop subscribe ok", { locale, dev: DEV_MODE, sent: mail.sent });

      // Links DEV visíveis SOMENTE enquanto não há envio real (regra da rodada final).
      const exposeDevLink = DEV_MODE && !mail.sent;
      const devUnsub = exposeDevLink && fresh?.unsubscribe_token
        ? unsubPageUrl(locale, await signUnsubToken(fresh.unsubscribe_token))
        : null;
      return json({
        ok: true,
        state: "check_email",
        ...(exposeDevLink ? { confirm_url } : {}),
        ...(devUnsub ? { unsubscribe_url: devUnsub } : {}),
      });
    }

    if (action === "confirm") {
      const token = String(body.token ?? "");
      if (!/^[0-9a-f-]{36}$/.test(token)) return json({ error: "invalid_token" }, 400);
      const { data: reader } = await admin
        .from("direction_over_prompt_readers")
        .select(READER_COLS)
        .eq("confirm_token", token)
        .maybeSingle();
      if (!reader) return json({ error: "token_not_found" }, 404);
      if (reader.status === "confirmed") {
        // reclique no link: oportunidade de retry se o e-mail 2 falhou antes
        sendDelivery(reader as ReaderRow).catch((e) =>
          console.error("delivery retry failed", String(e).slice(0, 120)),
        );
        return json({ ok: true, state: "already_confirmed", locale: reader.locale });
      }
      if (reader.token_expires_at && new Date(reader.token_expires_at) < new Date()) {
        return json({ error: "token_expired" }, 410);
      }
      await admin
        .from("direction_over_prompt_readers")
        // confirm_token é mantido (expira em 48h): reclicar o link do e-mail cai
        // em already_confirmed e re-tenta o e-mail 2 se ele tiver falhado.
        .update({
          status: "confirmed",
          confirmed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", reader.id);

      // E-MAIL 2 (entrega permanente · spec §14). Assíncrono: se falhar, a página
      // de confirmação segue permitindo leitura/download; o estado fica registrado
      // e o reclique do link de confirmação re-tenta (máx 3 tentativas).
      sendDelivery({ ...(reader as ReaderRow), status: "confirmed" }).catch((e) =>
        console.error("delivery send failed", String(e).slice(0, 120)),
      );

      return json({ ok: true, state: "confirmed", locale: reader.locale });
    }

    // Página de unsubscribe pergunta o que existe antes de renderizar as opções.
    if (action === "unsub_info") {
      const uuid = await verifyUnsubToken(String(body.token ?? ""));
      if (!uuid) return json({ error: "invalid_token" }, 400);
      const { data: reader } = await admin
        .from("direction_over_prompt_readers")
        .select(READER_COLS)
        .eq("unsubscribe_token", uuid)
        .maybeSingle();
      if (!reader) return json({ error: "invalid_token" }, 400);
      return json({
        ok: true,
        locale: reader.locale,
        email_masked: maskEmail(reader.email),
        has_general_consent: reader.consent_lolalab_general === true,
        already_unsubscribed: reader.status === "unsubscribed",
      });
    }

    // Unsubscribe nativo por token assinado. Idempotente; sem login, sem redigitar
    // e-mail, sem e-mail de confirmação do cancelamento.
    if (action === "unsubscribe_link") {
      const uuid = await verifyUnsubToken(String(body.token ?? ""));
      if (!uuid) return json({ error: "invalid_token" }, 400);
      const scope = body.scope === "all" ? "all" : "dop";
      const { data: reader } = await admin
        .from("direction_over_prompt_readers")
        .select("id, status")
        .eq("unsubscribe_token", uuid)
        .maybeSingle();
      if (!reader) return json({ error: "invalid_token" }, 400);
      await applyUnsubscribe(reader.id, scope);
      console.log("dop unsubscribed_via_link", { scope, repeat: reader.status === "unsubscribed" });
      return json({ ok: true, state: "unsubscribed", scope });
    }

    if (action === "unsubscribe") {
      // fallback legado (reply-based, processado manualmente); idempotente e genérico
      const email = String(body.email ?? "").trim().toLowerCase();
      if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        await admin
          .from("direction_over_prompt_readers")
          .update({
            status: "unsubscribed",
            unsubscribed_at: new Date().toISOString(),
            suppressed: true,
            updated_at: new Date().toISOString(),
          })
          .eq("email", email);
        console.log("dop unsubscribed (fallback)");
      }
      return json({ ok: true });
    }

    return json({ error: "unknown_action" }, 400);
  } catch (e) {
    console.error("dop error", String(e).slice(0, 200));
    return json({ error: "internal" }, 500);
  }
});
