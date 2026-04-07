import { LanguageProvider } from '@/hooks/use-language';
import { useLenis } from '@/hooks/use-lenis';
import { useScrollAnimations } from '@/hooks/use-scroll-animations';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import ServicesSection from '@/components/ServicesSection';
import HomeCTA from '@/components/HomeCTA';
import StatementSection from '@/components/StatementSection';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import CasesSection from '@/components/CasesSection';
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
        <IntroSection />
        <ServicesSection />
        <HomeCTA />
        <StatementSection />
        <SkillsSection />
        <CasesSection />
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
