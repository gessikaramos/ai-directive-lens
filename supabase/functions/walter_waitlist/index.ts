// Walter Opening List (canon Gé 11/jul "FINAL CONTENT + CONVERSION PATCH")
// Consentimento e identidade PRÓPRIOS — isolados do consentimento editorial
// de Direction Over Prompt. Sem double opt-in (spec não pede confirmação):
// subscribe grava direto; unsubscribe por link assinado, mesmo padrão do dop.
// Frontend só chama esta função quando WALTER_WAITLIST_ENABLED=true (default
// false). Feature inteira fica inerte até ativação explícita.
import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const UNSUB_SECRET = Deno.env.get("DOP_UNSUB_SECRET") ?? `dop-unsub:${SERVICE_ROLE}`;
const ENVIRONMENT = Deno.env.get("DOP_SITE_URL")?.includes("lolalabstudio.com")
  ? "production"
  : "staging";
const CONSENT_VERSION = "walter-waitlist-v1-2026-07-11";
const MAX_JSON_BODY = 5_000;
const PUBLIC_ACTIONS = new Set(["subscribe", "unsub_info", "unsubscribe_link"]);

const ORIGIN_EXACT = new Set(["http://localhost:5173", "http://localhost:8080"]);
const ORIGIN_PATTERN = /^https:\/\/[a-z0-9-]+\.ai-directive-lens\.pages\.dev$/;
function corsFor(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  const allowed = ORIGIN_EXACT.has(origin) || ORIGIN_PATTERN.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://wave-dop-ch01.ai-directive-lens.pages.dev",
    Vary: "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

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
async function signUnsubToken(uuid: string) {
  return `${uuid}.${(await hmacHex(UNSUB_SECRET, uuid)).slice(0, 32)}`;
}
async function verifyUnsubToken(token: string): Promise<string | null> {
  const m = /^([0-9a-f-]{36})\.([0-9a-f]{32})$/.exec(token ?? "");
  if (!m) return null;
  const expected = (await hmacHex(UNSUB_SECRET, m[1])).slice(0, 32);
  let diff = 0;
  for (let i = 0; i < 32; i++) diff |= expected.charCodeAt(i) ^ m[2].charCodeAt(i);
  return diff === 0 ? m[1] : null;
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

Deno.serve(async (req) => {
  const cors = corsFor(req);
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return json({ error: "unsupported_media_type" }, 415);
  }

  try {
    const raw = await req.text();
    if (raw.length > MAX_JSON_BODY) return json({ error: "payload_too_large" }, 413);
    const body = JSON.parse(raw);
    const action = body?.action;
    if (!PUBLIC_ACTIONS.has(action)) return json({ error: "not_found" }, 404);

    if (action === "subscribe") {
      if (typeof body.website === "string" && body.website.length > 0) {
        return json({ ok: true }); // honeypot: resposta genérica
      }
      const email = String(body.email ?? "").trim().toLowerCase();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || email.length > 320) {
        return json({ error: "invalid_email" }, 400);
      }
      if (body.consent_walter !== true) {
        return json({ error: "consent_required" }, 400);
      }
      const locale = ["pt-BR", "en"].includes(body.locale) ? body.locale : "en";

      const { data: existing } = await admin
        .from("walter_waitlist_readers")
        .select("id, status, updated_at")
        .eq("email", email)
        .maybeSingle();

      if (existing?.updated_at && Date.now() - new Date(existing.updated_at).getTime() < 60_000) {
        return json({ ok: true, state: "joined" }); // rate limit genérico
      }

      const row = {
        email,
        locale,
        source: body.source ? String(body.source).slice(0, 80) : "walter_waitlist",
        environment: ENVIRONMENT,
        consent_walter: true,
        consent_copy_version: CONSENT_VERSION,
        consented_at: new Date().toISOString(),
        status: "active",
        suppressed: false,
        updated_at: new Date().toISOString(),
      };

      if (existing) {
        await admin.from("walter_waitlist_readers").update(row).eq("id", existing.id);
      } else {
        const { error } = await admin.from("walter_waitlist_readers").insert(row);
        if (error) {
          console.error("walter_waitlist insert error", error.code);
          return json({ ok: true, state: "joined" }); // genérico
        }
      }
      console.log("walter_waitlist subscribed", { locale, environment: ENVIRONMENT });
      return json({ ok: true, state: "joined" });
    }

    if (action === "unsub_info") {
      const uuid = await verifyUnsubToken(String(body.token ?? ""));
      if (!uuid) return json({ error: "invalid_token" }, 400);
      const { data: reader } = await admin
        .from("walter_waitlist_readers")
        .select("email, status")
        .eq("unsubscribe_token", uuid)
        .maybeSingle();
      if (!reader) return json({ error: "invalid_token" }, 400);
      return json({ ok: true, email_masked: maskEmail(reader.email), already_unsubscribed: reader.status === "unsubscribed" });
    }

    if (action === "unsubscribe_link") {
      const uuid = await verifyUnsubToken(String(body.token ?? ""));
      if (!uuid) return json({ error: "invalid_token" }, 400);
      const now = new Date().toISOString();
      await admin
        .from("walter_waitlist_readers")
        .update({ status: "unsubscribed", unsubscribed_at: now, suppressed: true, updated_at: now })
        .eq("unsubscribe_token", uuid);
      return json({ ok: true, state: "unsubscribed" });
    }

    return json({ error: "not_found" }, 404);
  } catch (e) {
    console.error("walter_waitlist error", String(e).slice(0, 200));
    return json({ error: "internal" }, 500);
  }
});
