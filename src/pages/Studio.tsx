/**
 * Studio · Wave 3.1 · canon Mary Editorial Dark Fred+Gé 7/jul
 *
 * Atmosfera canon Mary: mesa de luz de diretor de criação.
 * Fundo #0B0B0C · texto Apple cinzas frios · clientes cinza escovado #2C2C2E hover #FFFFFF.
 * Inquiry CTA canon underline hairline (não botão preto).
 */
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';

const SERVICES = [
  {
    number: '01',
    name: 'Brand Films',
    desc: 'Editorial short films for global brands. Character consistency across scenes. AI-native pipeline · human direction.',
  },
  {
    number: '02',
    name: 'Campaigns',
    desc: 'Launch films, product hero shots, cinematic teasers. From script to grade in weeks, not months.',
  },
  {
    number: '03',
    name: 'Visual Systems',
    desc: 'Full brand worlds. Character bibles, style guides, motion identity. The syntax of your brand as film.',
  },
  {
    number: '04',
    name: 'Creative Direction',
    desc: 'For campaigns already in flight but needing cinema-grade orchestration. On-set or fully remote.',
  },
];

const CLIENTS = [
  'Confidential · Retail Tech',
  'Pietra · Editorial Study',
  'BeWe · Fashion',
  'Bloom · Beauty',
];

const StudioContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = 'Studio · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'We make the work that moves culture.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'hsl(var(--ink))' }}>
        <PageHero
          label={t('studio.label', lang)}
          headline={t('studio.hero.headline', lang)}
          sub={t('studio.hero.sub', lang)}
        >
          <a
            href="mailto:hello@lolalabstudio.com"
            className="inline-flex items-center gap-3 hover:gap-4 transition-all duration-500"
            style={{
              color: '#FFFFFF',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderBottom: '1px solid #FFFFFF',
              paddingBottom: '4px',
            }}
          >
            {t('studio.cta.inquiry', lang)} <span aria-hidden="true">→</span>
          </a>
        </PageHero>

        {/* What we make · grid tipográfico Apple / Collins */}
        <section className="px-6 md:px-12 py-24 md:py-40">
          <div className="max-w-[1200px] mx-auto">
            <span
              className="block mb-16 md:mb-20"
              style={{
                color: 'hsl(var(--bronze-soft))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              What We Make
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {SERVICES.map((service) => (
                <div
                  key={service.number}
                  className="py-10 md:py-14 px-4 md:px-8 transition-colors duration-500 cursor-default"
                  style={{ borderTop: '1px solid #1C1C1E' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#121214';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <span
                    className="block mb-4"
                    style={{
                      color: 'hsl(var(--bronze-soft))',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      letterSpacing: '0.2em',
                    }}
                  >
                    {service.number}
                  </span>
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      color: '#FFFFFF',
                    }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="max-w-[42ch]"
                    style={{
                      fontSize: '0.9375rem',
                      fontWeight: 300,
                      lineHeight: 1.65,
                      color: 'hsl(var(--cool-gray-secondary))',
                    }}
                  >
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients · nomes cinza escovado #2C2C2E → hover #FFFFFF */}
        <section className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[1200px] mx-auto">
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
              Selected Clients
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {CLIENTS.map((client) => (
                <div
                  key={client}
                  className="transition-colors duration-500 py-5"
                  style={{
                    borderTop: '1px solid #1C1C1E',
                    color: '#2C2C2E',
                    fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.015em',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#2C2C2E';
                  }}
                >
                  {client}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA · Request Allocation canon Mary */}
        <section className="px-6 md:px-12 py-32 md:py-44">
          <div className="max-w-[900px] mx-auto text-center">
            <p
              className="mb-14"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.018em',
                lineHeight: 1.3,
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              We work with a small number of brands per quarter.
            </p>
            <a
              href="mailto:hello@lolalabstudio.com"
              className="inline-flex items-center gap-3 hover:gap-4 transition-all duration-500"
              style={{
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                borderBottom: '1px solid #FFFFFF',
                paddingBottom: '4px',
              }}
            >
              Request Allocation <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        <FooterLine />
      </main>
      <Footer />
    </>
  );
};

const Studio = () => (
  <LanguageProvider>
    <StudioContent />
  </LanguageProvider>
);

export default Studio;
