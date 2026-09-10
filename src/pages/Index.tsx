/**
 * Book page (was Home) · v3.3 · Wave 2.1 · canon Fred+Gé 7/jul
 *
 * 10/set: deixou de ser a home — /  agora renderiza Studio.tsx (brief Gé,
 * site vira single-purpose pitch pra agência). Este componente passou a
 * viver em /book, só linkado a partir do footer. Nome do arquivo
 * (Index.tsx) ficou como estava de propósito — ver App.tsx.
 *
 * Estrutura canon Wave 2.1:
 *   Hero → Statement → Choose your path → Selected Work → Manifesto Slice → About preview → Contact preview → Footer line
 *
 * Upgrade Wave 2.1 sobre Wave 2.0:
 *   - Statement mais forte (tipografia editorial grande · parallax horizontal canon)
 *   - Selected Work MasterChef reveal cinematográfico
 *   - Selected Work Pietra ganha FOTÃO editorial (campaign-bottega.jpg)
 *   - Manifesto Slice NOVO · bloco dark ink · cream text · sem CTA · sem imagem
 *
 * Regras Wave 2.0 mantidas:
 *   - HIT mini removida da Home (LabEntry) · HIT vive só em /lab
 *   - "What we do" 4 tiles removida da Home (SkillsSection) · vai pra /studio em Wave 5
 *   - About preview curto · full em /about
 *   - Contact preview curto · full em /contact
 *   - Choose your path canon-mestre: Studio → Lab → Library
 *   - Footer line canon: "Learn the method. Shape the idea. Build the work."
 */
import { LanguageProvider } from '@/hooks/use-language';
import { useLenis } from '@/hooks/use-lenis';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import { useSeo } from '@/hooks/use-seo';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DopLaunchBlock from '@/components/DopLaunchBlock';
import StatementSection from '@/components/StatementSection';
import ManifestoSlice from '@/components/ManifestoSlice';
import HomeAboutPreview from '@/components/HomeAboutPreview';
import HomeContactPreview from '@/components/HomeContactPreview';
import FooterLine from '@/components/FooterLine';
import Footer from '@/components/Footer';

const IndexContent = () => {
  useLenis();
  useScrollAnimations();
  useSeo({
    title: 'LolaLab — Human intention, made visible. · Direction Over Prompt',
    description:
      'LolaLab is a creative direction studio and editorial system for deciding what deserves to exist when AI makes production abundant.',
    path: '/book',
  });

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* Composition Pass (canon Gé+Fred 11/jul): hero cinematográfico →
            pausa → TESE → o acontecimento editorial (DOP) como prova da tese
            → caminhos da casa. A tese prepara; o capítulo responde. */}
        <StatementSection />
        <DopLaunchBlock />
        {/* ChoosePathSection removida (10/set, brief Gé): oferecia só Studio·
            Lab·Library — Lab não pode ser linkado de lugar nenhum do site, e
            um card sozinho (Studio, já no nav) não justificava a seção. */}
        {/* Selected Work (MasterChef) MIGRADO para /studio (canon Gé 10/jul):
            o destaque de case pertence à casa do Studio, não à home. */}
        <ManifestoSlice />
        <HomeAboutPreview />
        <HomeContactPreview />
        <FooterLine />
      </main>
      <Footer />
    </>
  );
};

const Index = () => (
  <LanguageProvider>
    <IndexContent />
  </LanguageProvider>
);

export default Index;
