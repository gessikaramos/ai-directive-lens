/**
 * HeroSection · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 *
 * Refinos sobre 3.0-A:
 *   - Veil dark 20% (antes 35%) · vídeo respira mais
 *   - Tipografia refinada Apple: weight 400 (não 500), letter-spacing -0.02em (não -0.035em)
 *   - Escala moderada: clamp(3rem, 7.5vw, 7rem) em vez de 9vw/9rem
 *   - Support cream 65% opacity · line-height 1.4
 *   - CTAs com fadeup suave · label-style clean
 *   - Sem grain overlay (era ruído desnecessário)
 *   - Fade final transparente para dark ink continuar
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

      {/* Wave 3.0-C · canon Mary · veil dark 22% · film grain 4% cinema · gradient bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--ink) / 0.22)' }}
      />

      {/* Film grain SVG noise 4% · afasta cliché tecnológico · canon Mary */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Gradient bottom para continuar dark ink */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent, hsl(var(--ink)))`,
        }}
      />

      <div
        data-anim="hero-content"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <h1
          className="mb-6"
          style={{
            fontSize: 'clamp(3rem, 7.5vw, 7rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
            color: '#FFFFFF',
          }}
        >
          {t('hero.headline', lang)}
        </h1>
        <p
          className="max-w-xl mx-auto"
          style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
            fontWeight: 300,
            letterSpacing: '0',
            color: 'hsl(var(--cool-gray-tertiary))',
            lineHeight: 1.5,
          }}
        >
          {t('hero.support', lang)}
        </p>

        {/* Os DOIS caminhos vivem AQUI no hero (canon Gé 10/jul) — os botões
            duplicados do Statement foram removidos. Pills canon Vision Pro. */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/library/direction-over-prompt"
            className="px-9 py-3.5 transition-all duration-300 hover:opacity-85 hover:scale-[1.02]"
            style={{
              backgroundColor: 'hsl(var(--bronze-soft))',
              color: 'hsl(var(--ink))',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {t('hero.cta.lab', lang)}
          </Link>
          <Link
            to="/contact"
            className="px-9 py-3.5 transition-all duration-300 hover:opacity-85 hover:scale-[1.02]"
            style={{
              backgroundColor: 'transparent',
              color: 'hsl(var(--background) / 0.9)',
              border: '1px solid hsl(var(--background) / 0.3)',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {t('hero.cta.library', lang)}
          </Link>
        </div>
      </div>

      {/* Wave 3.1.1 · canon Mary QA · SCROLL indicator removido · deixar layout induzir orgânico A24 */}
    </section>
  );
}
