/**
 * ChoosePathSection · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 *
 * Refactor:
 *   - Base dark ink (coerência com Hero + Statement)
 *   - Label refinada bronze soft
 *   - Cards flat com hairline top (PathCard sem retangulo)
 *   - Espaçamento respirado
 *   - Canon-mestre order mantido: Studio · Lab · Library
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import PathCard from './PathCard';

export default function ChoosePathSection() {
  const { lang } = useLanguage();
  return (
    <section
      className="px-6 md:px-12 py-24 md:py-32"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16 md:mb-20 text-center">
          <span
            style={{
              color: 'hsl(var(--bronze-soft))',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
            }}
          >
            {t('home.choose.label', lang)}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12">
          <PathCard
            name={t('home.path.studio.name', lang)}
            desc={t('home.path.studio.desc', lang)}
            cta={t('home.path.studio.cta', lang)}
            to="/studio"
          />
          <PathCard
            name={t('home.path.lab.name', lang)}
            desc={t('home.path.lab.desc', lang)}
            cta={t('home.path.lab.cta', lang)}
            to="/lab"
          />
          <PathCard
            name={t('home.path.library.name', lang)}
            desc={t('home.path.library.desc', lang)}
            cta={t('home.path.library.cta', lang)}
            to="/library"
          />
        </div>
      </div>
    </section>
  );
}
