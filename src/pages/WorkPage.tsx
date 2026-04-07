import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const cases = [
  { titleKey: 'work.pietra.title', catKey: 'work.pietra.cat' },
  { titleKey: 'work.film.title', catKey: 'work.film.cat' },
  { titleKey: 'work.character.title', catKey: 'work.character.cat' },
  { titleKey: 'work.editorial.title', catKey: 'work.editorial.cat' },
];

function WorkContent() {
  const { lang } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24 md:pb-36 px-6 md:px-10 bg-background min-h-screen">
        <div className="max-w-[1100px] mx-auto">
          <h1 className="text-4xl md:text-[48px] font-light tracking-tight text-foreground text-center mb-4">
            {t('work.title', lang)}
          </h1>
          <p className="text-lg font-light text-soft text-center mb-16 md:mb-24">
            {t('work.subtitle', lang)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.map((c, i) => (
              <div
                key={i}
                className="group p-8 md:p-10 transition-transform duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: '#111111', border: '1px solid #242424' }}
              >
                <span className="label-style block mb-4">{t(c.catKey, lang)}</span>
                <h2 className="text-xl md:text-2xl font-light text-foreground">
                  {t(c.titleKey, lang)}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function WorkPage() {
  return (
    <LanguageProvider>
      <WorkContent />
    </LanguageProvider>
  );
}
