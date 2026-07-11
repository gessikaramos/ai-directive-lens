-- Rodada final DOP: unsubscribe nativo + confiabilidade do e-mail 2.
ALTER TABLE public.direction_over_prompt_readers
  ADD COLUMN IF NOT EXISTS unsubscribe_token uuid UNIQUE DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS delivery_email_status text
    CHECK (delivery_email_status IN ('pending','sent','delivered','failed')),
  ADD COLUMN IF NOT EXISTS delivery_email_id text,
  ADD COLUMN IF NOT EXISTS delivery_email_attempts smallint NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS delivery_email_last_error text,
  ADD COLUMN IF NOT EXISTS suppressed boolean NOT NULL DEFAULT false;

UPDATE public.direction_over_prompt_readers
  SET unsubscribe_token = gen_random_uuid()
  WHERE unsubscribe_token IS NULL;

CREATE INDEX IF NOT EXISTS dop_readers_unsub_token_idx
  ON public.direction_over_prompt_readers (unsubscribe_token);
CREATE INDEX IF NOT EXISTS dop_readers_delivery_id_idx
  ON public.direction_over_prompt_readers (delivery_email_id)
  WHERE delivery_email_id IS NOT NULL;
