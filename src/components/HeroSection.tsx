/**
 * HeroSection · Wave 3.0-A · canon Mary Fred+Gé 7/jul
 *
 * Upgrade sobre Wave 2.1:
 *   - Base dark premium (bg-ink) · vídeo protagonista sem cream veil
 *   - Tipografia MONUMENTAL cream/off-white sobre dark
 *   - Letter-spacing negativo canon Mary (-0.035em display)
 *   - Line-height cinemático 1.02-1.05
 *   - CTAs redesenhados: cream underline editorial · sem botão preto genérico
 *   - Scroll indicator cream discreto
 *   - Gradient fade cinemático dark → cream (transição pra Statement dark)
 *   - Grain overlay sutil (film noise 3%)
 *
 * Regras canon:
 *   - Copy Hero mantido: hero.headline + hero.support
 *   - Fallback autoplay policy mantido (touchstart/click)
 *   - Zero bounce, zero glow, zero SaaS
 *   - Rotas /lab e /library mantidas
 */
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function HeroSection() {
  const { lang } = useLanguage();
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const tryPlay = () => {
      video.play().catch(() => {
        const playOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener('touchstart', playOnInteraction);
          document.removeEventListener('click', playOnInteraction);
        };
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('click', playOnInteraction, { once: true });
      });
    };
    if (video.readyState >= 3) tryPlay();
    else video.addEventListener('canplay', tryPlay, { once: true });
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      {/* Vídeo full-bleed sem veil · canon Mary */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Veil dark cinemático leve pra dar respiro à tipografia sem cobrir o vídeo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--ink) / 0.35)' }}
      />

      {/* Grain overlay cinemático · SVG noise 3% */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Gradient fade sutil pro Statement (dark → dark suave) */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent, hsl(var(--ink)))`,
        }}
      />

      <div
        data-anim="hero-content"
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        <h1
          className="mb-8 leading-[1.02]"
          style={{
            fontSize: 'clamp(3.5rem, 9vw, 9rem)',
            fontWeight: 500,
            letterSpacing: '-0.035em',
            color: 'hsl(var(--background))',
          }}
        >
          {t('hero.headline', lang)}
        </h1>
        <p
          className="max-w-2xl mx-auto"
          style={{
            fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.005em',
            color: 'hsl(var(--background) / 0.7)',
            lineHeight: 1.4,
          }}
        >
          {t('hero.support', lang)}
        </p>

        {/* CTAs canon Mary · underline editorial cream · sem botão preto genérico */}
        <div className="mt-14 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          <Link
            to="/lab"
            className="label-style transition-opacity duration-300 hover:opacity-70"
            style={{
              color: 'hsl(var(--background))',
              fontWeight: 500,
              letterSpacing: '0.18em',
              borderBottom: '1px solid hsl(var(--background))',
              paddingBottom: '4px',
            }}
          >
            {t('hero.cta.lab', lang)}
          </Link>
          <Link
            to="/library"
            className="label-style transition-opacity duration-300 hover:opacity-70"
            style={{
              color: 'hsl(var(--background) / 0.6)',
              fontWeight: 500,
              letterSpacing: '0.18em',
            }}
          >
            {t('hero.cta.library', lang)}
          </Link>
        </div>
      </div>

      {/* Scroll indicator cream discreto */}
      <div
        data-anim="scroll-indicator"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span
          className="label-style"
          style={{ color: 'hsl(var(--background) / 0.5)', fontWeight: 500 }}
        >
          {t('hero.scroll', lang)}
        </span>
        <div
          className="w-px h-10"
          style={{ backgroundColor: 'hsl(var(--background) / 0.3)' }}
        />
      </div>
    </section>
  );
}
