/**
 * SelectedHighlight · Wave 3.2 · canon Cláudio+Mary Fred+Gé 8/jul
 *
 * Reformulação canon Gé QA:
 *   - Home tem 3 DESTAQUES: 1 Studio (MasterChef) · 1 Lab (HIT) · 1 Library (Director's Prompt)
 *   - Pietra SAI da Home (fica no Studio · StudioExperiments · tile Hollis Pietra)
 *   - MasterChef categoria: INVESTOR PITCH · CINEMATIC PRODUCT REEL
 *   - MasterChef · destaque grande com poster + play Apple + Read Volume in Library CTA
 *   - HIT · card médio texto + Enter the Lab CTA
 *   - Director's Prompt · card médio texto + Read Volume CTA
 *   - Base dark ink coeso · aproximar internamente label→title→sub→CTA
 *
 * Canon travado:
 *   - Retailgrid Oy não aparece publicamente
 *   - Walter interno = pública = HIT (nome do assistente WalterLab não é dado)
 *   - Director's Prompt = Vol 01 available (canon Library)
 */
import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

const MASTERCHEF_YT_ID = 'MlNSjBN3xbc';
const MASTERCHEF_POSTER = `https://img.youtube.com/vi/${MASTERCHEF_YT_ID}/maxresdefault.jpg`;
// Embed URL canon Mary · autoplay + sem sugestões YouTube + modest branding + rel=0 (só do canal)
const MASTERCHEF_EMBED = `https://www.youtube-nocookie.com/embed/${MASTERCHEF_YT_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const SelectedHighlight = () => {
  const { lang } = useLanguage();
  const [hoverPlay, setHoverPlay] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section
      id="selected"
      className="pt-28 md:pt-36 pb-28 md:pb-36"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      {/* Header · centralizado */}
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto mb-16 md:mb-20">
        {/* Só o label — sem frase-síntese (canon Gé: "coloca só Selected Work") */}
        <span className="block" style={labelStyle}>
          {t('selected.label', lang)}
        </span>
      </div>

      {/* 1 · MasterChef · destaque Studio grande · player inline canon (não sai do site) */}
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto mb-24 md:mb-32">
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
          {/* "Read Volume in the Library" REMOVIDO (canon Gé 10/jul): apontava
              para o Vol 01 do Restricted Archive, descontinuado hoje. O case
              fala por si — a ação é o play. */}
        </div>
      </div>

      {/* Cards HIT + Director's Prompt REMOVIDOS (canon Gé 10/jul): Selected Work
          é só trabalho — MasterChef expandido, estilo Vision Pro. Walter e Library
          já têm hero, nav e Choose your path. */}
    </section>
  );
};

export default SelectedHighlight;
