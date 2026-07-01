import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

const services = [
  { titleKey: 'service.films.title', descKey: 'service.films.desc' },
  { titleKey: 'service.characters.title', descKey: 'service.characters.desc' },
  { titleKey: 'service.systems.title', descKey: 'service.systems.desc' },
  { titleKey: 'service.fashion.title', descKey: 'service.fashion.desc' },
];

const SkillsSection = () => {
  const { lang } = useLanguage();

  return (
    <section id="work" className="section-spacing px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <span className="label-style block mb-6">{t('services.label', lang)}</span>
        <h2
          className="text-3xl md:text-5xl tracking-tight text-ink mb-16 md:mb-24"
          style={{ fontWeight: 300 }}
        >
          {t('services.heading', lang)}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((s, i) => (
            <div
              key={i}
              data-anim="skill-card"
              className="bg-card p-8 md:p-12 flex flex-col justify-between min-h-[220px]"
            >
              <span
                className="label-style mb-6"
                style={{ color: 'hsl(var(--bronze))' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3
                  className="text-xl md:text-2xl text-ink mb-4 leading-tight"
                  style={{ fontWeight: 500 }}
                >
                  {t(s.titleKey, lang)}
                </h3>
                <p className="text-sm md:text-base text-ink-soft leading-relaxed">
                  {t(s.descKey, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
