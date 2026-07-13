// The LolaLab Compendiums · checkout, webhook e entrega segura dos livros
// pagos (Direction Over Prompt · The Book of Tactility). Camada C do plano
// da Mary (11/jul): Stripe Checkout hospedado (nunca coletamos cartão aqui),
// webhook grava o pedido pago e libera o direito de acesso, e a entrega do
// arquivo sai por URL assinada e temporária do Storage — nunca link estático.
//
// Ações JSON (POST): checkout · access
// Ação por query string (sem JWT, Stripe chama direto): ?action=webhook
import { createClient } from "npm:@supabase/supabase-js@2";

const ORIGIN_EXACT = new Set([
  "http://localhost:5173",
  "http://localhost:8080",
]);
const ORIGIN_PATTERN = /^https:\/\/[a-z0-9-]+\.ai-directive-lens\.pages\.dev$/;

// Mesmo princípio do DOP-QA-ENV-001: allowlist única, produção entra só no GO.
function isAllowedOrigin(origin: string) {
  return ORIGIN_EXACT.has(origin) || ORIGIN_PATTERN.test(origin);
}

function corsFor(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin : new URL(SITE).origin,
    Vary: "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SITE = Deno.env.get("DOP_SITE_URL") ?? "https://wave-dop-ch01.ai-directive-lens.pages.dev";
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET") ?? "";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "";
const MAIL_FROM = "LolaLab Library <library@letters.lolalabstudio.com>";
const MAIL_REPLY_TO = "hello@lolalabstudio.com";
const MAX_JSON_BODY = 10_000;
const MAX_WEBHOOK_BODY = 100_000;
// Order bump (Atelier Bundle) só aparece quando existe de fato um audiobook
// pra entregar. Ligar manualmente no dia em que o arquivo subir no vault.
const BUNDLE_ENABLED = (Deno.env.get("LIBRARY_BUNDLE_ENABLED") ?? "false") === "true";

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

// Catálogo: preço em centavos por produto. "active:false" = manuscrito ainda
// não pronto (ex.: The Book of Tactility) — checkout recusa com clareza.
const CATALOG: Record<string, { title: string; active: boolean }> = {
  book_direction_over_prompt: { title: "Direction Over Prompt", active: true },
  book_tactility: { title: "The Book of Tactility", active: false },
};
const PRICE_CENTS: Record<"digital" | "bundle", number> = { digital: 2900, bundle: 4900 };

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...extra },
  });
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

// ---------- Stripe (fetch cru, form-urlencoded — sem SDK) ----------

function flattenForm(obj: Record<string, unknown>, prefix = "", out: string[] = []) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}[${k}]` : k;
    if (v === undefined || v === null) continue;
    if (typeof v === "object" && !Array.isArray(v)) {
      flattenForm(v as Record<string, unknown>, key, out);
    } else if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (typeof item === "object") flattenForm(item as Record<string, unknown>, `${key}[${i}]`, out);
        else out.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(String(item))}`);
      });
    } else {
      out.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
    }
  }
  return out;
}

async function stripeCreateCheckoutSession(params: Record<string, unknown>) {
  const body = flattenForm(params).join("&");
  const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.error?.message ?? `stripe_${r.status}`);
  return data as { id: string; url: string; payment_intent?: string };
}

// Verificação de assinatura Stripe: header "t=<ts>,v1=<hex>" sobre "<ts>.<payload>".
// Mesma janela anti-replay de 5min já usada no webhook do Resend.
async function verifyStripeSignature(payload: string, sigHeader: string): Promise<boolean> {
  const parts = Object.fromEntries(
    sigHeader.split(",").map((p) => p.split("=") as [string, string]),
  );
  const t = parts["t"];
  const v1 = parts["v1"];
  if (!t || !v1) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const expected = await hmacHex(STRIPE_WEBHOOK_SECRET, `${t}.${payload}`);
  if (expected.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}

// ---------- Resend (mesmo padrão do dop/index.ts) ----------

async function sendReceiptEmail(email: string, bookTitle: string, accessUrl: string) {
  if (!RESEND_API_KEY) return { sent: false, reason: "no_provider" };
  const html = `<!doctype html><html><body style="font-family:Georgia,serif;background:#101012;color:#EDEDED;padding:32px;">
    <div style="max-width:520px;margin:0 auto;">
      <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C7A87C;">LolaLab Library</p>
      <h1 style="font-weight:400;font-size:22px;">Your copy of ${bookTitle} is ready.</h1>
      <p style="font-size:15px;line-height:1.7;">Thank you for your purchase. Your copy is waiting — the link below is personal to you, please don't share it.</p>
      <p style="margin:28px 0;"><a href="${accessUrl}" style="background:#C7A87C;color:#0B0B0C;padding:12px 24px;border-radius:999px;text-decoration:none;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;">Open your library</a></p>
    </div></body></html>`;
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `library-receipt-${accessUrl}`,
    },
    body: JSON.stringify({
      from: MAIL_FROM,
      to: [email],
      reply_to: MAIL_REPLY_TO,
      subject: `Your copy of ${bookTitle} is ready`,
      html,
    }),
  });
  if (r.ok) {
    const data = await r.json();
    return { sent: true, id: data?.id ?? null };
  }
  return { sent: false, error: `${r.status} ${(await r.text()).slice(0, 140)}` };
}

// ---------- ações ----------

