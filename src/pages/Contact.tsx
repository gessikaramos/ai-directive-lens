/**
 * Contact · Wave 1 skeleton · canon Fred v1
 * Hero + Inquiry paths placeholder + Connect. Copy expandido virá em Wave 6.
 */
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';
import SectionLabel from '@/components/SectionLabel';

const ContactContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = 'Contact · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Write to the studio.');
    window.scrollTo(0, 0);
  }, []);

  const socials = [
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/gessikaolivieri/' },
    { label: 'INSTAGRAM', href: 'https://www.instagram.com/lolalabstudio/' },
    { label: 'YOUTUBE', href: 'https://www.youtube.com/@lolalabstudio' },
    { label: 'UPWORK', href: 'https://www.upwork.com/freelancers/lolalabstudio?mp_source=share' },
  ];

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label={t('nav.contact', lang)}
          headline={t('contact.hero.headline', lang)}
          sub={t('contact.hero.sub', lang)}
        >
          <a
            href="mailto:hello@lolalabstudio.com"
            className="inline-block text-lg md:text-xl"
            style={{ color: 'hsl(var(--bronze))', fontWeight: 500 }}
          >
            hello@lolalabstudio.com
          </a>
        </PageHero>

        {/* Wave 6 placeholder · Inquiry paths (Project · Collaboration · Press · General) */}
        <section className="px-6 md:px-12 py-24 md:py-32 bg-background border-t border-ink/5">
          <div className="max-w-[900px] mx-auto">
            <div className="mb-8">
              <SectionLabel>Inquiry paths</SectionLabel>
            </div>
            <p
              className="text-base text-ink-soft leading-relaxed max-w-[620px] mb-16"
              style={{ fontWeight: 300 }}
            >
              Project inquiry · Collaboration · Press / research · General note · full paths in Wave 6.
            </p>

            <div className="mb-8">
              <SectionLabel>Connect</SectionLabel>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] uppercase text-ink-soft hover:text-ink transition-colors duration-300"
                  style={{ fontWeight: 500 }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        <FooterLine />
      </main>
      <Footer />
    </>
  );
};

const Contact = () => (
  <LanguageProvider>
    <ContactContent />
  </LanguageProvider>
);

export default Contact;
