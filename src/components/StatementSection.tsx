import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function StatementSection() {
  const { lang } = useLanguage();

  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 md:px-10 py-24 md:py-32 bg-background overflow-visible">
      <div className="max-w-[1200px] w-full overflow-visible text-center">
        <p
          data-anim="statement-line1"
          className="text-[clamp(1.5rem,4vw,3.5rem)] leading-relaxed tracking-tight mb-4 md:mb-6"
          style={{ fontWeight: 500, color: 'hsl(30 25% 10%)' }}
        >
          {t('statement.line1', lang)}
        </p>
        <p
          data-anim="statement-line2"
          className="text-[clamp(1.5rem,4vw,3.5rem)] leading-relaxed tracking-tight"
          style={{ fontWeight: 500, color: 'hsl(30 25% 10%)' }}
        >
          {t('statement.line2', lang)}
        </p>
      </div>
    </section>
  );
}
