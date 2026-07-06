/**
 * Studio · Wave 1 skeleton · canon Fred v1
 * Placeholder editorial. Cases + What we make + How we work virão em Wave 5.
 */
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';
import SectionLabel from '@/components/SectionLabel';

const StudioContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = 'Studio · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'We make the work that moves culture.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label={t('studio.label', lang)}
          headline={t('studio.hero.headline', lang)}
          sub={t('studio.hero.sub', lang)}
        >
          <a
            href="mailto:hello@lolalabstudio.com"
            className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-500 text-xs tracking-[0.15em] uppercase"
            style={{ color: 'hsl(var(--bronze))', fontWeight: 500 }}
          >
            {t('studio.cta.inquiry', lang)} <span aria-hidden="true">→</span>
          </a>
        </PageHero>

        {/* Wave 5 placeholder */}
        <section className="px-6 md:px-12 py-24 md:py-32 bg-background border-t border-ink/5">
          <div className="max-w-[900px] mx-auto">
            <div className="mb-8">
              <SectionLabel>Featured work</SectionLabel>
            </div>
            <p
              className="text-base text-ink-soft leading-relaxed max-w-[620px]"
              style={{ fontWeight: 300 }}
            >
              MasterChef · Pietra · case studies coming in Wave 5.
            </p>
          </div>
        </section>

        <FooterLine />
      </main>
      <Footer />
    </>
  );
};

const Studio = () => (
  <LanguageProvider>
    <StudioContent />
  </LanguageProvider>
);

export default Studio;
