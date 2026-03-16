import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatementSection from '@/components/StatementSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <HeroSection />
        <StatementSection />
        {/* BLOCK 3 — Skills/Work grid (Phase 2) */}
        <div id="work" />
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