async function actionCheckout(payload: any, req: Request) {
  const email = String(payload?.email ?? "").trim().toLowerCase();
  const bookSlug = String(payload?.book_slug ?? "");
  const tier = payload?.product_tier === "bundle" ? "bundle" : "digital";
  if (!email.includes("@")) return json({ ok: false, error: "invalid_email" }, 400);
  const book = CATALOG[bookSlug];
  if (!book || !book.active) return json({ ok: false, error: "book_unavailable" }, 400);
  if (tier === "bundle" && !BUNDLE_ENABLED) return json({ ok: false, error: "bundle_unavailable" }, 400);
  if (!STRIPE_SECRET_KEY) return json({ ok: false, error: "checkout_not_configured" }, 503);

  const origin = isAllowedOrigin(req.headers.get("origin") ?? "") ? req.headers.get("origin")! : SITE;
  const amount = PRICE_CENTS[tier as "digital" | "bundle"];
  const productName = tier === "bundle" ? `${book.title} — Atelier Bundle (PDF + Audiobook)` : `${book.title} — Digital Edition`;

  try {
    const session = await stripeCreateCheckoutSession({
      mode: "payment",
      customer_email: email,
      success_url: `${origin}/library/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/library`,
      line_items: [{
        price_data: {
          currency: "eur",
          unit_amount: amount,
          product_data: { name: productName },
        },
        quantity: 1,
      }],
      metadata: { book_slug: bookSlug, product_tier: tier, email },
    });

    await admin.from("library_orders").insert({
      email,
      book_slug: bookSlug,
      product_tier: tier,
      amount_cents: amount,
      currency: "eur",
      stripe_checkout_session_id: session.id,
      status: "pending",
    });

    return json({ ok: true, url: session.url });
  } catch (e) {
    console.error("checkout error", String(e).slice(0, 200));
    return json({ ok: false, error: "checkout_failed" }, 502);
  }
}

async function actionWebhook(req: Request) {
  const raw = await req.text();
  if (raw.length > MAX_WEBHOOK_BODY) return json({ ok: false }, 413);
  if (!STRIPE_WEBHOOK_SECRET) return json({ ok: false, error: "webhook_not_configured" }, 503);
  const sig = req.headers.get("stripe-signature") ?? "";
  if (!(await verifyStripeSignature(raw, sig))) return json({ ok: false, error: "bad_signature" }, 400);

  const event = JSON.parse(raw);
  if (event.type !== "checkout.session.completed") return json({ ok: true, ignored: true });

  const session = event.data.object;
  const email = String(session.metadata?.email ?? session.customer_email ?? "").toLowerCase();
  const bookSlug = String(session.metadata?.book_slug ?? "");
  const tier = session.metadata?.product_tier === "bundle" ? "bundle" : "digital";
  if (!email || !bookSlug) return json({ ok: false, error: "missing_metadata" }, 400);

  const { data: order } = await admin
    .from("library_orders")
    .update({ status: "paid", paid_at: new Date().toISOString(), stripe_payment_intent_id: session.payment_intent ?? null })
    .eq("stripe_checkout_session_id", session.id)
    .select("id")
    .maybeSingle();

  const { data: entitlement, error: entError } = await admin
    .from("library_entitlements")
    .upsert(
      { email, book_slug: bookSlug, product_tier: tier, order_id: order?.id ?? null },
      { onConflict: "email,book_slug" },
    )
    .select("delivery_token")
    .single();

  if (entError) {
    console.error("entitlement upsert error", entError.message);
    return json({ ok: false, error: "entitlement_failed" }, 500);
  }

  const book = CATALOG[bookSlug];
  const accessUrl = `${SITE}/library/access?token=${entitlement.delivery_token}`;
  await sendReceiptEmail(email, book?.title ?? bookSlug, accessUrl);

  return json({ ok: true });
}

async function actionAccess(payload: any) {
  const token = String(payload?.token ?? "");
  if (!/^[0-9a-f-]{36}$/.test(token)) return json({ ok: false, error: "invalid_token" }, 400);

  const { data: ent } = await admin
    .from("library_entitlements")
    .select("book_slug, product_tier")
    .eq("delivery_token", token)
    .maybeSingle();
  if (!ent) return json({ ok: false, error: "not_found" }, 404);

  const locale = payload?.locale === "pt-br" ? "pt-br" : "en";
  const paths = [`${ent.book_slug}/manuscript_${locale}.pdf`];
  if (ent.product_tier === "bundle") paths.push(`${ent.book_slug}/audiobook_${locale}.m4b`);

  const urls: Record<string, string | null> = {};
  for (const path of paths) {
    const { data, error } = await admin.storage.from("library-vault").createSignedUrl(path, 600);
    urls[path] = error ? null : data.signedUrl;
  }
  return json({ ok: true, book_slug: ent.book_slug, product_tier: ent.product_tier, urls, expires_in: 600 });
}

// ---------- roteador ----------

Deno.serve(async (req) => {
  const cors = corsFor(req);
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  const url = new URL(req.url);
  if (url.searchParams.get("action") === "webhook" && req.method === "POST") {
    return actionWebhook(req);
  }

  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405, cors);

  const raw = await req.text();
  if (raw.length > MAX_JSON_BODY) return json({ ok: false }, 413, cors);
  let payload: any;
  try {
    payload = JSON.parse(raw || "{}");
  } catch {
    return json({ ok: false, error: "bad_json" }, 400, cors);
  }

  let resp: Response;
  if (payload.action === "checkout") resp = await actionCheckout(payload, req);
  else if (payload.action === "access") resp = await actionAccess(payload);
  else resp = json({ ok: false, error: "unknown_action" }, 400);

  const merged = new Headers(resp.headers);
  for (const [k, v] of Object.entries(cors)) merged.set(k, v);
  return new Response(resp.body, { status: resp.status, headers: merged });
});
