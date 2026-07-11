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
import SelectedWork from '@/components/CreativePipelineSection';
import StudioSkills from '@/components/studio/StudioSkills';
import { Link } from 'react-router-dom';

// SERVICES genérico removido (canon Gé 10/jul): o What We Make agora usa
// as 8 disciplinas ricas do site antigo (StudioSkills + SkillModalContents).


// Selected Clients section removida (canon Gé 8/jul · não inflar sem clientes reais nomeáveis)

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

// CollectiveAccordion MIGRADO para /signal (canon Gé 10/jul).

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
          compact
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

        {/* What we make · 8 disciplinas do site antigo, com modais ricos */}
        <StudioSkills />

        {/* Selected Clients removida (canon Gé 8/jul) */}

        {/* Selected Work (MasterChef) · MIGRADO da home (canon Gé 10/jul) */}
        <SelectedWork />

        {/* Studio Experiments REMOVIDO (canon Gé 11/jul): sem conteúdo real
            ainda — volta quando os experimentos estiverem vivos. */}


        {/* Closing CTA · Request Allocation canon Mary · Composition Pass:
            a conclusão nasce do trabalho apresentado, sem campo vazio antes */}
        <section className="px-6 md:px-12 py-24 md:py-32">
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
