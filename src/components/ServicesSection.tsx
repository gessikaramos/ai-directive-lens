import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

const services = [
  { titleKey: 'services.1.title', descKey: 'services.1.desc' },
  { titleKey: 'services.2.title', descKey: 'services.2.desc' },
  { titleKey: 'services.3.title', descKey: 'services.3.desc' },
  { titleKey: 'services.4.title', descKey: 'services.4.desc' },
];

export default function ServicesSection() {
  const { lang } = useLanguage();

  return (
    <section className="section-spacing px-6 md:px-10 bg-background">
      <div className="max-w-[900px] mx-auto">
        <span className="label-style block mb-10">{t('services.label', lang)}</span>
        <h2 className="text-3xl md:text-[40px] font-light tracking-tight text-foreground leading-tight mb-16">
          {t('services.headline', lang)}
        </h2>
        <div className="space-y-0">
          {services.map((s, i) => (
            <div key={i} className={`py-8 ${i < services.length - 1 ? 'border-b' : ''}`} style={{ borderColor: '#242424' }}>
              <h3 className="text-lg md:text-xl font-normal text-foreground mb-2">
                {t(s.titleKey, lang)}
              </h3>
              <p className="text-base font-light text-soft leading-relaxed">
                {t(s.descKey, lang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
