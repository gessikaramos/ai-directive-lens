/**
 * Collective · /collective (renomeado de "Signal" a pedido da Gé, 13/jul).
 * A área de comunidade da LolaLab: os reads e o formulário do Collective —
 * tudo que era acordeão espalhado em Lab/Studio tem casa própria no menu.
 *
 * Fix 13/jul: a página tinha DOIS formulários de e-mail iguais empilhados
 * (SignalReads + um NewsletterBlock local redundante, ambos gravando na
 * mesma signal_opt_in/source) mais o newsletter global do Footer por cima —
 * três capturas na mesma jornada. Removido o NewsletterBlock local e ligado
 * hideNewsletter no Footer, seguindo a regra "UMA captura por jornada" que
 * toda outra página já respeita (ver Footer.tsx).
 */
import { useEffect } from 'react';
import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CollectiveForm, SignalReads } from '@/components/lab/LabExtras';

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const CollectiveContent = () => {
  useEffect(() => {
    document.title = 'Collective · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute('content', 'Reads, newsletter and the Collective — the quiet network of LolaLab.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-32" style={{ backgroundColor: 'hsl(var(--ink))' }}>
        {/* Reads do estúdio + a única captura de e-mail desta página */}
        <SignalReads />

        {/* Collective · formulário */}
        <section
          className="px-6 md:px-12 py-20 md:py-28"
          style={{ borderTop: '1px solid #1C1C1E' }}
        >
          <div className="max-w-[900px] mx-auto">
            <span className="block mb-4" style={labelStyle}>
              A Quiet Network
            </span>
            <p
              className="mb-10 max-w-[560px]"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              A curated circle of makers we trust with the work. Apply below —
              we read everything, slowly.
            </p>
            <CollectiveForm />
          </div>
        </section>
      </main>
      <Footer hideNewsletter />
    </>
  );
};

const Collective = () => (
  <LanguageProvider>
    <CollectiveContent />
  </LanguageProvider>
);

export default Collective;
