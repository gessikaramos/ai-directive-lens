/**
 * HomeContactPreview · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 * Dark ink base · tipografia refinada Apple · label bronze soft.
 */
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function HomeContactPreview() {
  const { lang } = useLanguage();
  return (
    <section
      className="px-6 md:px-12 py-24 md:py-32"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[820px] mx-auto">
        <span
          className="block mb-5"
          style={{
            color: 'hsl(var(--bronze-soft))',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          {t('nav.contact', lang)}
        </span>
        <p
          className="mb-4"
          style={{
            fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1.5,
            color: 'hsl(var(--cool-gray-tertiary))',
          }}
        >
          {t('home.contact.preview', lang)}
        </p>
        <a
          href="mailto:hello@lolalabstudio.com"
          className="block mb-7 transition-opacity hover:opacity-70"
          style={{
            fontSize: '1rem',
            fontWeight: 300,
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          hello@lolalabstudio.com
        </a>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-500"
          style={{
            color: 'hsl(var(--bronze-soft))',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {t('home.contact.cta', lang)} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
