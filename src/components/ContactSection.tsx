import { useState, FormEvent } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function ContactSection() {
  const { lang } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const socials = [
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/gessikaolivieri/' },
    { label: 'INSTAGRAM', href: 'https://www.instagram.com/lolalabstudio/' },
    { label: 'UPWORK', href: 'https://www.upwork.com/freelancers/lolalabstudio?mp_source=share' },
    { label: 'CONTRA', href: 'https://contra.com/gessika_olivieri_doyc6cg0' },
  ];

  return (
    <section id="contact" className="section-spacing px-6 md:px-10 bg-background">
      <div data-anim="contact" className="max-w-[700px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mb-4">
          {t('contact.headline', lang)}
        </h2>
        <p className="text-base md:text-lg font-light text-soft mb-14">
          {t('contact.subtitle', lang)}
        </p>

        {sent ? (
          <p className="text-lg text-foreground font-light">{t('contact.sent', lang)}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              required
              placeholder={t('contact.name', lang)}
              className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-dim focus:outline-none focus:border-foreground transition-colors duration-300 font-light"
            />
            <input
              type="email"
              required
              placeholder={t('contact.email', lang)}
              className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-dim focus:outline-none focus:border-foreground transition-colors duration-300 font-light"
            />
            <textarea
              required
              rows={4}
              placeholder={t('contact.message', lang)}
              className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-dim focus:outline-none focus:border-foreground transition-colors duration-300 font-light resize-none"
            />
            <button
              type="submit"
              className="label-style border border-foreground/30 px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-500 tracking-[0.2em]"
            >
              {t('contact.send', lang)}
            </button>
          </form>
        )}

        {/* Email */}
        <a
          href="mailto:hello@lolalabstudio.com"
          className="block mt-14 text-soft hover:text-foreground underline-offset-4 hover:underline transition-colors duration-300 font-light"
        >
          hello@lolalabstudio.com
        </a>

        {/* Social links */}
        <div className="flex flex-wrap gap-6 md:gap-10 mt-8">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="label-style hover:text-foreground transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
