/**
 * StatementSection · Wave 3.0-A · canon Mary Fred+Gé 7/jul
 *
 * Upgrade sobre Wave 2.1:
 *   - Base dark premium (bg-ink) · texto cream monumental
 *   - Letter-spacing negativo canon Mary (-0.028em display)
 *   - Line-height cinemático 1.1
 *   - Padding cinemático (py-32 md:py-44)
 *   - Continuidade dark do Hero (não há mais transição cream)
 *   - Parallax horizontal canon mantido (statement-line1/2 já existe no hook)
 *   - Copy canon travado: statement.line1 + statement.line2 (Fred 7/jul)
 *
 * Regras: sem scroll hijacking, sem bounce, sem glow. Continuidade cinemática Hero → Statement.
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function StatementSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="px-6 md:px-12 py-32 md:py-44 overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[1200px] mx-auto text-center">
        <p
          data-anim="statement-line1"
          className="mb-8 md:mb-10"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 4rem)',
            fontWeight: 500,
            letterSpacing: '-0.028em',
            lineHeight: 1.1,
            color: 'hsl(var(--background))',
          }}
        >
          {t('statement.line1', lang)}
        </p>
        <p
          data-anim="statement-line2"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 4rem)',
            fontWeight: 500,
            letterSpacing: '-0.028em',
            lineHeight: 1.1,
            color: 'hsl(var(--background) / 0.7)',
          }}
        >
          {t('statement.line2', lang)}
        </p>
      </div>
    </section>
  );
}
