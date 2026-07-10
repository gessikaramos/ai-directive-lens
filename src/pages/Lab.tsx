/**
 * Lab · Wave 3.2 · canon Cláudio+Mary Fred+Gé 8/jul
 *
 * Reorganização canon Gé QA:
 *   - HIT PRIMEIRO (o instrumento ativo lidera a página)
 *   - Instruments grid (roadmap)
 *   - Cast · notify-me (fica no Lab)
 *   - Signal Archive (accordion pequeno · newsletter opt-in agora vive global no Footer)
 *   - StudioExperiments MIGRADO pro Studio
 *   - CollectiveForm MIGRADO pro Studio (retrátil)
 *   - Manifesto Lab dark canon mantido
 *   - Aproximar internamente label→title→sub
 */
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HumanIntentTranslator from '@/components/lab/HumanIntentTranslator';
import { CastTeaser } from '@/components/lab/LabExtras';

const SIGNAL_POSTS = [
  {
    date: 'JUN 2026',
    title: 'Ben Affleck on AI Infrastructure',
    preview:
      'Reading the Sam Altman forum speech. Where cinema keeps misreading the moment — and what an AI-native studio actually looks like.',
  },
];

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const SignalArchive = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="px-6 md:px-12 py-20 md:py-24" style={{ backgroundColor: 'hsl(var(--ink))' }}>
      <div className="max-w-[900px] mx-auto">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-baseline justify-between py-5 transition-opacity duration-500 hover:opacity-80"
          style={{ borderTop: '1px solid #1C1C1E', borderBottom: '1px solid #1C1C1E' }}
        >
          <span style={labelStyle}>Signal · Reads Archive</span>
          <span
            style={{
              color: 'hsl(var(--cool-gray-secondary))',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
            }}
          >
            {open ? '— HIDE' : '+ OPEN'}
          </span>
        </button>
        {open && (
          <div className="pt-8 pb-2">
            {SIGNAL_POSTS.map((p, i) => (
              <article key={i} className="py-6" style={{ borderBottom: '1px solid #1C1C1E' }}>
                <span className="block mb-2" style={labelStyle}>
                  {p.date}
                </span>
                <h3
                  className="mb-2"
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    letterSpacing: '-0.015em',
                    color: '#FFFFFF',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="max-w-[62ch]"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: 'hsl(var(--cool-gray-secondary))',
                  }}
                >
                  {p.preview}
                </p>
              </article>
            ))}
            <p
              className="mt-6"
              style={{
                fontSize: '0.8125rem',
                fontWeight: 300,
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              Subscribe in the footer to get new reads by email.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

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
      <main className="pt-32" style={{ backgroundColor: 'hsl(var(--ink))' }}>
        {/* Manifesto Lab · canon Mary aproximado */}
        <section className="px-6 md:px-12 pt-16 md:pt-24 pb-16 md:pb-20">
          <div className="max-w-[900px] mx-auto text-center">
            <span className="block mb-6" style={labelStyle}>
              LAB
            </span>
            <p
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.018em',
                lineHeight: 1.3,
                color: '#FFFFFF',
              }}
            >
              The lab is where we investigate before we produce.
            </p>
          </div>
        </section>

        {/* HIT · protagonista · vem PRIMEIRO */}
        <section className="px-6 md:px-12 pb-16 md:pb-20">
          <HumanIntentTranslator initialIntent={intent} />
        </section>

        {/* Instruments/Roadmap REMOVIDO do palco (canon Mary 10/jul, análise crua):
            lista de "In Development" ao lado do produto pago lia como projeto
            inacabado. O Translator tem palco exclusivo; futuros instrumentos
            voltam quando estiverem vivos. */}

        {/* Cast · notify me · fica no Lab */}
        <CastTeaser />

        {/* Signal Archive · accordion posts históricos (newsletter foi pro Footer global) */}
        <SignalArchive />

        {/* Back CTA */}
        <section className="px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-[720px] mx-auto text-center">
            <p
              className="italic mb-8"
              style={{
                fontSize: '1.0625rem',
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
              style={labelStyle}
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
