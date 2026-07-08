/**
 * Studio · Wave 3.2 · canon Cláudio+Mary Fred+Gé 8/jul
 *
 * Migração canon Gé QA:
 *   - StudioExperiments (15 tiles) MIGRADO do Lab
 *   - Collective retrátil (accordion) MIGRADO do Lab
 *   - MasterChef categoria já refletida (Studio Selected Case)
 *   - Selected Clients mantido cinza escovado #2C2C2E hover #FFFFFF
 *   - Request Allocation CTA canon Mary underline hairline
 *
 * Atmosfera canon Mary: mesa de luz de diretor de criação · dark ink.
 */
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';
import StudioExperiments from '@/components/lab/StudioExperiments';
import { CollectiveForm } from '@/components/lab/LabExtras';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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

// Selected Clients section removida (canon Gé 8/jul · não inflar sem clientes reais nomeáveis)

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const CollectiveAccordion = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="px-6 md:px-12 py-16 md:py-20" style={{ backgroundColor: 'hsl(var(--ink))' }}>
      <div className="max-w-[900px] mx-auto">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-baseline justify-between py-5 transition-opacity duration-500 hover:opacity-80"
          style={{ borderTop: '1px solid #1C1C1E', borderBottom: '1px solid #1C1C1E' }}
        >
          <span style={labelStyle}>Collective · A Quiet Network</span>
          <span
            style={{
              color: 'hsl(var(--cool-gray-secondary))',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
            }}
          >
            {open ? '— HIDE' : '+ APPLY'}
          </span>
        </button>
        {open && (
          <div className="pt-6">
            <CollectiveForm />
          </div>
        )}
      </div>
    </section>
  );
};

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
          <Link
            to="/contact"
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
          </Link>
        </PageHero>

        {/* What we make · grid tipográfico Apple / Collins */}
        <section className="px-6 md:px-12 py-20 md:py-28">
          <div className="max-w-[1200px] mx-auto">
            <span className="block mb-10 md:mb-14" style={labelStyle}>
              What We Make
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {SERVICES.map((service) => (
                <div
                  key={service.number}
                  className="py-10 md:py-14 px-4 md:px-8 transition-colors duration-500 cursor-default"
                  style={{ borderTop: '1px solid #1C1C1E' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = '#1A1A1D';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  <span
                    className="block mb-3"
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
                    className="mb-3"
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
                      color: 'hsl(var(--cool-gray-tertiary))',
                    }}
                  >
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected Clients removida (canon Gé 8/jul) */}

        {/* Studio Experiments · MIGRADO do Lab · 15 tiles editorial */}
        <StudioExperiments />

        {/* Collective retrátil · MIGRADO do Lab · não polui a página */}
        <CollectiveAccordion />

        {/* Closing CTA · Request Allocation canon Mary */}
        <section className="px-6 md:px-12 py-28 md:py-40">
          <div className="max-w-[900px] mx-auto text-center">
            <p
              className="mb-12"
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
