import { useState, FormEvent } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { toast } from 'sonner';
import { t } from '@/lib/i18n';

export default function ContactSection() {
  const { lang } = useLanguage();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formspree.io/f/xvzwvgby', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
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
              name="name"
              required
              placeholder={t('contact.name', lang)}
              className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-dim focus:outline-none focus:border-foreground transition-colors duration-300 font-light"
            />
            <input
              type="email"
              name="email"
              required
              placeholder={t('contact.email', lang)}
              className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-dim focus:outline-none focus:border-foreground transition-colors duration-300 font-light"
            />
            <textarea
              name="message"
              required
              rows={4}
              placeholder={t('contact.message', lang)}
              className="w-full bg-transparent border-b border-border pb-3 text-foreground placeholder:text-dim focus:outline-none focus:border-foreground transition-colors duration-300 font-light resize-none"
            />
            {error && (
              <p className="text-red-400 text-sm font-light">
                {lang === 'en' ? 'Something went wrong. Please try again or email directly.' : 'Algo deu errado. Tente novamente ou envie um email diretamente.'}
              </p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="label-style border border-foreground/30 px-8 py-3 hover:bg-foreground hover:text-background transition-all duration-500 tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait"
            >
              {sending
                ? (lang === 'en' ? 'Sending...' : 'Enviando...')
                : t('contact.send', lang)}
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
              className="label-style underline-offset-4 hover:underline hover:text-foreground transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
