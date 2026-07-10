-- Auditoria de gaps conversacionais (framework Mary 10/jul).
-- Uso interno via SQL editor / service role. Sem grants a anon/authenticated:
-- as views não são expostas ao cliente.

-- 1) Caça às palavras-gatilho: mensagens com sinal de frustração cognitiva.
CREATE OR REPLACE VIEW public.hit_frustration_signals AS
SELECT
  session_id,
  id,
  created_at,
  left(user_message, 200) AS user_message_excerpt
FROM public.hit_conversations
WHERE user_message ~* '(n[ãa]o era (bem )?isso|voc[êe] n[ãa]o entendeu|deixa eu (tentar )?explicar de outro|esquece|, ou seja,)'
;

-- Loop de Alinhamento: sessões com 2+ sinais de frustração (o prompt errou o alvo).
CREATE OR REPLACE VIEW public.hit_alignment_loops AS
SELECT
  session_id,
  count(*)        AS frustration_hits,
  min(created_at) AS first_signal_at,
  max(created_at) AS last_signal_at
FROM public.hit_frustration_signals
GROUP BY session_id
HAVING count(*) >= 2
ORDER BY frustration_hits DESC;

-- 2) Gráfico da Fadiga: tamanho da mensagem do usuário por turno da sessão.
-- Curva saudável = funil (longa -> média -> curta -> Pack). Blocos gigantes no
-- turno 4+ = Walter cansou o usuário sem convergir.
CREATE OR REPLACE VIEW public.hit_fatigue_curve AS
SELECT
  session_id,
  row_number() OVER (PARTITION BY session_id ORDER BY created_at) AS turno,
  length(user_message) AS chars_usuario,
  is_pack,
  created_at
FROM public.hit_conversations;
