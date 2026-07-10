-- Camada B: destravar leitura das PRÓPRIAS conversas pelo usuário logado.
-- A migration 20260707 revogou SELECT e criou a política RESTRITIVA
-- "deny all reads", que anula (AND) a permissiva "Users can read own
-- conversations" criada depois. Sem isso, o painel Past Conversations
-- fica sempre vazio. anon segue sem acesso (sem grant); ip_hash e
-- model_used ficam fora do grant de colunas.

DROP POLICY IF EXISTS "deny all reads" ON public.hit_conversations;

GRANT SELECT (id, session_id, user_id, user_message, ai_response, created_at)
  ON public.hit_conversations TO authenticated;
