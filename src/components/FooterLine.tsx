/**
 * FooterLine · Wave 2.0 · canon-mestre navigation Fred+Gé 7/jul
 * Default (footer.line): "Learn the method. Shape the idea. Build the work."
 * Frase antiga "Lab guides. Library teaches. Studio makes." arquivada como canon histórico Wave 1.
 * Override via prop `translationKey` para páginas com footer específico.
 * Assinatura editorial mínima. Nunca marketing.
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

type Props = {
  translationKey?: string;
};

export default function FooterLine({ translationKey = 'footer.line' }: Props) {
  const { lang } = useLanguage();
  return (
    <div className="px-6 md:px-12 py-12 bg-background border-t border-ink/5">
      <p
        className="text-center text-sm md:text-base italic max-w-[720px] mx-auto"
        style={{ color: 'hsl(var(--bronze))', fontWeight: 400, letterSpacing: '0.02em' }}
      >
        {t(translationKey, lang)}
      </p>
    </div>
  );
}
