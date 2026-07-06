/**
 * FooterLine · Wave 1 · canon Fred v1
 * "Lab guides. Library teaches. Studio makes."
 * Assinatura editorial mínima. Nunca marketing.
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function FooterLine() {
  const { lang } = useLanguage();
  return (
    <div className="px-6 md:px-12 py-12 bg-background border-t border-ink/5">
      <p
        className="text-center text-sm md:text-base italic max-w-[720px] mx-auto"
        style={{ color: 'hsl(var(--bronze))', fontWeight: 400, letterSpacing: '0.02em' }}
      >
        {t('footer.line', lang)}
      </p>
    </div>
  );
}
