import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="py-16 md:py-24 px-6 md:px-10 bg-background border-t border-border">
      <div className="max-w-[900px] mx-auto flex flex-col items-center text-center gap-6">
        <img
          src="/images/logos/logo-stacked.svg"
          alt="Lola Lab"
          className="h-12 md:h-16 opacity-70"
        />
        <p className="text-dim text-xs tracking-wide">{t('footer.rights', lang)}</p>
        <p className="text-dim text-xs tracking-wide">{t('footer.credit', lang)}</p>
      </div>
    </footer>
  );
}
