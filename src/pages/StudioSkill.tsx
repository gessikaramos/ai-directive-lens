/**
 * StudioSkill · página dedicada por skill (8/ago, brief Cláudio).
 *
 * Antes, os 8 skills do Studio só existiam dentro de um modal aberto via
 * hash (/studio#skill/<slug>) — sem URL própria, sem SEO por skill, e sem
 * espaço pra crescer com sample/mídia própria sem espremer tudo no modal.
 * Esta página dá a cada skill uma rota real (/studio/:slug), reusando
 * exatamente o mesmo conteúdo do modal (STUDIO_SKILLS em
 * src/data/studioSkills.tsx) — não duplica prosa, só troca o wrapper.
 *
 * Fundo creme (não ink como o resto do Studio): o modal já inverte pra
 * creme de propósito (canon Gé, "inversão A24"), e a página dedicada
 * mantém essa mesma inversão pra consistência com o que o usuário já viu
 * no modal.
 */
import { useParams, Link, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/hooks/use-language';
import { useSeo } from '@/hooks/use-seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FooterLine from '@/components/FooterLine';
import NotFound from '@/pages/NotFound';
import { STUDIO_SKILLS } from '@/data/studioSkills';

const ink = 'hsl(30 14% 15%)';
const inkSoft = 'hsl(30 10% 38%)';
const bronzeLabel = {
  color: 'hsl(28 35% 45%)',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const StudioSkillContent = ({ slug }: { slug: string }) => {
  const skill = STUDIO_SKILLS.find((s) => s.slug === slug);

  useSeo({
    title: skill ? `${skill.title} · Studio · LolaLab` : 'Studio · LolaLab',
    description: skill ? skill.desc : 'LolaLab Studio.',
    path: `/studio/${slug}`,
  });

  if (!skill) return <NotFound />;

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'hsl(var(--background))', color: ink }}>
        {/* Hero editorial · fundo creme, mesma inversão do modal */}
        <section className="px-6 md:px-12 pt-40 md:pt-56 pb-16 md:pb-24">
          <div className="max-w-[880px] mx-auto text-center">
            <span className="block mb-6" style={bronzeLabel}>
              STUDIO · {skill.title.toUpperCase()}
            </span>
            <h1
              className="mb-5"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                fontWeight: 400,
                letterSpacing: '-0.022em',
                lineHeight: 1.08,
                color: ink,
              }}
            >
              {skill.title}
            </h1>
            <p
              className="max-w-[640px] mx-auto"
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: inkSoft,
              }}
            >
              {skill.desc}
            </p>
          </div>
        </section>

        {/* Conteúdo rico reusado do modal — mesma prosa, mesmos componentes,
            já inclui o CTA "Start a Project" → /contact internamente
            (ModalCTA, dentro de cada *Content). */}
        <section className="px-6 md:px-12 pb-20 md:pb-28">
          <div className="max-w-4xl mx-auto">{skill.content}</div>
        </section>

        {/* Volta pro Studio inteiro — orientação, não fim de linha */}
        <section className="px-6 md:px-12 pb-20 md:pb-28 text-center">
          <Link
            to="/studio"
            className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-500"
            style={{ ...bronzeLabel, color: 'hsl(var(--bronze-soft))' }}
          >
            ← See all Studio disciplines
          </Link>
        </section>

        <FooterLine />
      </main>
      <Footer />
    </>
  );
};

const StudioSkill = () => {
  const { slug } = useParams<{ slug: string }>();
  const valid = STUDIO_SKILLS.some((s) => s.slug === slug);

  if (!slug || !valid) return <NotFound />;

  return (
    <LanguageProvider>
      <StudioSkillContent slug={slug} />
    </LanguageProvider>
  );
};

export default StudioSkill;
