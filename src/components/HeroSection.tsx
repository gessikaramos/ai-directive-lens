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
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Cream veil for legibility */}
      <div className="absolute inset-0 bg-background/55" />

      {/* Canon Wave 4A · Gradient fade suave pro Statement · Fred+Gé 5/jul */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none" />

      <div data-anim="hero-content" className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-ink mb-8"
          style={{ fontWeight: 600 }}
        >
          {t('hero.headline', lang)}
        </h1>
        {/* Wave 1.1 · Fred v1 canon · Hero support único · substitui tagline+body legacy */}
        <p
          className="text-lg md:text-2xl tracking-tight text-ink"
          style={{ fontWeight: 500 }}
        >
          {t('hero.support', lang)}
        </p>

        {/* Wave 1.1 hotfix · Fred/Gé 6/jul · Enter the Lab = botão primário sólido · Explore the Library = CTA secundário visível (canon Steve Jobs Lens: ação óbvia, contraste alto) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
          <Link
            to="/lab"
            className="label-style inline-flex items-center justify-center px-8 py-3.5 transition-colors duration-300"
            style={{
              backgroundColor: 'hsl(var(--ink))',
              color: 'hsl(var(--background))',
              fontWeight: 500,
              letterSpacing: '0.18em',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'hsl(var(--bronze))';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'hsl(var(--ink))';
            }}
          >
            {t('hero.cta.lab', lang)}
          </Link>
          <Link
            to="/library"
            className="label-style underline underline-offset-4 decoration-1 hover:decoration-2 transition-all duration-300"
            style={{
              color: 'hsl(var(--ink))',
              fontWeight: 500,
              letterSpacing: '0.18em',
            }}
          >
            {t('hero.cta.library', lang)}
          </Link>
        </div>
      </div>

      <div data-anim="scroll-indicator" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="label-style animate-subtle-bounce">{t('hero.scroll', lang)}</span>
        <div className="w-px h-8" style={{ backgroundColor: 'hsl(var(--ink) / 0.25)' }} />
      </div>
    </section>
  );
}
