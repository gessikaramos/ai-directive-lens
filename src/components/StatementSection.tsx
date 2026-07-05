import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function StatementSection() {
  const { lang } = useLanguage();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-10 bg-background overflow-visible">
      <div className="max-w-[1200px] w-full overflow-visible text-center">
        <p
          data-anim="statement-line1"
          className="text-[clamp(1.5rem,4vw,3.5rem)] leading-relaxed tracking-tight mb-4 md:mb-6 text-ink"
          style={{ fontWeight: 500 }}
        >
          {t('statement.line1', lang)}
        </p>
        <p
          data-anim="statement-line2"
          className="text-[clamp(1.5rem,4vw,3.5rem)] leading-relaxed tracking-tight text-ink"
          style={{ fontWeight: 500 }}
        >
          {t('statement.line2', lang)}
        </p>
      </div>
    </section>
  );
}
