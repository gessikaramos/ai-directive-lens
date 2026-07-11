-- Wave DOP CH01: leitores do capítulo (captura consentida + double opt-in).
-- ADITIVA: não altera nada de produção. Acesso exclusivamente via Edge Function
-- (service role). RLS ligada SEM políticas públicas = cliente não lê nem escreve.
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS public.direction_over_prompt_readers (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                   citext UNIQUE NOT NULL,
  first_name              text,
  locale                  text NOT NULL,
  locale_interest         text,
  source                  text,
  utm_source              text,
  utm_medium              text,
  utm_campaign            text,
  utm_content             text,
  referrer                text,
  consent_editorial       boolean NOT NULL,
  consent_lolalab_general boolean NOT NULL DEFAULT false,
  consent_copy_version    text NOT NULL,
  consented_at            timestamptz,
  confirm_token           uuid,
  token_expires_at        timestamptz,
  confirmed_at            timestamptz,
  unsubscribed_at         timestamptz,
  status                  text NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','confirmed','unsubscribed','bounced')),
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.direction_over_prompt_readers ENABLE ROW LEVEL SECURITY;
-- (nenhuma policy: só service role acessa)

CREATE INDEX IF NOT EXISTS dop_readers_status_idx
  ON public.direction_over_prompt_readers (status);
CREATE INDEX IF NOT EXISTS dop_readers_token_idx
  ON public.direction_over_prompt_readers (confirm_token) WHERE confirm_token IS NOT NULL;
