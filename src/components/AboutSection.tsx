import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function AboutSection() {
  const { lang } = useLanguage();

  return (
    <section id="about" className="section-spacing px-6 md:px-10 bg-background">
      <div className="max-w-[900px] mx-auto">
        <span className="label-style block mb-10">{t('about.label', lang)}</span>

        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mb-10">
          {t('about.name', lang)}
        </h2>

        <div className="space-y-6 mb-14">
          <p className="text-lg md:text-xl font-light leading-relaxed text-soft">
            {t('about.bio1', lang)}
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed text-soft">
            {t('about.bio2', lang)}
          </p>
        </div>

        <blockquote className="text-xl md:text-2xl font-light italic text-foreground mb-14 border-l border-border pl-6">
          {t('about.statement', lang)}
        </blockquote>

        <p className="label-style leading-loose tracking-[0.16em]">
          {t('about.capabilities', lang)}
        </p>
      </div>
    </section>
  );
}
