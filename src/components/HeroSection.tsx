import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function HeroSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hollis/campaign/campaign-bottega.jpg"
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/50" />

      {/* Content */}
      <div data-anim="hero-content" className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] text-foreground mb-6">
          {t('hero.headline', lang)}
        </h1>
        <p className="text-base md:text-lg font-light tracking-wide text-soft">
          {t('hero.tagline', lang)}
        </p>
      </div>

      {/* Scroll indicator */}
      <div data-anim="scroll-indicator" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="label-style animate-subtle-bounce">{t('hero.scroll', lang)}</span>
        <div className="w-px h-8 bg-foreground/20" />
      </div>
    </section>
  );
}
