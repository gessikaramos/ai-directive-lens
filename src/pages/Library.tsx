/**
 * Library · Wave 1 skeleton · canon Fred v1
 * Placeholder editorial. Featured product + 4 shelves virão em Wave 4.
 */
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';
import SectionLabel from '@/components/SectionLabel';

const LibraryContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = 'Library · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Practical knowledge for creative minds.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label={t('library.label', lang)}
          headline={t('library.hero.headline', lang)}
          sub={t('library.hero.sub', lang)}
        />

        {/* Wave 4 placeholder · Featured product + shelves */}
        <section className="px-6 md:px-12 py-24 md:py-32 bg-background border-t border-ink/5">
          <div className="max-w-[900px] mx-auto">
            <div className="mb-8">
              <SectionLabel>Featured</SectionLabel>
            </div>
            <p
              className="text-base text-ink-soft leading-relaxed max-w-[620px]"
              style={{ fontWeight: 300 }}
            >
              The Director's Prompt · First Studio Edition · coming soon.
            </p>
          </div>
        </section>

        {/* Wave 1.2 · Fred v1 canon · footer line específico da Library */}
        <FooterLine translationKey="footer.line.library" />
      </main>
      <Footer />
    </>
  );
};

const Library = () => (
  <LanguageProvider>
    <LibraryContent />
  </LanguageProvider>
);

export default Library;
