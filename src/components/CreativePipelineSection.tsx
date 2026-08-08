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

// Swap 24/jul: YouTube placeholder → link Vimeo confirmado pela Gé
// (https://vimeo.com/1212739896). Poster hardcoded a partir do oEmbed da
// Vimeo (i.vimeocdn.com não tem endpoint estático previsível por ID como o
// img.youtube.com/vi/{id} usado antes — precisa da URL real do thumbnail).
const MASTERCHEF_VIMEO_ID = '1212739896';
const MASTERCHEF_POSTER =
  'https://i.vimeocdn.com/video/2183250292-c757a84d4c294bc2f9b4d609ab1d10c71de2485ae9af912ef3a0f6777cd9ff7c-d_1920x1080?region=us';
// title=0&byline=0&portrait=0 = equivalente Vimeo do modestbranding; dnt=1 desliga tracking
const MASTERCHEF_EMBED = `https://player.vimeo.com/video/${MASTERCHEF_VIMEO_ID}?autoplay=1&title=0&byline=0&portrait=0&dnt=1&playsinline=1`;

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
      className="pt-20 md:pt-24 pb-20 md:pb-24"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      {/* Composition Pass: indicação curta → IMAGEM como primeira grande
          revelação → título → contexto. A prova responde à promessa do hero
          sem um vale de espaço morto no meio. */}
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto mb-10 md:mb-12">
        <span className="block" style={labelStyle}>
          {t('selected.label', lang)}
        </span>
      </div>

      {/* 1 · MasterChef · destaque Studio grande · player inline canon (não sai do site)
          8/ago: id="masterchef" pra permitir deep-link direto ao case
          (usado no CV externo, LinkedIn, etc.). data-lenis-prevent no
          wrapper e no iframe pra Lenis (smooth scroll) parar de interceptar
          hover events dentro do player Vimeo — bug relatado: controles somem
          ao começar o vídeo e não voltam com mouseover. */}
      <div id="masterchef" className="px-6 md:px-12 max-w-[1200px] mx-auto scroll-mt-24">
        <div
          className="relative w-full mb-8 md:mb-10 overflow-hidden"
          data-lenis-prevent
          style={{ aspectRatio: '16 / 9', backgroundColor: 'hsl(var(--ink-soft))' }}
        >
          {videoPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={MASTERCHEF_EMBED}
              title="MasterChef · LolaLab AI-Directed Cinematic Film"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              data-lenis-prevent
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
