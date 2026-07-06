import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HumanIntentTranslator from '@/components/lab/HumanIntentTranslator';
import StudioExperiments from '@/components/lab/StudioExperiments';
import { CastTeaser, CollectiveForm, SignalReads } from '@/components/lab/LabExtras';

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
      <main className="pt-32">
        {/* Manifesto */}
        <section className="px-6 md:px-12 py-24 md:py-32 bg-background border-b border-ink/5">
          <div className="max-w-[900px] mx-auto text-center">
            <span className="label-style block mb-10" style={{ color: 'hsl(var(--bronze))' }}>
              LAB
            </span>
            {/* Wave 1.2 · Fred/Gé 6/jul · wireframe aprovado pede uma linha só */}
            <div className="text-ink text-2xl md:text-4xl leading-snug" style={{ fontWeight: 300 }}>
              <p>The lab is where we investigate before we produce.</p>
            </div>
          </div>
        </section>

        {/* Instruments · canon Fred/Gé 5/jul · STUDIO·LAB·LIBRARY arquitetura */}
        <section className="px-6 md:px-12 py-16 md:py-20 bg-background border-b border-ink/5">
          <div className="max-w-[900px] mx-auto">
            <span className="label-style block mb-8" style={{ color: 'hsl(var(--bronze))' }}>
              INSTRUMENTS
            </span>
            <div className="space-y-5 max-w-[720px]">
              <p className="text-lg md:text-xl leading-relaxed" style={{ fontWeight: 300, color: 'hsl(30 25% 10%)' }}>
                The Lab is a growing set of instruments for AI-native creative direction.
              </p>
              <p className="text-base text-ink-soft leading-relaxed" style={{ fontWeight: 300 }}>
                Start with the Human Intent Translator. Bring a loose idea. The Lab helps you find its shape.
              </p>
              <p className="text-base text-ink-soft leading-relaxed" style={{ fontWeight: 300 }}>
                Future instruments will help with image direction, video direction, characters, brand worlds and creative systems.
              </p>
            </div>
            <ul className="mt-14 max-w-[540px]">
              <li className="flex justify-between items-baseline border-t border-b border-ink/10 py-4">
                <span className="text-base md:text-lg" style={{ fontWeight: 400, color: 'hsl(30 25% 10%)' }}>
                  Human Intent Translator
                </span>
                <span className="text-xs tracking-[0.2em]" style={{ color: 'hsl(var(--bronze))', fontWeight: 500 }}>
                  ACTIVE
                </span>
              </li>
              <li className="flex justify-between items-baseline border-b border-ink/10 py-4">
                <span className="text-base md:text-lg text-ink-soft" style={{ fontWeight: 400 }}>
                  Image Director
                </span>
                <span className="text-xs tracking-[0.15em] text-ink-soft">IN DEVELOPMENT</span>
              </li>
              <li className="flex justify-between items-baseline border-b border-ink/10 py-4">
                <span className="text-base md:text-lg text-ink-soft" style={{ fontWeight: 400 }}>
                  Video Director
                </span>
                <span className="text-xs tracking-[0.15em] text-ink-soft">IN DEVELOPMENT</span>
              </li>
              <li className="flex justify-between items-baseline border-b border-ink/10 py-4">
                <span className="text-base md:text-lg text-ink-soft" style={{ fontWeight: 400 }}>
                  Character Builder
                </span>
                <span className="text-xs tracking-[0.15em] text-ink-soft">IN DEVELOPMENT</span>
              </li>
              <li className="flex justify-between items-baseline border-b border-ink/10 py-4">
                <span className="text-base md:text-lg text-ink-soft" style={{ fontWeight: 400 }}>
                  Brand World Builder
                </span>
                <span className="text-xs tracking-[0.15em] text-ink-soft">IN DEVELOPMENT</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Human Intent Translator */}
        <section className="px-6 md:px-12 py-16 md:py-20 bg-background border-b border-ink/5">
          <HumanIntentTranslator initialIntent={intent} />
        </section>

        <StudioExperiments />
        <CastTeaser />
        <CollectiveForm />
        <SignalReads />

        <section className="px-6 md:px-12 py-24 bg-background border-t border-ink/5">
          <div className="max-w-[720px] mx-auto text-center">
            <p className="text-ink italic text-lg md:text-xl" style={{ fontWeight: 300 }}>
              The lab keeps growing. Not on a schedule.
            </p>
            <div className="mt-10">
              <Link
                to="/"
                className="label-style underline-offset-4 hover:underline"
                style={{ color: 'hsl(var(--bronze))' }}
              >
                ← BACK TO STUDIO
              </Link>
            </div>
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
