/**
 * Library · Wave 3.1 · canon Mary Editorial Dark Fred+Gé 7/jul
 *
 * Atmosfera canon Mary: arquivo secreto do estúdio.
 * Fundo #0B0B0C · grid tipográfico rigoroso · linhas 1px #1C1C1E.
 * Lista vertical de Volumes (NÃO cards infoproduto).
 * Copy: "Intelligence" · "Professional Analysis" · não "curso".
 */
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';
import Compendiums from '@/components/library/Compendiums';

const VOLUMES = [
  {
    number: 'VOL. 01',
    title: "The Director's Prompt",
    subtitle: 'LolaLab Studio Notes',
    desc: 'The framework we use to translate intention into cinematic syntax. Prompt architecture, character consistency, iteration control.',
    status: 'AVAILABLE',
    eta: '',
    active: true,
  },
  {
    number: 'VOL. 02',
    title: 'Character Consistency',
    subtitle: 'Persistent People, Persistent Worlds',
    desc: 'The method for keeping a character identical across scenes, seasons, and campaigns without breaking realism. Where identity actually lives — face, gesture, light, edit — and how to hold it steady across a whole campaign.',
    status: 'IN DEVELOPMENT',
    eta: 'Coming Q3 2026',
    active: false,
  },
  {
    number: 'VOL. 03',
    title: 'Cinematic Syntax',
    subtitle: 'The Grammar of Direction',
    desc: 'Lens choice, film stock, lighting signature, aspect ratio — the technical vocabulary that separates cinema from generation. A working reference, not a glossary.',
    status: 'IN DEVELOPMENT',
    eta: 'Coming Q3 2026',
    active: false,
  },
  {
    number: 'VOL. 04',
    title: 'AI Pipeline Architecture',
    subtitle: 'Midjourney · Veo · Higgsfield · ElevenLabs',
    desc: 'How we chain best-in-class models per shot, not per project. Cost, speed, and control tradeoffs. Why a pipeline is a decision, not a tool stack.',
    status: 'IN DEVELOPMENT',
    eta: 'Coming Q4 2026',
    active: false,
  },
  {
    number: 'VOL. 05',
    title: 'Post-Production Grade',
    subtitle: 'Color, Sound, Finishing',
    desc: 'What happens after generation. Color pipeline, sound design, delivery specs for premium clients — the last twenty percent that separates a demo from a film.',
    status: 'IN DEVELOPMENT',
    eta: 'Coming Q4 2026',
    active: false,
  },
];

const LibraryContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = 'Library · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        'content',
        'Proprietary intelligence from LolaLab Studio. The method behind the work.',
      );
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'hsl(var(--ink))' }}>
        <PageHero
          label={t('library.label', lang)}
          headline={t('library.hero.headline', lang)}
          sub={t('library.hero.sub', lang)}
        />

        {/* Restricted Archive · grid tipográfico rigoroso */}
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1100px] mx-auto">
            <span
              className="block mb-14"
              style={{
                color: 'hsl(var(--bronze-soft))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              Restricted Archive
            </span>

            <div style={{ borderTop: '1px solid #1C1C1E' }}>
              {VOLUMES.map((v) => (
                <article
                  key={v.number}
                  className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
                  style={{ borderBottom: '1px solid #1C1C1E' }}
                >
                  {/* Coluna 1 · número (2/12) */}
                  <div className="md:col-span-2">
                    <span
                      style={{
                        color: v.active ? 'hsl(var(--bronze-soft))' : '#2C2C2E',
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                      }}
                    >
                      {v.number}
                    </span>
                  </div>

                  {/* Coluna 2 · title + desc (7/12) */}
                  <div className="md:col-span-7">
                    <h3
                      className="mb-2"
                      style={{
                        fontSize: 'clamp(1.375rem, 2.2vw, 2rem)',
                        fontWeight: 400,
                        letterSpacing: '-0.02em',
                        lineHeight: 1.15,
                        color: v.active ? '#FFFFFF' : 'hsl(var(--cool-gray-secondary))',
                      }}
                    >
                      {v.title}
                    </h3>
                    <p
                      className="mb-5"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: v.active
                          ? 'hsl(var(--cool-gray-secondary))'
                          : '#2C2C2E',
                      }}
                    >
                      {v.subtitle}
                    </p>
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 300,
                        lineHeight: 1.65,
                        color: v.active
                          ? 'hsl(var(--cool-gray-secondary))'
                          : '#2C2C2E',
                      }}
                    >
                      {v.desc}
                    </p>
                  </div>

                  {/* Coluna 3 · status + eta (3/12) */}
                  <div className="md:col-span-3 md:text-right">
                    <span
                      className="block"
                      style={{
                        color: v.active ? 'hsl(var(--bronze-soft))' : '#2C2C2E',
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                      }}
                    >
                      {v.status}
                    </span>
                    {v.eta && (
                      <span
                        className="block mt-2"
                        style={{
                          color: '#2C2C2E',
                          fontSize: '0.65rem',
                          fontWeight: 500,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {v.eta}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Editorial note */}
            <p
              className="italic mt-16 md:mt-20 max-w-[620px]"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              The Library grows quarterly. Not on a schedule. Each volume is compiled
              from live studio operations, not theory.
            </p>
          </div>
        </section>

        <Compendiums />

        <FooterLine translationKey="footer.line.library" />
      </main>
      <Footer />
    </>
  );
};

const Library = () => (
  <LanguageProvider>
    <LibraryContent />
  </LanguageProvider>
);

export default Library;
