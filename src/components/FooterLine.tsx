/**
 * FooterLine · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 * Dark ink base coeso · assinatura editorial italic bronze soft.
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

type Props = {
  translationKey?: string;
};

export default function FooterLine({ translationKey = 'footer.line' }: Props) {
  const { lang } = useLanguage();
  return (
    <div
      className="px-6 md:px-12 py-16 md:py-20"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <p
        className="text-center italic max-w-[720px] mx-auto"
        style={{
          color: 'hsl(var(--bronze-soft))',
          fontSize: '0.9375rem',
          fontWeight: 300,
          letterSpacing: '0.01em',
          lineHeight: 1.5,
        }}
      >
        {t(translationKey, lang)}
      </p>
    </div>
  );
}
