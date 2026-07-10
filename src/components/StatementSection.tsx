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
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function StatementSection() {
  const { lang } = useLanguage();

  return (
    <section
      className="px-6 md:px-12 py-28 md:py-36"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div
        data-anim="statement-block"
        className="max-w-4xl mx-auto text-center"
      >
        <p
          className="mb-4"
          style={{
            fontSize: 'clamp(1.5rem, 3.8vw, 3rem)',
            fontWeight: 400,
            letterSpacing: '-0.018em',
            lineHeight: 1.25,
            color: '#FFFFFF',
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
            color: 'hsl(var(--cool-gray-tertiary))',
          }}
        >
          {t('statement.line2', lang)}
        </p>

        {/* Os dois caminhos no primeiro terço da página (canon Mary 10/jul):
            produto com preenchimento, estúdio em outline. Sem "Walter" — público
            vê Human Intent Translator. */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            to="/lab"
            className="px-9 py-3.5 transition-all duration-300 hover:opacity-85 hover:scale-[1.02]"
            style={{
              backgroundColor: 'hsl(var(--bronze-soft))',
              color: 'hsl(var(--ink))',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Talk to Walter →
          </Link>
          <Link
            to="/contact"
            className="px-9 py-3.5 transition-all duration-300 hover:opacity-85 hover:scale-[1.02]"
            style={{
              backgroundColor: 'transparent',
              color: 'hsl(var(--background) / 0.9)',
              border: '1px solid hsl(var(--background) / 0.3)',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Partner with the Studio ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
