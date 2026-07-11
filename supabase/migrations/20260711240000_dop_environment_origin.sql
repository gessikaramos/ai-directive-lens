-- Fecha DOP-QA-ENV-001: environment/site_origin persistidos por leitor,
-- derivados server-side da MESMA allowlist usada no CORS (nunca aceitos
-- livremente do cliente — sem possibilidade de open redirect). Staging e
-- produção passam a poder coexistir no mesmo projeto Supabase sem um leitor
-- de um ambiente receber link do outro.
ALTER TABLE public.direction_over_prompt_readers
  ADD COLUMN IF NOT EXISTS environment text NOT NULL DEFAULT 'staging',
  ADD COLUMN IF NOT EXISTS site_origin text NOT NULL
    DEFAULT 'https://wave-dop-ch01.ai-directive-lens.pages.dev';

-- Registros QA existentes: migração segura, sem apagar dados. O DEFAULT
-- acima já preenche as linhas atuais (todas nasceram em staging).
UPDATE public.direction_over_prompt_readers
  SET environment = 'staging',
      site_origin = 'https://wave-dop-ch01.ai-directive-lens.pages.dev'
  WHERE environment IS NULL OR site_origin IS NULL;

CREATE INDEX IF NOT EXISTS dop_readers_environment_idx
  ON public.direction_over_prompt_readers (environment);
