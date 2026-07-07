/**
 * ManifestoSlice · Wave 2.1 · canon Fred+Gé 7/jul (bloco novo)
 *
 * Copy canon travado:
 *   line1: "The machine can produce. But it cannot know what is yours. That is where direction begins."
 *   line2: "LolaLab translates human intention into form — until the machine disappears
 *          and only what you meant to say remains."
 *
 * Tratamento canon travado:
 *   - dark ink section (bg-ink · text cream)
 *   - tipografia grande (editorial)
 *   - motion lento (data-anim="manifesto-reveal" · duration ampliado no hook)
 *   - sem CTA
 *   - sem imagem
 *   - sem parallax pesado
 *   - sem scroll hijacking
 *
 * Posição canon Home: entre SelectedWork e HomeAboutPreview.
 * Serve pra respirar postura, não pra converter.
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function ManifestoSlice() {
  const { lang } = useLanguage();

  return (
    <section
      className="px-6 md:px-12 py-32 md:py-40 overflow-hidden"
      style={{
        backgroundColor: 'hsl(var(--ink))',
        color: 'hsl(var(--background))',
      }}
    >
      <div className="max-w-[1100px] mx-auto text-center">
        <p
          data-anim="manifesto-reveal"
          className="text-2xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight mb-10 md:mb-14"
          style={{ fontWeight: 500 }}
        >
          {t('manifesto.line1', lang)}
        </p>
        <p
          data-anim="manifesto-reveal"
          className="text-xl md:text-3xl lg:text-4xl leading-[1.3] tracking-tight opacity-80"
          style={{ fontWeight: 400 }}
        >
          {t('manifesto.line2', lang)}
        </p>
      </div>
    </section>
  );
}
