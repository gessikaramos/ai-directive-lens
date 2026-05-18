import { LanguageProvider } from '@/hooks/use-language';
import { useLenis } from '@/hooks/use-lenis';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatementSection from '@/components/StatementSection';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import CreativePipelineSection from '@/components/CreativePipelineSection';
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
        <CreativePipelineSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
