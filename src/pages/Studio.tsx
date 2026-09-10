/**
 * Studio · Wave 3.2 → Wave "Studio Homepage" (10/set, brief Gé)
 *
 * 10/set: este componente agora renderiza TANTO "/" QUANTO "/studio" (App.tsx
 * monta o mesmo <Studio /> nas duas rotas) — o site vira single-purpose:
 * um visitante (head of production / founder de agência) decidindo se bota
 * o estúdio no roster. A venda do livro (antigo Index.tsx) sai da home e
 * vira /book, só linkado a partir do footer.
 *
 * Ordem canon nova: Hero → Selected Work (prova, 3 blocos) → What We Make
 * (8 disciplinas) → How We Work (novo) → Contact. "The work is the
 * argument. Everything else is caption."
 *
 * Migração canon Gé QA (histórico):
 *   - StudioExperiments (15 tiles) MIGRADO do Lab
 *   - Collective retrátil (accordion) MIGRADO do Lab
 *   - MasterChef categoria já refletida (Studio Selected Case)
 *   - Selected Clients mantido cinza escovado #2C2C2E hover #FFFFFF
 */
import { useEffect } from 'react';
import { useLanguage, LanguageProvider } from '@/hooks/use-language';
import { useSeo } from '@/hooks/use-seo';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';
import SelectedWork from '@/components/CreativePipelineSection';
import StudioSkills from '@/components/studio/StudioSkills';
import HowWeWork from '@/components/HowWeWork';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { STUDIO_SKILL_SLUGS } from '@/data/studioSkills';

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
  const navigate = useNavigate();
  const location = useLocation();

  // 10/set: mesmo componente em "/" e "/studio" — canonical/OG precisam
  // refletir a URL real que a pessoa está vendo, não sempre "/studio".
  useSeo({
    title: 'Studio · LolaLab',
    description: 'We make the work that moves culture.',
    path: location.pathname === '/' ? '/' : '/studio',
  });

  // 8/ago: migra links legados /studio#skill/<slug> (CVs, LinkedIn, share
  // antigos) pra rota dedicada /studio/<slug>. useNavigate + replace, não
  // history.replaceState puro — mutar só a URL não trocaria a árvore de
  // componentes renderizada (StudioSkills continuaria de pé, com o modal
  // tentando abrir), deixando a barra de endereço e a tela dizendo coisas
  // diferentes.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#skill/')) {
      const slug = hash.slice('#skill/'.length);
      if (STUDIO_SKILL_SLUGS.includes(slug)) {
        navigate(`/studio/${slug}`, { replace: true });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        {/* Selected Work · prova primeiro (canon Gé 10/set: "the work is the
            argument, everything else is caption") — 3 blocos: Consistency,
            Wardrobe, Film (MasterChef) */}
        <SelectedWork />

        {/* What we make · 8 disciplinas do site antigo, com modais ricos */}
        <StudioSkills />

        {/* Selected Clients removida (canon Gé 8/jul) */}

        {/* Studio Experiments REMOVIDO (canon Gé 11/jul): sem conteúdo real
            ainda — volta quando os experimentos estiverem vivos. */}

        <HowWeWork />

        {/* Contact · canon Gé 10/set: sem framing de escassez ("small number
            of brands per quarter" saiu) — agência precisa saber que o estúdio
            está disponível e rápido, não que está racionando. */}
        <section id="contact" className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[900px] mx-auto text-center">
            <span className="block mb-8" style={labelStyle}>
              Contact
            </span>
            <a
              href="mailto:hello@lolalabstudio.com"
              className="inline-block mb-10 transition-opacity hover:opacity-70"
              style={{
                color: '#FFFFFF',
                fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
                fontWeight: 300,
                letterSpacing: '-0.015em',
                borderBottom: '1px solid #FFFFFF',
                paddingBottom: '6px',
              }}
            >
              hello@lolalabstudio.com
            </a>
            <div>
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
                Start a Conversation <span aria-hidden="true">→</span>
              </Link>
            </div>
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
