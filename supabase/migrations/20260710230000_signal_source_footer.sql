-- Newsletter do rodapé grava source='footer', que NÃO estava no CHECK —
-- inserts falhavam silenciosamente. Adiciona 'footer' à lista.
ALTER TABLE public.signal_opt_in
  DROP CONSTRAINT IF EXISTS signal_opt_in_source_check;

ALTER TABLE public.signal_opt_in
  ADD CONSTRAINT signal_opt_in_source_check
  CHECK (source IN ('signal', 'cast', 'lab', 'other', 'footer',
                    'book_tactility', 'book_direction_over_prompt'));
