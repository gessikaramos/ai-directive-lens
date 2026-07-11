/**
 * Home · v3.3 · Wave 2.1 · canon Fred+Gé 7/jul
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
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import DopLaunchBlock from '@/components/DopLaunchBlock';
import StatementSection from '@/components/StatementSection';
import ChoosePathSection from '@/components/ChoosePathSection';
import ManifestoSlice from '@/components/ManifestoSlice';
import HomeAboutPreview from '@/components/HomeAboutPreview';
import HomeContactPreview from '@/components/HomeContactPreview';
import FooterLine from '@/components/FooterLine';
import Footer from '@/components/Footer';

const IndexContent = () => {
  useLenis();
  useScrollAnimations();

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
        <ChoosePathSection />
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
