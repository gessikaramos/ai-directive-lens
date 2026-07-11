/**
 * Contact · Wave 3.1 · canon Mary Editorial Dark Fred+Gé 7/jul
 *
 * Atmosfera canon Mary: escrever ao estúdio.
 * Fundo #0B0B0C · email principal branco puro grande · social discreto → hover branco.
 */
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';

const SOCIALS = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/gessikaolivieri/' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/lolalabstudio/' },
  { label: 'YOUTUBE', href: 'https://www.youtube.com/@lolalabstudio' },
  { label: 'UPWORK', href: 'https://www.upwork.com/freelancers/lolalabstudio?mp_source=share' },
];

const ContactContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = 'Contact · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Write to the studio.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'hsl(var(--ink))' }}>
        <PageHero
          label={t('nav.contact', lang)}
          headline={t('contact.hero.headline', lang)}
          sub={t('contact.hero.sub', lang)}
        >
          <a
            href="mailto:hello@lolalabstudio.com"
            className="inline-block transition-opacity hover:opacity-70"
            style={{
              color: '#FFFFFF',
              fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
              fontWeight: 300,
              letterSpacing: '-0.015em',
              borderBottom: '1px solid #FFFFFF',
              paddingBottom: '6px',
            }}
          >
            hello@lolalabstudio.com
          </a>
        </PageHero>

        {/* Inquiry paths · texto editorial dark */}
        <section className="px-6 md:px-12 py-24 md:py-32">
          <div className="max-w-[820px] mx-auto">
            <span
              className="block mb-10"
              style={{
                color: 'hsl(var(--bronze-soft))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              How to write
            </span>
            <p
              className="mb-8"
              style={{
                fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                lineHeight: 1.5,
                color: 'hsl(var(--cool-gray-tertiary))',
              }}
            >
              For projects, tell us the intent and the constraints. Deadline, budget shape,
              creative reference. We reply within two working days.
            </p>
            <p
              style={{
                fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                lineHeight: 1.5,
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              For collaboration, press, or research, a paragraph is enough. We prefer
              specific to polite.
            </p>

            {/* Assuntos predefinidos por origem (Wave DOP · seção 16) */}
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {[
                ['Book / Editorial', 'Book%20%2F%20Editorial'],
                ['Studio Inquiry', 'Studio%20Inquiry'],
                ['Press', 'Press'],
                ['Collaboration', 'Collaboration'],
              ].map(([labelTxt, subject]) => (
                <a
                  key={labelTxt}
                  href={`mailto:hello@lolalabstudio.com?subject=${subject}`}
                  className="transition-opacity hover:opacity-80"
                  style={{
                    color: 'hsl(var(--bronze-soft))',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid hsl(var(--bronze-soft) / 0.4)',
                    paddingBottom: '3px',
                  }}
                >
                  {labelTxt} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Connect · social links discretos hover branco */}
        <section className="px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-[820px] mx-auto">
            <span
              className="block mb-10"
              style={{
                color: 'hsl(var(--bronze-soft))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              Connect
            </span>
            <div className="flex flex-wrap gap-8 md:gap-12">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-500"
                  style={{
                    color: '#2C2C2E',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#2C2C2E';
                  }}
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
