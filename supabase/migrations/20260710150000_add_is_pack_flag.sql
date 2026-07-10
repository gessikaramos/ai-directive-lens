-- Marca respostas que contêm um Creative Direction Pack completo (marcador do prompt V2).
-- Usada pelo contador de ciclos da degustação (paywall) e pela métrica de ativação.
ALTER TABLE public.hit_conversations
  ADD COLUMN IF NOT EXISTS is_pack boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS hit_conversations_is_pack_idx
  ON public.hit_conversations (session_id, is_pack) WHERE is_pack;
