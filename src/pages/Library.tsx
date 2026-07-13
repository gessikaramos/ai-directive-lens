/**
 * Library · Wave DOP CH01 (11/jul/2026) · reconstrução editorial cream/paper.
 * Canon: LOLALAB_LIBRARY_VISUAL_WIREFRAME_v2_APPROVED (estrutura/tipografia/motion)
 * "Papel para explicar": fundo cream, texto ink, bronze contido.
 *
 * ATUALIZAÇÃO (13/jul): a spec original desta wave era "SEM loja, SEM preços,
 * SEM pré-venda" — revertida por pedido explícito da Gé, que passa a incluir
 * os Compendiums (venda do livro) nesta página. Checkout real fica atrás de
 * LIBRARY_CHECKOUT_ENABLED (ver Compendiums.tsx); Tactility segue sem venda
 * (manuscrito não pronto).
 */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { track } from '@/lib/analytics';
import Compendiums from '@/components/library/Compendiums';

const ink = 'hsl(30 14% 15%)';
const inkSoft = 'hsl(30 10% 38%)';
const bronzeLabel = {
  color: 'hsl(28 35% 45%)',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const LibraryContent = () => {
  useEffect(() => {
    document.title = 'Library · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        'content',
        'Essays, books and working methods on direction, authorship and creative systems. From LolaLab.',
      );
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'hsl(var(--background))', color: ink }}>
        {/* A · HERO · Composition Pass: mais escala, menos vazio morto — o
            hero conduz direto ao objeto principal (uma ideia por viewport). */}
        <section className="px-6 md:px-12 pt-40 md:pt-48 pb-16 md:pb-20 text-center">
          <div className="max-w-[880px] mx-auto">
            <span className="block mb-6" style={bronzeLabel}>
              LIBRARY
            </span>
            <h1
              className="mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 4.6vw, 3.875rem)',
                fontWeight: 400,
                letterSpacing: '-0.022em',
                lineHeight: 1.08,
                color: ink,
              }}
            >
              Practical knowledge for creative minds.
            </h1>
            <p
              className="mx-auto max-w-[640px]"
              style={{ fontSize: '1.125rem', fontWeight: 300, lineHeight: 1.6, color: inkSoft }}
            >
              Essays, books and working methods on direction, authorship and creative
              systems.
            </p>
          </div>
        </section>

        {/* B · FEATURED RELEASE · DOP CH01 */}
        <section
          className="px-6 md:px-12 py-20 md:py-32"
          style={{ borderTop: '1px solid hsl(30 14% 15% / 0.1)' }}
        >
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            {/* Capa editorial */}
            <div className="md:col-span-5 flex justify-center md:justify-start">
              <div
                className="w-[260px] h-[368px] px-8 py-10 flex flex-col justify-between"
                style={{
                  backgroundColor: 'hsl(var(--ink))',
                  boxShadow: '16px 22px 50px rgba(42,37,32,0.28)',
                }}
              >
                <span style={{ ...bronzeLabel, fontSize: '0.55rem', color: 'hsl(var(--bronze-soft))' }}>
                  CHAPTER 01
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Newsreader', Georgia, serif",
                      fontSize: '1.875rem',
                      fontWeight: 400,
                      lineHeight: 1.12,
                      letterSpacing: '-0.01em',
                      color: '#FFFFFF',
                    }}
                  >
                    Direction Over Prompt
                  </h3>
                  <p
                    className="mt-3"
                    style={{
                      fontFamily: "'Newsreader', Georgia, serif",
                      fontStyle: 'italic',
                      fontSize: '0.9375rem',
                      color: 'hsl(var(--background) / 0.6)',
                    }}
                  >
                    When Everything Can Be Made
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '0.55rem',
                    fontWeight: 500,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color: 'hsl(var(--background) / 0.45)',
                  }}
                >
                  Gessika Olivieri · LolaLab
                </span>
              </div>
            </div>

            {/* Texto */}
            <div className="md:col-span-7">
              <span className="block mb-4" style={bronzeLabel}>
                NEW RELEASE · CHAPTER 01
              </span>
              <h2
                className="mb-2"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: 'clamp(1.875rem, 3.2vw, 2.75rem)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  color: ink,
                }}
              >
                Direction Over Prompt
              </h2>
              <p
                className="mb-5"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontStyle: 'italic',
                  fontSize: '1.125rem',
                  color: inkSoft,
                }}
              >
                When Everything Can Be Made
              </p>
              <p
                className="mb-8 max-w-[54ch]"
                style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, color: inkSoft }}
              >
                An essay by Gessika Olivieri on direction, judgment and authorship in the
                age of synthetic media.
              </p>
              <span style={{ ...bronzeLabel, fontSize: '0.6rem' }}>PT-BR · EN</span>
            </div>
          </div>

          {/* Composition Pass · a PROVA antes da ação: página real da edição
              (prosa aprovada, sem tradução improvisada) → tese ampliada → CTA.
              Sequência claim → objeto → detalhe → frase → ação. */}
          <div className="max-w-[1100px] mx-auto mt-16 md:mt-24">
            <div
              className="mx-auto max-w-[680px] px-8 md:px-12 py-10 md:py-12"
              style={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(30 14% 15% / 0.12)',
                boxShadow: '0 18px 48px rgba(42,37,32,0.10)',
              }}
            >
              <p className="mb-6" style={{ ...bronzeLabel, fontSize: '0.55rem' }}>
                READER EDITION · CHAPTER 01 · PAGE ONE
              </p>
              <div
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: '1.0625rem',
                  lineHeight: 1.8,
                  color: ink,
                }}
              >
                <p className="mb-4">She appears again.</p>
                <p className="mb-4">
                  A woman who never existed, photographed in a place that may not exist
                  either.
                </p>
                <p style={{ color: inkSoft }}>
                  Nothing is wrong. That is precisely why something is deeply wrong.
                </p>
              </div>
            </div>

            <p
              className="mt-16 md:mt-20 text-center mx-auto max-w-[26ch]"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: 'clamp(1.625rem, 3.2vw, 2.5rem)',
                fontWeight: 300,
                lineHeight: 1.35,
                letterSpacing: '-0.015em',
                color: ink,
              }}
            >
              Tools generate possibilities.{' '}
              <span style={{ color: 'hsl(28 35% 45%)' }}>Direction chooses meaning.</span>
            </p>

            <div className="mt-12 text-center">
              <Link
                to="/library/direction-over-prompt"
                onClick={() => track('dop_library_featured_click')}
                className="inline-block px-10 py-4 transition-all duration-300 hover:opacity-85"
                style={{
                  backgroundColor: ink,
                  color: 'hsl(var(--background))',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                Read Chapter 01 →
              </Link>
            </div>
          </div>
        </section>

        {/* C · THE LOLALAB COMPENDIUMS · venda dos livros (13/jul, pedido Gé).
            Compendiums.tsx foi desenhado pra fundo escuro (texto branco) —
            a Library é cream, então a seção vira uma faixa escura de
            propósito (contraste editorial), não bug de estilo. */}
        <div style={{ backgroundColor: '#0B0B0C' }}>
          <Compendiums />
        </div>

        {/* D · ESSAYS · somente conteúdo real */}
        <section
          className="px-6 md:px-12 py-16 md:py-24"
          style={{ borderTop: '1px solid hsl(30 14% 15% / 0.1)' }}
        >
          <div className="max-w-[1100px] mx-auto">
            <span className="block mb-8" style={bronzeLabel}>
              FROM SIGNAL · READS
            </span>
            <article className="max-w-[720px]">
              <span
                className="block mb-2"
                style={{ ...bronzeLabel, fontSize: '0.6rem', color: inkSoft }}
              >
                JUN 2026
              </span>
              <h3
                className="mb-3"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: ink,
                }}
              >
                Ben Affleck on AI Infrastructure
              </h3>
              <p style={{ fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.7, color: inkSoft }}>
                Reading the Sam Altman forum speech. Where cinema keeps misreading the
                moment — and what an AI-native studio actually looks like.
              </p>
              <a
                href="https://www.linkedin.com/posts/gessikaolivieri_lolalabstudio-aistorytelling-creativedirection-ugcPost-7468316179032506368-utde/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAOhXU8B7ZIAU4iD8LavzZrMt75WJHizo7Q"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-500 mt-4"
                style={bronzeLabel}
              >
                Read on Signal <span aria-hidden="true">→</span>
              </a>
            </article>
          </div>
        </section>

        {/* E · FINAL CTA · fecho silencioso · Composition Pass: mais próximo
            do arco anterior — conclusão, não seção solta */}
        <section
          className="px-6 md:px-12 py-20 md:py-24 text-center"
          style={{ borderTop: '1px solid hsl(30 14% 15% / 0.1)' }}
        >
          <div className="max-w-[640px] mx-auto">
            <p
              className="mb-8"
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: 'clamp(1.375rem, 2.4vw, 1.875rem)',
                fontWeight: 300,
                lineHeight: 1.4,
                color: ink,
              }}
            >
              Read the chapter. Join the readers shaping what comes next.
            </p>
            <Link
              to="/library/direction-over-prompt"
              onClick={() => track('dop_library_closing_click')}
              className="inline-block px-9 py-3.5 transition-all duration-300 hover:opacity-85"
              style={{
                backgroundColor: ink,
                color: 'hsl(var(--background))',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Open Direction Over Prompt →
            </Link>
          </div>
        </section>
      </main>
      <Footer hideNewsletter />
    </>
  );
};

const Library = () => (
  <LanguageProvider>
    <LibraryContent />
  </LanguageProvider>
);

export default Library;
