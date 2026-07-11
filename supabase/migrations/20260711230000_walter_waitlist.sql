-- Walter Opening List · consentimento e identidade PRÓPRIOS, isolados do
-- consentimento editorial de Direction Over Prompt (canon Gé 11/jul).
-- Feature atrás de flag desligada (WALTER_WAITLIST_ENABLED) até live QA.
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS public.walter_waitlist_readers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext NOT NULL UNIQUE,
  locale text NOT NULL DEFAULT 'en',
  source text NOT NULL DEFAULT 'walter_waitlist',
  environment text NOT NULL DEFAULT 'staging',
  consent_walter boolean NOT NULL DEFAULT true,
  consent_copy_version text NOT NULL DEFAULT 'walter-waitlist-v1-2026-07-11',
  consented_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  suppressed boolean NOT NULL DEFAULT false,
  unsubscribe_token uuid UNIQUE DEFAULT gen_random_uuid(),
  unsubscribed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS walter_waitlist_unsub_token_idx
  ON public.walter_waitlist_readers (unsubscribe_token);

-- RLS habilitada, ZERO policies: acesso somente via service-role (Edge Function).
ALTER TABLE public.walter_waitlist_readers ENABLE ROW LEVEL SECURITY;
