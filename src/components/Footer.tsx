import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="py-16 md:py-20 px-6 md:px-10 bg-background border-t border-border">
      <div className="max-w-[900px] mx-auto flex flex-col items-center text-center gap-4">
        <p className="text-ink tracking-tight" style={{ fontWeight: 500 }}>LolaLab</p>
        <p className="text-dim text-xs tracking-wide">{t('footer.rights', lang)}</p>
        <p className="text-dim text-xs tracking-wide">{t('footer.credit', lang)}</p>
      </div>
    </footer>
  );
}
