/**
 * StatementSection · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 *
 * Refinos sobre 3.0-A:
 *   - Dark ink base (continuidade Hero)
 *   - Tipografia Apple refinada: weight 400, letter-spacing -0.018em
 *   - Escala moderada: clamp(1.5rem, 3.8vw, 3rem) (antes 4rem/5vw)
 *   - Line-height 1.25 (antes 1.1 · Apple respira mais)
 *   - Motion trocado: fade+translateY único (sem parallax horizontal esquisito)
 *   - Espaço vertical entre linhas: mb-6 (proximidade)
 *   - Copy canon travado
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function StatementSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="px-6 md:px-12 py-32 md:py-44"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div
        data-anim="statement-block"
        className="max-w-4xl mx-auto text-center"
      >
        <p
          className="mb-6"
          style={{
            fontSize: 'clamp(1.5rem, 3.8vw, 3rem)',
            fontWeight: 400,
            letterSpacing: '-0.018em',
            lineHeight: 1.25,
            color: 'hsl(var(--background))',
          }}
        >
          {t('statement.line1', lang)}
        </p>
        <p
          style={{
            fontSize: 'clamp(1.5rem, 3.8vw, 3rem)',
            fontWeight: 300,
            letterSpacing: '-0.018em',
            lineHeight: 1.25,
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          {t('statement.line2', lang)}
        </p>
      </div>
    </section>
  );
}
