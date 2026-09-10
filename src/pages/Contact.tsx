/**
 * Contact · Wave 3.1 → minimal (10/set, brief Gé)
 *
 * Atmosfera canon Mary: escrever ao estúdio.
 * Fundo #0B0B0C · email principal branco puro grande.
 *
 * 10/set: "Keep it minimal: hello@lolalabstudio.com and one CTA." — a seção
 * "How to write" (2 parágrafos + 4 pills de assunto) e o bloco "Connect"
 * saíram; o email dentro do PageHero já É o CTA único, e social links já
 * vivem no Footer (presente em toda página) sem precisar duplicar aqui.
 */
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { useSeo } from '@/hooks/use-seo';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';

const ContactContent = () => {
  const { lang } = useLanguage();

  useSeo({
    title: 'Contact · LolaLab',
    description: 'Write to the studio.',
    path: '/contact',
  });

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
