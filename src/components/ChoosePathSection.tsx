/**
 * ChoosePathSection · Wave 1 · canon Fred v1
 * Home block: Choose your path · Lab · Library · Studio (nessa ordem).
 * Copy canon Fred v1 completa via i18n.
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import SectionLabel from './SectionLabel';
import PathCard from './PathCard';

export default function ChoosePathSection() {
  const { lang } = useLanguage();
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 bg-background border-t border-b border-ink/5">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12 md:mb-16 text-center">
          <SectionLabel>{t('home.choose.label', lang)}</SectionLabel>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
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
          <PathCard
            name={t('home.path.studio.name', lang)}
            desc={t('home.path.studio.desc', lang)}
            cta={t('home.path.studio.cta', lang)}
            to="/studio"
          />
        </div>
      </div>
    </section>
  );
}
