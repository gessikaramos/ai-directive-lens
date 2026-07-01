import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function AboutSection() {
  const { lang } = useLanguage();

  return (
    <section id="about" className="section-spacing px-6 md:px-10 bg-background">
      <div data-anim="about" className="max-w-[820px] mx-auto">
        <span className="label-style block mb-10">{t('about.label', lang)}</span>

        <div className="space-y-6">
          <p
            className="text-lg md:text-2xl leading-relaxed text-ink"
            style={{ fontWeight: 400 }}
          >
            {t('about.p1', lang)}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-ink-soft">
            {t('about.p2', lang)}
          </p>
          <p className="text-base md:text-lg leading-relaxed text-ink-soft">
            {t('about.p3', lang)}
          </p>
          <p
            className="text-lg md:text-xl leading-relaxed text-ink pt-6"
            style={{ fontWeight: 500 }}
          >
            {t('about.p4', lang)}
          </p>
        </div>
      </div>
    </section>
  );
}
