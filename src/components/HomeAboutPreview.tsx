/**
 * HomeAboutPreview · Wave 1 · canon Fred v1
 * Curto na Home. Full em /about.
 */
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import SectionLabel from './SectionLabel';

export default function HomeAboutPreview() {
  const { lang } = useLanguage();
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 bg-background border-t border-ink/5">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-8">
          <SectionLabel>{t('about.label', lang)}</SectionLabel>
        </div>
        <p
          className="text-xl md:text-2xl leading-relaxed mb-10"
          style={{ fontWeight: 300, color: 'hsl(30 25% 10%)' }}
        >
          {t('home.about.preview', lang)}
        </p>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-500 text-xs tracking-[0.15em] uppercase"
          style={{ color: 'hsl(var(--bronze))', fontWeight: 500 }}
        >
          {t('home.about.cta', lang)} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
