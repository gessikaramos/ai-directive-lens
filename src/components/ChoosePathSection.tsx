/**
 * ChoosePathSection · Wave 2.0 · canon-mestre navigation Fred+Gé 7/jul
 * Home block: Choose your path · Studio · Lab · Library (nessa ordem).
 * Steve Jobs Lens: quero contratar → Studio · quero explorar ideia → Lab · quero aprender → Library.
 * Copy canon completa via i18n.
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
