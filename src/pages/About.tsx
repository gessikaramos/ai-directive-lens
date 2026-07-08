/**
 * About · Wave 3.1 · canon Mary Editorial Dark Fred+Gé 7/jul
 *
 * Atmosfera canon Mary: créditos finais + tese de bastidores.
 * Fundo #0B0B0C · espaço negativo radical · line-height respirado.
 * Retrato Gé (asset em public/images/about/gessika-portrait.png · profilepicture canon 8/jul).
 * Manifesto em 4 blocos escalonados · primeiro branco puro · demais cinza secondary.
 */
import { useEffect } from 'react';
import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';

const MANIFESTO_PARAGRAPHS = [
  {
    label: 'FOUNDER',
    text: 'LolaLab is founded by Gessika Olivieri in Lisbon. Editorial studio for AI-native cinema. Direction is the craft. Everything else is infrastructure.',
  },
  {
    label: 'THESIS',
    text: 'Artificial intelligence expands possibility. Direction decides what deserves to exist. The bottleneck was never production. It is the specificity of intent.',
  },
  {
    label: 'METHOD',
    text: 'Every project begins with a question, not a prompt. Character bibles before shots. Lighting designed before rendering. Pipelines chosen per shot, not per project.',
  },
  {
    label: 'THE MACHINE',
    text: 'The machine can produce. It cannot know what is yours. LolaLab translates human intention into form — until the machine disappears and only what you meant to say remains.',
  },
];

const AboutContent = () => {
  useEffect(() => {
    document.title = 'About · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'LolaLab translates human intention into form.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'hsl(var(--ink))' }}>
        <PageHero
          label="ABOUT"
          headline="Human intent, in form."
          sub="LolaLab is an editorial studio for AI-native cinema. We translate human intention into visual systems, films, and creative tools."
        />

        {/* Portrait · retrato B&W Gé chiaroscuro */}
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[720px] mx-auto">
            <div
              className="relative overflow-hidden"
              style={{
                aspectRatio: '1 / 1',
                backgroundColor: 'hsl(var(--ink-soft))',
              }}
            >
              <img
                src="/images/about/gessika-portrait.png"
                alt="Gessika Olivieri · Director of LolaLab Studio"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = '0';
                }}
              />
            </div>
            <p
              className="italic mt-6 text-center"
              style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              Gessika Olivieri · Director
            </p>
          </div>
        </section>

        {/* Manifesto · 4 blocos escalonados */}
        <section className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[820px] mx-auto">
            {MANIFESTO_PARAGRAPHS.map((p, i) => (
              <div
                key={p.label}
                data-anim="case-reveal"
                className="mb-24 md:mb-32 last:mb-0"
              >
                <span
                  className="block mb-8"
                  style={{
                    color: 'hsl(var(--bronze-soft))',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                  }}
                >
                  {p.label}
                </span>
                <p
                  style={{
                    fontSize: 'clamp(1.25rem, 2.4vw, 2rem)',
                    fontWeight: 300,
                    letterSpacing: '-0.018em',
                    lineHeight: 1.5,
                    color: i === 0 ? '#FFFFFF' : 'hsl(var(--cool-gray-tertiary))',
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <FooterLine />
      </main>
      <Footer />
    </>
  );
};

const About = () => (
  <LanguageProvider>
    <AboutContent />
  </LanguageProvider>
);

export default About;
