-- Compendiums: aceitar reservas de livros no signal_opt_in.
-- O CHECK original ('signal','cast','lab','other') rejeitava os slugs dos livros.
ALTER TABLE public.signal_opt_in
  DROP CONSTRAINT IF EXISTS signal_opt_in_source_check;

ALTER TABLE public.signal_opt_in
  ADD CONSTRAINT signal_opt_in_source_check
  CHECK (source IN ('signal', 'cast', 'lab', 'other',
                    'book_tactility', 'book_direction_over_prompt'));
