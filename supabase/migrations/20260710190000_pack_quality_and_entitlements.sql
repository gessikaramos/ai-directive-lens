-- 1) Rastreador de qualidade silencioso (Mary): densidade de adjetivos genéricos
-- no Creative Direction Pack. >3 = LOW_QUALITY_OUTPUT (Walter não elevou o nicho).
ALTER TABLE public.hit_conversations
  ADD COLUMN IF NOT EXISTS generic_adjective_hits smallint;

-- 2) Entitlements: quem tem acesso pago (Founding/Personal/Studio).
-- Fase Founding: linhas inseridas manualmente (dashboard/service role).
-- Stripe (Camada C) passa a gravar aqui via webhook.
CREATE TABLE IF NOT EXISTS public.entitlements (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tier       text NOT NULL DEFAULT 'founding'
             CHECK (tier IN ('founding', 'personal', 'studio')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.entitlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read own entitlement"
ON public.entitlements
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

GRANT SELECT ON public.entitlements TO authenticated;
