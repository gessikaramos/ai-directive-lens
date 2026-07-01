import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

const SelectedWorkSection = () => {
  const { lang } = useLanguage();

  return (
    <section id="selected" className="section-spacing px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <span className="label-style block mb-16">{t('selected.label', lang)}</span>

        {/* MasterChef */}
        <article data-anim="skill-card" className="mb-24 md:mb-32">
          <div className="aspect-video w-full bg-card mb-8 overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/MlNSjBN3xbc?rel=0"
              title="MasterChef — LolaLab"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="max-w-[820px]">
            <h3
              className="text-2xl md:text-4xl text-ink mb-3 tracking-tight"
              style={{ fontWeight: 500 }}
            >
              {t('selected.masterchef.title', lang)}
            </h3>
            <p className="label-style mb-5">{t('selected.masterchef.client', lang)}</p>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed">
              {t('selected.masterchef.desc', lang)}
            </p>
          </div>
        </article>

        {/* PIETRA */}
        <article data-anim="skill-card">
          <div className="max-w-[820px]">
            <h3
              className="text-2xl md:text-4xl text-ink mb-5 tracking-tight"
              style={{ fontWeight: 500 }}
            >
              {t('selected.pietra.title', lang)}
            </h3>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed mb-6">
              {t('selected.pietra.desc', lang)}
            </p>
            <p className="text-xs text-ink-soft/70 italic leading-relaxed">
              {t('selected.pietra.legal', lang)}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SelectedWorkSection;
