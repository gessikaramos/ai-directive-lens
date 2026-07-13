-- Migração Stripe → Lemon Squeezy nos pedidos do livro (13/jul). Achado do
-- Cláudio (Cowork) ao canonizar o handoff: já existe canon legal (7/jul,
-- LOLALAB_LEGAL_MINIMUM_PACK_LIBRARY_v1_REVISED.md) especificando Lemon
-- Squeezy como Merchant of Record — a implementação Stripe nunca foi ao ar
-- (sem chave configurada, flag desligada), então trocar aqui é seguro,
-- nenhuma venda real foi afetada.
ALTER TABLE public.library_orders
  DROP COLUMN IF EXISTS stripe_checkout_session_id,
  DROP COLUMN IF EXISTS stripe_payment_intent_id,
  ADD COLUMN IF NOT EXISTS lemonsqueezy_checkout_id text,
  ADD COLUMN IF NOT EXISTS lemonsqueezy_order_id text UNIQUE;
