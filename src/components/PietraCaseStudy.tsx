import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import Lightbox from './Lightbox';

const hollisCasting = [
  '/images/hollis/casting/hollis-frente.jpg',
  '/images/hollis/casting/hollis-costas.jpg',
  '/images/hollis/casting/hollis-perfil.jpg',
  '/images/hollis/casting/hollis-closeup.jpg',
  '/images/hollis/casting/hollis-34.jpg',
];

const campaignImages = Array.from({ length: 13 }, (_, i) =>
  `/images/hollis/campaign/campaign-${String(i + 1).padStart(2, '0')}.jpg`
).concat('/images/hollis/campaign/campaign-bottega.jpg');

const look1Images = Array.from({ length: 7 }, (_, i) =>
  `/images/hollis/look1/look1-${String(i + 1).padStart(2, '0')}.jpg`
);

const outrasImages = Array.from({ length: 9 }, (_, i) =>
  `/images/hollis/outras/hollis-outras-${String(i + 1).padStart(2, '0')}.jpg`
);

const krisStills = Array.from({ length: 4 }, (_, i) =>
  `/images/kris/still/kris-still-${String(i + 1).padStart(2, '0')}.jpg`
);

const krisCasting = [
  '/images/kris/casting/kris-frente.jpg',
  '/images/kris/casting/kris-costas.jpg',
  '/images/kris/casting/kris-perfil.jpg',
  '/images/kris/casting/kris-closeup.jpg',
  '/images/kris/casting/kris-34.jpg',
];

const pipelineSteps = [
  { num: '01', title: 'Characterization', desc: 'Character bible, visual DNA, personality' },
  { num: '02', title: 'Keyframes', desc: 'Midjourney + Nano Banana refinement' },
  { num: '03', title: 'Direction', desc: 'Prompt engineering, styling, composition' },
  { num: '04', title: 'Video', desc: 'Higgsfield + Kling 3.0 animation' },
  { num: '05', title: 'Post-Production', desc: 'DaVinci Resolve, LUT, color grading' },
];

interface ImageGridProps {
  images: string[];
  cols: string;
  onOpen: (src: string) => void;
}

const ImageGrid = ({ images, cols, onOpen }: ImageGridProps) => (
  <div className={`grid ${cols} gap-2`}>
    {images.map((src) => (
      <div
        key={src}
        className="cursor-pointer overflow-hidden group"
        onClick={() => onOpen(src)}
      >
        <img
          src={src}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    ))}
  </div>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="label-style mb-6">{children}</p>
);

