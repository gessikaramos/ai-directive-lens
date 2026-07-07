/**
 * Footer · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 * Dark ink base coeso · assinatura minimalista.
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer
      className="py-14 md:py-20 px-6 md:px-10"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[900px] mx-auto flex flex-col items-center text-center gap-3">
        <p
          style={{
            color: 'hsl(var(--background))',
            fontSize: '0.9375rem',
            fontWeight: 500,
            letterSpacing: '-0.01em',
          }}
        >
          LolaLab
        </p>
        <p
          style={{
            color: 'hsl(var(--background) / 0.35)',
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
          }}
        >
          {t('footer.rights', lang)}
        </p>
        <p
          style={{
            color: 'hsl(var(--background) / 0.35)',
            fontSize: '0.7rem',
            fontWeight: 400,
            letterSpacing: '0.08em',
          }}
        >
          {t('footer.credit', lang)}
        </p>
      </div>
    </footer>
  );
}
