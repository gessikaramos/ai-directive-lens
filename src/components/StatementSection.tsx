import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function StatementSection() {
  const { lang } = useLanguage();

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-10 bg-background">
      <div className="max-w-[1200px] w-full overflow-hidden text-center">
        <p
          data-anim="statement-line"
          className="text-[clamp(1.5rem,4vw,3.5rem)] font-extralight leading-relaxed tracking-tight mb-4 md:mb-6" style={{ color: 'hsla(60, 33%, 97.5%, 0.7)' }}
        >
          {t('statement.line1', lang)}
        </p>
        <p
          data-anim="statement-line"
          data-direction="reverse"
          className="text-[clamp(1.5rem,4vw,3.5rem)] font-extralight leading-relaxed tracking-tight" style={{ color: 'hsla(60, 33%, 97.5%, 0.7)' }}
        >
          {t('statement.line2', lang)}
        </p>
      </div>
    </section>
  );
}
