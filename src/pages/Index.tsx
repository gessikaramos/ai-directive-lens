import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatementSection from '@/components/StatementSection';
import SkillsSection from '@/components/SkillsSection';
import AboutSection from '@/components/AboutSection';
import CasesSection from '@/components/CasesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <HeroSection />
        <StatementSection />
        <SkillsSection />
        {/* BLOCK 4 — Selected Work / Cases (Phase 3) */}
        <div id="cases" />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </LanguageProvider>
  );
};

export default Index;
