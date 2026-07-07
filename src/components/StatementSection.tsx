/**
 * StatementSection · Wave 2.1 · canon Fred+Gé 7/jul
 *
 * Upgrade sobre Wave 1.1:
 *   - Statement MAIS FORTE (tipografia editorial grande, respiro cinematográfico)
 *   - Duas linhas em blocos separados (respiro deliberado entre elas)
 *   - Reativa parallax horizontal canon (statement-line1/line2 já existe no hook)
 *   - Padding vertical ampliado · sem virar Hero, mas com presença
 *   - Copy canon travado: statement.line1 + statement.line2 (Fred 7/jul)
 *
 * Motion: parallax horizontal já implementado em use-scroll-animations.ts.
 * Sem scroll hijacking, sem bounce, sem glow · canon respeitado.
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function StatementSection() {
  const { lang } = useLanguage();

  return (
    <section className="px-6 md:px-12 py-28 md:py-40 bg-background border-b border-ink/5 overflow-hidden">
      <div className="max-w-[1100px] mx-auto text-center">
        <p
          data-anim="statement-line1"
          className="text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-ink mb-6 md:mb-8"
          style={{ fontWeight: 500 }}
        >
          {t('statement.line1', lang)}
        </p>
        <p
          data-anim="statement-line2"
          className="text-2xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-ink"
          style={{ fontWeight: 500 }}
        >
          {t('statement.line2', lang)}
        </p>
      </div>
    </section>
  );
}
