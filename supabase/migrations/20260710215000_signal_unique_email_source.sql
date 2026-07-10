-- Reservas de livros: o mesmo e-mail pode reservar cada Compendium uma vez.
-- UNIQUE(email) impedia a 2ª reserva; vira UNIQUE(email, source).
ALTER TABLE public.signal_opt_in
  DROP CONSTRAINT IF EXISTS signal_opt_in_email_key;

CREATE UNIQUE INDEX IF NOT EXISTS signal_opt_in_email_source_key
  ON public.signal_opt_in (email, COALESCE(source, ''));
