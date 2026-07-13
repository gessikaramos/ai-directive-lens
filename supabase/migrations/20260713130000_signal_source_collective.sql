-- Rename Signal → Collective (13/jul): SignalReads agora grava source=
-- 'collective', que NÃO estava no CHECK — mesma classe de bug já vista com
-- 'footer' (inserts falhariam silenciosamente). Adiciona 'collective' à
-- lista; mantém 'signal' pelos registros históricos já gravados.
ALTER TABLE public.signal_opt_in
  DROP CONSTRAINT IF EXISTS signal_opt_in_source_check;

ALTER TABLE public.signal_opt_in
  ADD CONSTRAINT signal_opt_in_source_check
  CHECK (source IN ('signal', 'collective', 'cast', 'lab', 'other', 'footer',
                    'book_tactility', 'book_direction_over_prompt'));
