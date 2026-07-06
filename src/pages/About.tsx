/**
 * About · Wave 1 skeleton · canon Fred v1
 * Hero + 4 blocos placeholder (Founder, Thesis, Method, Make the machine disappear).
 * Copy expandido virá em Wave 6.
 */
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';
import SectionLabel from '@/components/SectionLabel';

const AboutContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = 'About · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'LolaLab translates human intention into form.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label={t('about.label', lang)}
          headline={t('about.hero.headline', lang)}
          sub={t('about.hero.sub', lang)}
        />

        {/* Wave 6 placeholder · Founder · Thesis · Method · Make the machine disappear */}
        <section className="px-6 md:px-12 py-24 md:py-32 bg-background border-t border-ink/5">
          <div className="max-w-[900px] mx-auto">
            <div className="mb-8">
              <SectionLabel>Sections</SectionLabel>
            </div>
            <p
              className="text-base text-ink-soft leading-relaxed max-w-[620px]"
              style={{ fontWeight: 300 }}
            >
              Founder · LolaLab Thesis · Method · Make the machine disappear · full copy in Wave 6.
            </p>
          </div>
        </section>

        <FooterLine />
      </main>
      <Footer />
    </>
  );
};

const About = () => (
  <LanguageProvider>
    <AboutContent />
  </LanguageProvider>
);

export default About;
