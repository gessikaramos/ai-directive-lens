-- Funil novo (canon Gé 11/jul): ambiente fechado — login antes de conversar.
-- Cada conta ganha créditos de degustação; Founding/assinante = ilimitado.
CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits    integer NOT NULL DEFAULT 20 CHECK (credits >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read own credits"
ON public.user_credits
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

GRANT SELECT ON public.user_credits TO authenticated;
