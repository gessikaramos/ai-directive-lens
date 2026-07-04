import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function ContactSection() {
  const { lang } = useLanguage();

  const socials = [
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/gessikaolivieri/' },
    { label: 'INSTAGRAM', href: 'https://www.instagram.com/lolalabstudio/' },
    { label: 'YOUTUBE', href: 'https://www.youtube.com/@lolalabstudio' },
    { label: 'UPWORK', href: 'https://www.upwork.com/freelancers/lolalabstudio?mp_source=share' },
  ];

  return (
    <section id="contact" className="section-spacing px-6 md:px-10 bg-background">
      <div data-anim="contact" className="max-w-[820px] mx-auto">
        <span className="label-style block mb-10">CONTACT</span>

        <h2
          className="text-3xl md:text-5xl tracking-tight text-ink mb-6"
          style={{ fontWeight: 300 }}
        >
          {t('contact.headline', lang)}
        </h2>
        <p className="text-base md:text-lg text-ink-soft mb-10">
          {t('contact.subtitle', lang)}
        </p>

        <a
          href="mailto:hello@lolalabstudio.com"
          className="inline-block text-xl md:text-2xl text-bronze hover:text-bronze-soft transition-colors duration-300"
          style={{ fontWeight: 500 }}
        >
          {t('contact.cta', lang)}
        </a>
        <p className="text-sm text-ink-soft mt-3">hello@lolalabstudio.com</p>

        <div className="flex flex-wrap gap-6 md:gap-10 mt-16">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label-style underline-offset-4 hover:underline hover:text-ink transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
