import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function ContactContent() {
  const { lang } = useLanguage();

  return (
    <>
      <Navbar />
      <main className="pt-32 md:pt-40 pb-24 md:pb-36 px-6 md:px-10 bg-background min-h-screen">
        <div className="max-w-[680px] mx-auto text-center flex flex-col items-center gap-8">
          <h1 className="text-4xl md:text-[48px] font-light tracking-tight text-foreground">
            {t('contactPage.title', lang)}
          </h1>
          <a
            href="mailto:hello@lolalabstudio.com"
            className="text-xl font-normal text-foreground hover:underline underline-offset-4 transition-all duration-300"
          >
            hello@lolalabstudio.com
          </a>
          <p className="text-base font-light text-soft">
            {t('contactPage.role', lang)}
          </p>
          <div className="flex items-center gap-6 mt-4">
            <a
              href="https://instagram.com/lolalab.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft hover:text-foreground transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/gessikaolivieri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soft hover:text-foreground transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect width="4" height="12" x="2" y="9"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ContactPage() {
  return (
    <LanguageProvider>
      <ContactContent />
    </LanguageProvider>
  );
}
