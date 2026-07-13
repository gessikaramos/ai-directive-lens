-- Library checkout (Compendiums): pedidos e direitos de acesso para os livros
-- pagos (Direction Over Prompt, The Book of Tactility). Camada C do plano da
-- Mary — Stripe grava aqui via webhook. ADITIVA: não altera nada em produção.
-- Segue o mesmo padrão de direction_over_prompt_readers: RLS ligada, acesso
-- de escrita/leitura de pedidos exclusivamente via service role (Edge
-- Functions) — cliente nunca lê nem grava um pedido diretamente.

CREATE TABLE IF NOT EXISTS public.library_orders (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                       citext NOT NULL,
  user_id                     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  book_slug                   text NOT NULL,
  product_tier                text NOT NULL CHECK (product_tier IN ('digital', 'bundle')),
  amount_cents                integer NOT NULL,
  currency                    text NOT NULL DEFAULT 'eur',
  stripe_checkout_session_id  text UNIQUE,
  stripe_payment_intent_id    text,
  status                      text NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at                  timestamptz NOT NULL DEFAULT now(),
  paid_at                     timestamptz
);

ALTER TABLE public.library_orders ENABLE ROW LEVEL SECURITY;
-- (nenhuma policy: só service role acessa — mesmo padrão de dop_readers)

CREATE INDEX IF NOT EXISTS library_orders_status_idx
  ON public.library_orders (status);
CREATE INDEX IF NOT EXISTS library_orders_email_idx
  ON public.library_orders (email);

-- Direitos de acesso: gravado pelo webhook após pagamento confirmado.
-- delivery_token cobre o comprador que ainda não tem login (checkout como
-- convidado) — o link seguro do e-mail de confirmação funciona sem sessão,
-- mesma lógica do confirm_token/unsubscribe_token do DOP.
CREATE TABLE IF NOT EXISTS public.library_entitlements (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email          citext NOT NULL,
  user_id        uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  book_slug      text NOT NULL,
  product_tier   text NOT NULL CHECK (product_tier IN ('digital', 'bundle')),
  order_id       uuid REFERENCES public.library_orders(id) ON DELETE SET NULL,
  delivery_token uuid NOT NULL DEFAULT gen_random_uuid(),
  granted_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, book_slug)
);

ALTER TABLE public.library_entitlements ENABLE ROW LEVEL SECURITY;

-- Leitura direta permitida só pro próprio dono logado (dashboard futuro em
-- /library) — mesmo padrão do public.entitlements (Walter). O caminho de
-- entrega real do arquivo passa pela Edge Function library-access, que
-- também aceita delivery_token para quem comprou sem criar conta.
CREATE POLICY "read own library entitlement"
ON public.library_entitlements
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

GRANT SELECT ON public.library_entitlements TO authenticated;

CREATE INDEX IF NOT EXISTS library_entitlements_email_idx
  ON public.library_entitlements (email);
CREATE INDEX IF NOT EXISTS library_entitlements_token_idx
  ON public.library_entitlements (delivery_token);
