-- Rastreador de violações da Regra da Pergunta Única (prompt V2).
-- Respostas normais (não-Pack) com 2+ interrogações = o modelo reformulou a
-- mesma pergunta. Leitura semanal junto com hit_frustration_signals.
CREATE OR REPLACE VIEW public.hit_double_questions AS
SELECT
  session_id,
  id,
  created_at,
  (length(ai_response) - length(replace(ai_response, '?', ''))) AS question_marks
FROM public.hit_conversations
WHERE COALESCE(is_pack, false) = false
  AND (length(ai_response) - length(replace(ai_response, '?', ''))) >= 2;
