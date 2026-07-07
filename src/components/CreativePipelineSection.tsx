/**
 * SelectedWorkSection · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 *
 * Refactor:
 *   - Base dark ink (coerência global · não intervalar cores sem lógica)
 *   - MasterChef: POSTER FRAME custom + play button Apple-style (não iframe YouTube feio)
 *   - Clique abre YouTube em nova aba (sem controles quebrando premium)
 *   - Pietra: FULL-BLEED viewport-width (100vw) · sem box com margem
 *   - Aspect cinemascope 21:9
 *   - Tipografia refinada Apple weight 400 · letter-spacing -0.02em
 *   - Espaçamento controlado (proximidade dentro do bloco · respiro entre blocos)
 *   - Cream sobre dark
 *
 * Canon Fred travado:
 *   - Retailgrid Oy não aparece publicamente
 *   - MasterChef como nome público OK
 *   - Pietra disclaimer canon mantido
 */
import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

const MASTERCHEF_YT_ID = 'MlNSjBN3xbc';
const MASTERCHEF_POSTER = `https://img.youtube.com/vi/${MASTERCHEF_YT_ID}/maxresdefault.jpg`;
const MASTERCHEF_URL = `https://www.youtube.com/watch?v=${MASTERCHEF_YT_ID}`;

const SelectedWorkSection = () => {
  const { lang } = useLanguage();
  const [hoverPlay, setHoverPlay] = useState(false);

  return (
    <section
      id="selected"
      className="pt-32 md:pt-44 pb-32 md:pb-44"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      {/* Label · centralizado · respiro grande */}
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-20 md:mb-28">
        <span
          style={{
            color: 'hsl(var(--bronze-soft))',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          {t('selected.label', lang)}
        </span>
      </div>

      {/* MasterChef · poster custom + play Apple */}
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto mb-32 md:mb-44">
        <a
          href={MASTERCHEF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full mb-12 md:mb-16 overflow-hidden group cursor-pointer"
          style={{ aspectRatio: '16 / 9', backgroundColor: 'hsl(var(--ink-soft))' }}
          onMouseEnter={() => setHoverPlay(true)}
          onMouseLeave={() => setHoverPlay(false)}
        >
          <img
            src={MASTERCHEF_POSTER}
            alt="MasterChef · LolaLab AI-Directed Cinematic Film"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Veil dark leve pra deixar play button legível */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{ backgroundColor: 'hsl(var(--ink) / 0.15)', opacity: hoverPlay ? 0.05 : 0.15 }}
          />
          {/* Play button Apple-style · círculo cream 72px · triangle preto */}
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
              <svg
                width="20"
                height="22"
                viewBox="0 0 20 22"
                fill="none"
                style={{ marginLeft: '3px' }}
              >
                <path d="M0 0 L20 11 L0 22 Z" fill="hsl(var(--ink))" />
              </svg>
            </div>
          </div>
        </a>

        {/* Metadata MasterChef · dark card */}
        <div className="max-w-[720px]">
          <span
            className="block mb-4"
            style={{
              color: 'hsl(var(--bronze-soft))',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {t('selected.masterchef.tag', lang)}
          </span>
          <h3
            className="mb-3"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'hsl(var(--background))',
            }}
          >
            {t('selected.masterchef.title', lang)}
          </h3>
          <p
            className="mb-6"
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'hsl(var(--background) / 0.5)',
            }}
          >
            {t('selected.masterchef.client', lang)}
          </p>
          <p
            className="mb-8"
            style={{
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'hsl(var(--background) / 0.75)',
            }}
          >
            {t('selected.masterchef.desc', lang)}
          </p>
          <p
            className="italic pt-6"
            style={{
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'hsl(var(--background) / 0.6)',
              borderTop: '1px solid hsl(var(--background) / 0.12)',
            }}
          >
            {t('selected.masterchef.bridge', lang)}
          </p>
        </div>
      </div>

      {/* Pietra · FULL-BLEED · viewport width · cinemascope */}
      <div
        className="w-full mb-12 md:mb-16 overflow-hidden"
        style={{
          aspectRatio: '21 / 9',
          backgroundColor: 'hsl(var(--ink-soft))',
        }}
      >
        <img
          src="/images/hollis/campaign/campaign-bottega.jpg"
          alt="PIETRA — editorial fashion collection · speculative luxury system"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Metadata Pietra */}
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="max-w-[720px]">
          <span
            className="block mb-4"
            style={{
              color: 'hsl(var(--bronze-soft))',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {t('selected.pietra.tag', lang)}
          </span>
          <h3
            className="mb-5"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'hsl(var(--background))',
            }}
          >
            {t('selected.pietra.title', lang)}
          </h3>
          <p
            className="mb-6"
            style={{
              fontSize: '1rem',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'hsl(var(--background) / 0.75)',
            }}
          >
            {t('selected.pietra.desc', lang)}
          </p>
          <p
            className="italic"
            style={{
              fontSize: '0.75rem',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'hsl(var(--background) / 0.4)',
            }}
          >
            {t('selected.pietra.legal', lang)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorkSection;
