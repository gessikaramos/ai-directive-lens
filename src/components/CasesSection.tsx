import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import PietraCaseStudy from './PietraCaseStudy';
import Lightbox from './Lightbox';

interface CaseCard {
  slug: string;
  video: string;
  title: string;
  subtitle: string;
  ctaKey: string;
}

const caseCards: CaseCard[] = [
  {
    slug: 'bloom',
    video: '/videos/bloom-final.mp4',
    title: 'BLOOM',
    subtitle: 'AI-Directed Short Film',
    ctaKey: 'cases.bloom.cta',
  },
  {
    slug: 'bewe',
    video: '/videos/bewe-shearling.mp4',
    title: 'Be We',
    subtitle: 'AI Fashion Video Campaign',
    ctaKey: 'cases.bewe.cta',
  },
];

const CasesSection = () => {
  const { lang } = useLanguage();
  const [videoLightbox, setVideoLightbox] = useState<string | null>(null);

  return (
    <section id="cases" className="section-spacing">
      {/* Section label */}
      <div className="px-6 md:px-12 lg:px-20 mb-16">
        <p className="label-style">{t('cases.label', lang)}</p>
      </div>

      {/* PIETRA — Expanded Case Study */}
      <PietraCaseStudy />

      {/* Spacer */}
      <div className="h-16 md:h-24" />

      {/* BLOOM + Be We — Fullscreen Video Cards */}
      {caseCards.map((card) => (
        <a
          key={card.slug}
          href="#"
          data-video={card.slug}
          onClick={(e) => {
            e.preventDefault();
            setVideoLightbox(card.video);
          }}
          data-anim="video-card"
          className="relative min-h-[70vh] flex items-center justify-center overflow-hidden cursor-pointer group block"
        >
          <video
            src={card.video}
            muted
            autoPlay
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-background/60 group-hover:bg-background/50 transition-colors duration-500" />
          <div data-anim="video-card-content" className="relative z-10 text-center">
            <p className="label-style mb-3">CASE STUDY</p>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-wider mb-3">
              {card.title}
            </h2>
            <p className="text-soft text-base mb-6">{card.subtitle}</p>
            <span className="label-style border-b border-foreground/30 pb-1 group-hover:border-foreground transition-colors duration-300">
              {t(card.ctaKey, lang)}
            </span>
          </div>
        </a>
      ))}

      {/* Video Lightbox */}
      {videoLightbox && (
        <Lightbox
          src={videoLightbox}
          type="video"
          onClose={() => setVideoLightbox(null)}
        />
      )}
    </section>
  );
};

export default CasesSection;
