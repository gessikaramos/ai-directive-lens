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
            <div className="space-y-6 text-ink text-2xl md:text-4xl leading-snug" style={{ fontWeight: 300 }}>
              <p>The lab is where we investigate before we produce.</p>
              <p>Some ideas ship. Some stay here on purpose.</p>
              <p>Direction is decided in the studio, not in the prompt.</p>
            </div>
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
