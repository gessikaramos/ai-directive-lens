/**
 * Library · Wave 3.1 · canon Mary Editorial Dark Fred+Gé 7/jul
 *
 * Atmosfera canon Mary: arquivo secreto do estúdio.
 * Fundo #0B0B0C · grid tipográfico rigoroso · linhas 1px #1C1C1E.
 * Lista vertical de Volumes (NÃO cards infoproduto).
 * Copy: "Intelligence" · "Professional Analysis" · não "curso".
 */
import { useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import FooterLine from '@/components/FooterLine';
import Compendiums from '@/components/library/Compendiums';

// VOLUMES removido (canon Gé 10/jul): Restricted Archive descontinuado —
// a Library agora é hero + The LolaLab Compendiums.


const LibraryContent = () => {
  const { lang } = useLanguage();

  useEffect(() => {
    document.title = 'Library · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute(
        'content',
        'Proprietary intelligence from LolaLab Studio. The method behind the work.',
      );
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: 'hsl(var(--ink))' }}>
        <PageHero
          label={t('library.label', lang)}
          headline={t('library.hero.headline', lang)}
          sub={t('library.hero.sub', lang)}
        />

        <Compendiums />

        <FooterLine translationKey="footer.line.library" />
      </main>
      <Footer />
    </>
  );
};

const Library = () => (
  <LanguageProvider>
    <LibraryContent />
  </LanguageProvider>
);

export default Library;
