import { LanguageProvider } from '@/hooks/use-language';
import { useLenis } from '@/hooks/use-lenis';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatementSection from '@/components/StatementSection';
import SkillsSection from '@/components/SkillsSection';
import SelectedWorkSection from '@/components/CreativePipelineSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
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
        <SkillsSection />
        <SelectedWorkSection />
        <AboutSection />
        <ContactSection />
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
