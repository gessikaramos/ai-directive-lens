/**
 * ManifestoSlice · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 *
 * Refinos sobre 3.0-A:
 *   - Motion trocado: fade+translateY UNICO (não stagger palavra-a-palavra esquisito)
 *   - Tipografia refinada Apple: weight 400 (não 500), letter-spacing -0.018em
 *   - Escala moderada: clamp(1.5rem, 3.8vw, 3rem) (era 4rem/5vw)
 *   - Line-height 1.3 (Apple respira mais)
 *   - Duas frases COMBINADAS num único bloco reveal
 *   - Sem CTA, sem imagem (canon travado)
 *   - Dark ink base mantido
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function ManifestoSlice() {
  const { lang } = useLanguage();

  return (
    <section
      className="px-6 md:px-12 py-32 md:py-44"
      style={{
        backgroundColor: 'hsl(var(--ink))',
        color: 'hsl(var(--background))',
      }}
    >
      <div
        data-anim="manifesto-block"
        className="max-w-4xl mx-auto text-center"
      >
        <p
          className="mb-10 md:mb-14"
          style={{
            fontSize: 'clamp(1.5rem, 3.6vw, 2.75rem)',
            fontWeight: 400,
            letterSpacing: '-0.018em',
            lineHeight: 1.3,
          }}
        >
          {t('manifesto.line1', lang)}
        </p>
        <p
          style={{
            fontSize: 'clamp(1.125rem, 2.4vw, 1.75rem)',
            fontWeight: 300,
            letterSpacing: '-0.012em',
            lineHeight: 1.5,
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          {t('manifesto.line2', lang)}
        </p>
      </div>
    </section>
  );
}
