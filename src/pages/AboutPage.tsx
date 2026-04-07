import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function AboutContent() {
  const { lang } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24 md:pb-36 px-6 md:px-10 bg-background min-h-screen">
        <div className="max-w-[680px] mx-auto">
          <h1 className="text-4xl md:text-[48px] font-light tracking-tight text-foreground mb-12">
            {t('aboutPage.title', lang)}
          </h1>
          <div className="space-y-6">
            <p className="text-lg font-normal leading-relaxed text-soft">
              {t('aboutPage.p1', lang)}
            </p>
            <p className="text-lg font-normal leading-relaxed text-soft">
              {t('aboutPage.p2', lang)}
            </p>
            <p className="text-lg font-normal leading-relaxed text-soft">
              {t('aboutPage.p3', lang)}
            </p>
            <p className="text-lg font-normal leading-relaxed text-soft">
              {t('aboutPage.p4', lang)}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function AboutPage() {
  return (
    <LanguageProvider>
      <AboutContent />
    </LanguageProvider>
  );
}
