import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function HomeCTA() {
  const { lang } = useLanguage();

  return (
    <section className="section-spacing px-6 md:px-10 bg-background">
      <div className="max-w-[900px] mx-auto text-center flex flex-col items-center gap-4">
        <Link
          to="/work"
          className="text-xl md:text-2xl font-light text-foreground hover:underline underline-offset-4 transition-all duration-300"
        >
          {t('cta.work', lang)}
        </Link>
        <Link
          to="/contact"
          className="text-lg font-light text-soft hover:underline underline-offset-4 transition-all duration-300"
        >
          {t('cta.contact', lang)}
        </Link>
      </div>
    </section>
  );
}
