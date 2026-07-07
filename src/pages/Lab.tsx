/**
 * Lab · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 *
 * Refactor site-wide:
 *   - Dark ink base coeso (não intercalar cream)
 *   - Manifesto Lab · tipografia refinada Apple
 *   - Instruments grid limpo (não lista bullets)
 *   - HIT container refinado (sem caixa quadrada com espaço gigante)
 *   - Espaçamento controlado 8px system
 *   - Copy canon mantida
 */
import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HumanIntentTranslator from '@/components/lab/HumanIntentTranslator';
import StudioExperiments from '@/components/lab/StudioExperiments';
import { CastTeaser, CollectiveForm, SignalReads } from '@/components/lab/LabExtras';

const INSTRUMENTS = [
  { name: 'Human Intent Translator', status: 'ACTIVE', active: true },
  { name: 'Image Director', status: 'IN DEVELOPMENT', active: false },
  { name: 'Video Director', status: 'IN DEVELOPMENT', active: false },
  { name: 'Character Builder', status: 'IN DEVELOPMENT', active: false },
  { name: 'Brand World Builder', status: 'IN DEVELOPMENT', active: false },
];

const LabContent = () => {
  const [params] = useSearchParams();
  const intent = params.get('intent') ?? undefined;

  useEffect(() => {
    document.title = 'The Lab · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'An investigation into how humans talk to AI.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="pt-32"
        style={{ backgroundColor: 'hsl(var(--ink))' }}
      >
        {/* Manifesto Lab · refinado Apple */}
        <section className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[900px] mx-auto text-center">
            <span
              className="block mb-10"
              style={{
                color: 'hsl(var(--bronze-soft))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              LAB
            </span>
            <p
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.018em',
                lineHeight: 1.3,
                color: 'hsl(var(--background))',
              }}
            >
              The lab is where we investigate before we produce.
            </p>
          </div>
        </section>

        {/* Instruments · grid limpo */}
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[1000px] mx-auto">
            <span
              className="block mb-10"
              style={{
                color: 'hsl(var(--bronze-soft))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              INSTRUMENTS
            </span>
            <div className="max-w-[720px] mb-16">
              <p
                className="mb-4"
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  color: 'hsl(var(--background))',
                }}
              >
                The Lab is a growing set of instruments for AI-native creative direction.
              </p>
              <p
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'hsl(var(--cool-gray-secondary))',
                }}
              >
                Start with the Human Intent Translator. Bring a loose idea. The Lab helps you find its shape.
              </p>
            </div>

            {/* Grid limpo · não lista bullets · uma linha por instrument */}
            <div style={{ borderTop: '1px solid hsl(var(--background) / 0.1)' }}>
              {INSTRUMENTS.map((inst) => (
                <div
                  key={inst.name}
                  className="flex justify-between items-baseline py-5"
                  style={{ borderBottom: '1px solid hsl(var(--background) / 0.1)' }}
                >
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      letterSpacing: '-0.005em',
                      color: inst.active
                        ? 'hsl(var(--background))'
                        : 'hsl(var(--background) / 0.4)',
                    }}
                  >
                    {inst.name}
                  </span>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 500,
                      letterSpacing: '0.2em',
                      color: inst.active
                        ? 'hsl(var(--bronze-soft))'
                        : 'hsl(var(--background) / 0.35)',
                    }}
                  >
                    {inst.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIT · Human Intent Translator */}
        <section className="px-6 md:px-12 py-20 md:py-28">
          <HumanIntentTranslator initialIntent={intent} />
        </section>

        <StudioExperiments />
        <CastTeaser />
        <CollectiveForm />
        <SignalReads />

        <section className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[720px] mx-auto text-center">
            <p
              className="italic mb-10"
              style={{
                fontSize: '1.125rem',
                fontWeight: 300,
                lineHeight: 1.5,
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              The lab keeps growing. Not on a schedule.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-500"
              style={{
                color: 'hsl(var(--bronze-soft))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              <span aria-hidden="true">←</span> BACK TO STUDIO
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const Lab = () => (
  <LanguageProvider>
    <LabContent />
  </LanguageProvider>
);

export default Lab;
