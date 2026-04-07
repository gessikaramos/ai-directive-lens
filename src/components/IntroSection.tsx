import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function IntroSection() {
  const { lang } = useLanguage();

  return (
    <section className="section-spacing px-6 md:px-10 bg-background">
      <div className="max-w-[640px] mx-auto text-center">
        <p className="text-lg md:text-xl font-light leading-relaxed text-soft">
          {t('intro.text', lang)}
        </p>
      </div>
    </section>
  );
}
