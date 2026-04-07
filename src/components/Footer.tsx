import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="py-16 md:py-24 px-6 md:px-10 bg-background border-t border-border">
      <div className="max-w-[900px] mx-auto flex flex-col items-center text-center gap-8">
        <Link to="/" className="text-[42px] font-bold text-foreground tracking-tight leading-none">
          LolaLab.
        </Link>
        <div className="flex items-center gap-8">
          <Link to="/work" className="label-style hover:text-foreground transition-colors duration-300">
            {t('nav.work', lang)}
          </Link>
          <Link to="/about" className="label-style hover:text-foreground transition-colors duration-300">
            {t('nav.about', lang)}
          </Link>
          <Link to="/contact" className="label-style hover:text-foreground transition-colors duration-300">
            {t('nav.contact', lang)}
          </Link>
        </div>
        <p className="text-dim text-xs tracking-wide">{t('footer.rights', lang)}</p>
        <p className="text-dim text-xs tracking-wide">{t('footer.credit', lang)}</p>
      </div>
    </footer>
  );
}
