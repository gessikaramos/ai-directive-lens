/**
 * SelectedHighlight · Wave 3.2 → Wave "Studio Homepage" (10/set, brief Gé)
 *
 * 10/set: a seção tinha 1 bloco só (MasterChef). O visitante-alvo agora é
 * quem decide se bota o estúdio no roster de uma agência — "the work is the
 * argument" — então a seção ganha 2 blocos de prova ANTES do filme:
 * consistência de personagem (galeria de /studio/characters) e wardrobe
 * (galeria de /studio/costume). Mesmas imagens, mesmos dados
 * (src/data/galleryImages.ts) — não duplica arquivo, só reusa.
 *
 * MasterChef (Block C) mantém a cópia exatamente como estava; o único fix
 * é o poster, que carregava um frame preto com o card de abertura ("A Film
 * · Lola Lab.") em vez de um still real — ver public/images/masterchef-poster.jpg.
 */
import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import { CHARACTER_GALLERY_BUST, COSTUME_STYLING_GALLERY, GalleryImage } from '@/data/galleryImages';

const MASTERCHEF_VIMEO_ID = '1212739896';
// 10/set: era o thumbnail auto-selecionado pela Vimeo — caía bem no frame de
// abertura (preto, título "A Film · Lola Lab." quase invisível). Trocado por
// um still real do próprio filme (extraído do player em ~6s, cena "Selection").
const MASTERCHEF_POSTER = '/images/masterchef-poster.jpg';
const MASTERCHEF_EMBED = `https://player.vimeo.com/video/${MASTERCHEF_VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1`;

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const blockHeadlineStyle = {
  fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
  fontWeight: 400,
  letterSpacing: '-0.02em',
  lineHeight: 1.15,
  color: '#FFFFFF',
};

const blockBodyStyle = {
  fontSize: '0.9375rem',
  fontWeight: 300,
  lineHeight: 1.65,
  color: 'hsl(var(--cool-gray-tertiary))',
};

/* ─── Full-width proof grid (Block A · Block B) ───
   Mesma linguagem visual da ModalGallery (aspect-[3/4], object-cover) só
   que grande e full-width — aqui a imagem É o argumento, não uma prévia de
   modal. Primeiras 2 de cada grid eager+high priority (mesma lógica de
   perf da ModalGallery), resto lazy. */
const ProofGrid = ({ images, cols }: { images: GalleryImage[]; cols: string }) => (
  <div className={`grid grid-cols-2 ${cols} gap-2 md:gap-3`}>
    {images.map((img, i) => (
      <div key={img.src} className="overflow-hidden" style={{ backgroundColor: 'hsl(var(--ink-soft))' }}>
        <picture>
          <source srcSet={img.webp} type="image/webp" />
          <img
            src={img.src}
            width={img.width}
            height={img.height}
            alt=""
            loading={i < 2 ? 'eager' : 'lazy'}
            {...(i < 2 ? { fetchpriority: 'high' } : {})}
            className="w-full aspect-[3/4] object-cover object-top"
          />
        </picture>
      </div>
    ))}
  </div>
);

const SelectedHighlight = () => {
  const { lang } = useLanguage();
  const [hoverPlay, setHoverPlay] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section
      id="selected"
      className="pt-20 md:pt-24 pb-20 md:pb-24"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto mb-14 md:mb-16">
        <span className="block" style={labelStyle}>
          {t('selected.label', lang)}
        </span>
      </div>

      {/* Block A · Consistency — character sheet from /studio/characters */}
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto mb-20 md:mb-28">
        <div className="max-w-[720px] mb-8 md:mb-10">
          <span className="block mb-3" style={{ ...labelStyle, letterSpacing: '0.2em', fontSize: '0.65rem' }}>
            Consistency
          </span>
          <h3 className="mb-4" style={blockHeadlineStyle}>
            One person. Five angles. Generated, not photographed.
          </h3>
          <p style={blockBodyStyle}>
            The same face, the same light, the same wardrobe — held across every frame. This is
            the problem most AI production cannot solve.
          </p>
        </div>
        <ProofGrid images={CHARACTER_GALLERY_BUST} cols="md:grid-cols-5" />
      </div>

      {/* Block B · Wardrobe — styling detail from /studio/costume */}
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto mb-20 md:mb-28">
        <div className="max-w-[720px] mb-8 md:mb-10">
          <span className="block mb-3" style={{ ...labelStyle, letterSpacing: '0.2em', fontSize: '0.65rem' }}>
            Wardrobe
          </span>
          <h3 className="mb-4" style={blockHeadlineStyle}>
            Real garment logic, on a cast that does not exist.
          </h3>
          <p style={blockBodyStyle}>
            Fabric, drape and detail carried shot to shot — down to the cufflink.
          </p>
        </div>
        <ProofGrid images={COSTUME_STYLING_GALLERY} cols="md:grid-cols-4" />
      </div>

      {/* Block C · Film · MasterChef — destaque Studio grande, cópia inalterada */}
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto">
        <div
          className="relative w-full mb-8 md:mb-10 overflow-hidden"
          style={{ aspectRatio: '16 / 9', backgroundColor: 'hsl(var(--ink-soft))' }}
        >
          {videoPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={MASTERCHEF_EMBED}
              title="MasterChef · LolaLab AI-Directed Cinematic Film"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              style={{ border: 0 }}
            />
          ) : (
            <button
              type="button"
              onClick={() => setVideoPlaying(true)}
              className="block relative w-full h-full overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoverPlay(true)}
              onMouseLeave={() => setHoverPlay(false)}
              aria-label="Play MasterChef film"
            >
              <img
                src={MASTERCHEF_POSTER}
                alt="MasterChef · LolaLab AI-Directed Cinematic Film"
                loading="lazy"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{ backgroundColor: 'hsl(var(--ink) / 0.15)', opacity: hoverPlay ? 0.05 : 0.15 }}
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="rounded-full flex items-center justify-center transition-all duration-500"
                  style={{
                    width: hoverPlay ? '84px' : '72px',
                    height: hoverPlay ? '84px' : '72px',
                    backgroundColor: 'hsl(var(--background) / 0.95)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" style={{ marginLeft: '3px' }}>
                    <path d="M0 0 L20 11 L0 22 Z" fill="hsl(var(--ink))" />
                  </svg>
                </div>
              </div>
            </button>
          )}
        </div>

        <div className="max-w-[720px]">
          <span className="block mb-3" style={{ ...labelStyle, letterSpacing: '0.2em', fontSize: '0.65rem' }}>
            {t('selected.masterchef.tag', lang)}
          </span>
          <h3
            className="mb-2"
            style={{
              fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: '#FFFFFF',
            }}
          >
            {t('selected.masterchef.title', lang)}
          </h3>
          <p
            className="mb-5"
            style={{
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'hsl(var(--cool-gray-secondary))',
            }}
          >
            Studio · Selected Case
          </p>
          <p
            className="mb-6 max-w-[62ch]"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'hsl(var(--cool-gray-tertiary))',
            }}
          >
            {t('selected.masterchef.desc', lang)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SelectedHighlight;