const PietraCaseStudy = () => {
  const { lang } = useLanguage();
  const [lightbox, setLightbox] = useState<{ src: string; type: 'image' | 'video' } | null>(null);

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. Fullscreen Hero */}
      <div
        data-anim="pietra-hero"
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hollis/campaign/campaign-bottega.jpg)' }}
      >
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative z-10 text-center">
          <p className="label-style mb-4">{t('cases.pietra.label', lang)}</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.15em] text-foreground">
            PIETRA
          </h2>
          <p className="text-soft text-lg mt-4">{t('cases.pietra.tagline', lang)}</p>
        </div>
      </div>

      {/* 2. Intro + Metadata */}
      <div data-anim="case-reveal" className="px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <p className="text-foreground text-lg md:text-xl leading-relaxed">
            {t('cases.pietra.intro', lang)}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
          {[
            ['Client', 'Portfolio Piece'],
            ['Year', '2026'],
            ['Pipeline', 'Midjourney → Nano Banana → Higgsfield'],
            ['Output', '24 Images, 2 Videos, 10 Looks'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="label-style mb-1">{label}</p>
              <p className="text-foreground text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. AI Model Casting */}
      <div data-anim="case-reveal" className="px-6 md:px-12 lg:px-20">
        <SectionLabel>{t('cases.pietra.casting', lang)}</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Hollis', role: 'Lead Model — 8 Looks', img: '/images/hollis/casting/hollis-frente.jpg' },
            { name: 'Kris', role: 'Supporting Model — 2 Looks', img: '/images/kris/casting/kris-frente.jpg' },
          ].map((model) => (
            <div
              key={model.name}
              className="relative aspect-[2/3] overflow-hidden cursor-pointer group"
              onClick={() => setLightbox({ src: model.img, type: 'image' })}
            >
              <img
                src={model.img}
                alt={model.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h3 className="text-foreground text-2xl font-semibold">{model.name}</h3>
                <p className="text-soft text-sm">{model.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Hollis — Campaign Editorial */}
      <div data-anim="case-reveal" className="px-6 md:px-12 lg:px-20">
        <SectionLabel>HOLLIS — CAMPAIGN EDITORIAL</SectionLabel>
        <ImageGrid
          images={campaignImages}
          cols="grid-cols-2 md:grid-cols-4"
          onOpen={(src) => setLightbox({ src, type: 'image' })}
        />
      </div>

      {/* 5. Hollis — Look 1 (Bottega) */}
      <div data-anim="case-reveal" className="px-6 md:px-12 lg:px-20">
        <SectionLabel>HOLLIS — LOOK 1 (BOTTEGA)</SectionLabel>
        <ImageGrid
          images={look1Images}
          cols="grid-cols-2 md:grid-cols-3"
          onOpen={(src) => setLightbox({ src, type: 'image' })}
        />
      </div>

      {/* 6. Hollis — Other Shots */}
      <div data-anim="case-reveal" className="px-6 md:px-12 lg:px-20">
        <SectionLabel>HOLLIS — OTHER SHOTS</SectionLabel>
        <ImageGrid
          images={outrasImages}
          cols="grid-cols-2 md:grid-cols-3"
          onOpen={(src) => setLightbox({ src, type: 'image' })}
        />
      </div>

      {/* 7. Kris — Stills */}
      <div className="px-6 md:px-12 lg:px-20">
        <SectionLabel>KRIS — STILLS</SectionLabel>
        <ImageGrid
          images={krisStills}
          cols="grid-cols-2"
          onOpen={(src) => setLightbox({ src, type: 'image' })}
        />
      </div>

      {/* 8. Kris — Casting */}
      <div className="px-6 md:px-12 lg:px-20">
        <SectionLabel>KRIS — CASTING</SectionLabel>
        <ImageGrid
          images={krisCasting}
          cols="grid-cols-3 md:grid-cols-5"
          onOpen={(src) => setLightbox({ src, type: 'image' })}
        />
      </div>

      {/* 9. 360° Turnaround */}
      <div className="px-6 md:px-12 lg:px-20">
        <SectionLabel>360° TURNAROUND</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { src: '/videos/hollis-360.mp4', label: 'Hollis — 360°' },
            { src: '/videos/kris-360.mp4', label: 'Kris — 360°' },
          ].map((v) => (
            <div key={v.src} className="space-y-2">
              <div
                className="relative aspect-video overflow-hidden cursor-pointer group bg-card"
                onClick={() => setLightbox({ src: v.src, type: 'video' })}
              >
                <video
                  src={v.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="label-style">{v.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 10. Creative Pipeline */}
      <div className="px-6 md:px-12 lg:px-20">
        <SectionLabel>CREATIVE PIPELINE</SectionLabel>
        <div className="flex flex-col md:flex-row md:divide-x divide-border">
          {pipelineSteps.map((step) => (
            <div key={step.num} className="flex-1 py-6 md:py-0 md:px-6 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-border last:border-b-0">
              <p className="text-foreground font-semibold text-sm mb-1">
                <span className="text-dim mr-2">{step.num}</span>
                {step.title}
              </p>
              <p className="text-soft text-xs leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 11. CTA */}
      <div className="px-6 md:px-12 lg:px-20 text-center">
        <a
          href="#contact"
          className="inline-block text-foreground label-style border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300"
        >
          {t('cases.pietra.cta', lang)} →
        </a>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          type={lightbox.type}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
};

export default PietraCaseStudy;
