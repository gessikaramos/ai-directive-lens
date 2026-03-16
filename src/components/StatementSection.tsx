import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function StatementSection() {
  const { lang } = useLanguage();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-10 bg-background">
      <div className="max-w-[1200px] w-full overflow-hidden">
        <p
          className="text-dim text-[clamp(1.5rem,4vw,3.5rem)] font-extralight leading-relaxed tracking-tight mb-4 md:mb-6"
          data-parallax="statement-1"
        >
          {t('statement.line1', lang)}
        </p>
        <p
          className="text-dim text-[clamp(1.5rem,4vw,3.5rem)] font-extralight leading-relaxed tracking-tight"
          data-parallax="statement-2"
        >
          {t('statement.line2', lang)}
        </p>
      </div>
    </section>
  );
}
