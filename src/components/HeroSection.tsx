import { useState, useRef, useEffect } from 'react';
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
      <div className="absolute inset-0 bg-background/65" />

      <div data-anim="hero-content" className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-ink mb-8"
          style={{ fontWeight: 600 }}
        >
          {t('hero.headline', lang)}
        </h1>
        <p
          className="text-lg md:text-2xl tracking-tight text-ink mb-4"
          style={{ fontWeight: 500 }}
        >
          {t('hero.tagline', lang)}
        </p>
        <p className="text-sm md:text-base text-ink-soft" style={{ fontWeight: 400 }}>
          {t('hero.body', lang)}
        </p>
      </div>

      <div data-anim="scroll-indicator" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="label-style animate-subtle-bounce">{t('hero.scroll', lang)}</span>
        <div className="w-px h-8" style={{ backgroundColor: 'hsl(var(--ink) / 0.25)' }} />
      </div>
    </section>
  );
}
