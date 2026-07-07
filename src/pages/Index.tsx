/**
 * Home · v3.2 · Wave 1 canon Fred v1 · Wave 2.0 canon-mestre navigation aplicado
 *
 * Estrutura canon-Fred:
 *   Hero → Statement → Choose your path → Selected Work → About preview → Contact preview → Footer line
 *
 * Regras aplicadas:
 *   - HIT mini removida da Home (LabEntry) · HIT vive só em /lab
 *   - "What we do" 4 tiles removida da Home (SkillsSection) · vai pra /studio em Wave 5
 *   - About preview curto · full em /about
 *   - Contact preview curto · full em /contact
 *   - Wave 2.0 · Choose your path canon-mestre: Studio → Lab → Library
 *   - Wave 2.0 · Footer line canon: "Learn the method. Shape the idea. Build the work."
 */
import { LanguageProvider } from '@/hooks/use-language';
import { useLenis } from '@/hooks/use-lenis';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatementSection from '@/components/StatementSection';
import ChoosePathSection from '@/components/ChoosePathSection';
import SelectedWorkSection from '@/components/CreativePipelineSection';
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
        <StatementSection />
        <ChoosePathSection />
        <SelectedWorkSection />
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
