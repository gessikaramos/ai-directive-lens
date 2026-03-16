import { useState } from 'react';
import Lightbox from './Lightbox';
import AudioPlayer from './AudioPlayer';

/* ─── helper: clickable image grid ─── */
function ImageGrid({
  images,
  cols = 3,
}: {
  images: { src: string; alt: string }[];
  cols?: number;
}) {
  const [lb, setLb] = useState<string | null>(null);
  const colClass =
    cols === 5
      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
      : cols === 4
      ? 'grid-cols-2 md:grid-cols-4'
      : cols === 3
      ? 'grid-cols-2 md:grid-cols-3'
      : 'grid-cols-1 sm:grid-cols-2';

  return (
    <>
      <div className={`grid ${colClass} gap-2`}>
        {images.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="w-full aspect-[2/3] object-cover object-top cursor-pointer hover:scale-[1.03] transition-transform duration-300"
            onClick={() => setLb(img.src)}
          />
        ))}
      </div>
      {lb && <Lightbox src={lb} alt="" onClose={() => setLb(null)} />}
    </>
  );
}

/* ─── helper: video grid ─── */
function VideoGrid({
  videos,
}: {
  videos: { src: string; label: string }[];
}) {
  const [lb, setLb] = useState<string | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((v) => (
          <div key={v.src} className="cursor-pointer" onClick={() => setLb(v.src)}>
            <video
              src={v.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-video object-cover hover:scale-[1.02] transition-transform duration-300"
            />
            <p className="label-style mt-2">{v.label}</p>
          </div>
        ))}
      </div>
      {lb && <Lightbox src={lb} type="video" onClose={() => setLb(null)} />}
    </>
  );
}

/* ─── CTA buttons ─── */
function ModalCTA() {
  return (
    <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-border">
      <a
        href="#contact"
        className="px-6 py-3 text-sm font-medium text-primary-foreground bg-foreground hover:bg-foreground/90 transition-colors"
      >
        Start a Project
      </a>
      <a
        href="https://www.upwork.com/freelancers/lolalabstudio?mp_source=share"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 text-sm font-medium text-foreground border border-border hover:bg-secondary transition-colors"
      >
        Hire on Upwork →
      </a>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <h4 className="label-style mb-4 mt-10">{children}</h4>;
}

/* ════════════════════════════════════════════════
   1. AI Character Design
   ════════════════════════════════════════════════ */
export function CharacterContent() {
  const hollisCasting = [
    'hollis-frente', 'hollis-costas', 'hollis-perfil', 'hollis-closeup', 'hollis-34',
  ].map((n) => ({ src: `/images/hollis/casting/${n}.jpg`, alt: n }));
  const krisCasting = [
    'kris-frente', 'kris-costas', 'kris-perfil', 'kris-closeup', 'kris-34',
  ].map((n) => ({ src: `/images/kris/casting/${n}.jpg`, alt: n }));

  return (
    <div>
      <p className="label-style mb-2">AI Character Design</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Characters With Memory</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Design of AI characters with stable visual DNA across scenes, angles, and styles.
        Built through prompt engineering and visual direction so identities remain coherent
        across an entire narrative.
      </p>

      <SectionLabel>AI Casting — Hollis</SectionLabel>
      <ImageGrid images={hollisCasting} cols={5} />

      <SectionLabel>AI Casting — Kris</SectionLabel>
      <ImageGrid images={krisCasting} cols={5} />

      <SectionLabel>360° Turnaround</SectionLabel>
      <VideoGrid
        videos={[
          { src: '/videos/hollis-360.mp4', label: 'Hollis — 360°' },
          { src: '/videos/kris-360.mp4', label: 'Kris — 360°' },
        ]}
      />

      <ModalCTA />
    </div>
  );
}

/* ════════════════════════════════════════════════
   2. AI Fashion Direction
   ════════════════════════════════════════════════ */
export function FashionContent() {
  const campaign = Array.from({ length: 13 }, (_, i) => ({
    src: `/images/hollis/campaign/campaign-${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `Campaign ${i + 1}`,
  }));
  campaign.push({ src: '/images/hollis/campaign/campaign-bottega.jpg', alt: 'Campaign Bottega' });

  return (
    <div>
      <p className="label-style mb-2">AI Fashion Direction</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Editorial Without Cameras</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Fashion editorials and campaigns developed through AI visual pipelines. Direction covers
        styling, casting, lighting, and composition while preserving the language of real photography.
      </p>

      <SectionLabel>Hollis — Campaign</SectionLabel>
      <ImageGrid images={campaign} cols={3} />

      <ModalCTA />
    </div>
  );
}

/* ════════════════════════════════════════════════
   3. Costume & Styling
   ════════════════════════════════════════════════ */
export function CostumeContent() {
  const look1 = Array.from({ length: 7 }, (_, i) => ({
    src: `/images/hollis/look1/look1-${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `Look 1 - ${i + 1}`,
  }));
  const krisStills = Array.from({ length: 4 }, (_, i) => ({
    src: `/images/kris/still/kris-still-${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `Kris Still ${i + 1}`,
  }));

  return (
    <div>
      <p className="label-style mb-2">Costume & Styling</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Dressing What Doesn't Exist</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Complete wardrobe direction for AI-generated characters — from fabric selection to styling composition.
        Every look is designed to ground digital figures in physical reality.
      </p>

      <SectionLabel>Hollis — Look 1 (Bottega)</SectionLabel>
      <ImageGrid images={look1} cols={3} />

      <SectionLabel>Kris — Stills</SectionLabel>
      <ImageGrid images={krisStills} cols={2} />

      <ModalCTA />
    </div>
  );
}

/* ════════════════════════════════════════════════
   4. Video Production
   ════════════════════════════════════════════════ */
export function VideoContent() {
  return (
    <div>
      <p className="label-style mb-2">Video Production</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Motion With Intention</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Cinematic video production using AI pipelines — from keyframes to graded final cut.
        Tools include Higgsfield, Kling, Veo, and DaVinci Resolve for professional post-production.
      </p>

      <SectionLabel>Films & Campaigns</SectionLabel>
      <VideoGrid
        videos={[
          { src: '/videos/bloom-final.mp4', label: 'BLOOM — Short Film' },
          { src: '/videos/bewe-shearling.mp4', label: 'Be We — Shearling Campaign' },
        ]}
      />

      <ModalCTA />
    </div>
  );
}

/* ════════════════════════════════════════════════
   5. Copywriting
   ════════════════════════════════════════════════ */
export function CopywritingContent() {
  return (
    <div>
      <p className="label-style mb-2">Copywriting</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Words That Frame Worlds</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Manifestos, scripts, and narrative direction for AI-driven projects. Every word is crafted
        to anchor visual storytelling in language that resonates with purpose.
      </p>

      <div className="mt-8 space-y-6">
        <blockquote className="border-l-2 border-border pl-6 py-2">
          <p className="text-lg md:text-xl font-light text-foreground italic leading-relaxed">
            "She wasn't built to perform. She was built to remember."
          </p>
          <footer className="label-style mt-3">— LOLA, Short Film Manifesto</footer>
        </blockquote>
        <blockquote className="border-l-2 border-border pl-6 py-2">
          <p className="text-lg md:text-xl font-light text-foreground italic leading-relaxed">
            "Direction isn't about control. It's about knowing what deserves to exist."
          </p>
          <footer className="label-style mt-3">— Lola Lab, Brand Voice</footer>
        </blockquote>
        <blockquote className="border-l-2 border-border pl-6 py-2">
          <p className="text-lg md:text-xl font-light text-foreground italic leading-relaxed">
            "Every frame is a decision. Every cut is a conviction."
          </p>
          <footer className="label-style mt-3">— BLOOM, Opening Narration</footer>
        </blockquote>
      </div>

      <ModalCTA />
    </div>
  );
}

/* ════════════════════════════════════════════════
   6. Technology
   ════════════════════════════════════════════════ */
export function TechnologyContent() {
  return (
    <div>
      <p className="label-style mb-2">Technology</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Built To Think</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        AI tools and pipelines designed from concept to UX. From custom workflows integrating
        Midjourney, Nano Banana, and Higgsfield to building digital products that leverage
        generative AI for creative production at scale.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: 'Prompt Engineering', desc: 'Systematic prompt architecture for consistent character and scene generation.' },
          { title: 'Pipeline Design', desc: 'End-to-end workflows connecting generation, refinement, and post-production tools.' },
          { title: 'AI Model Selection', desc: 'Strategic evaluation of Midjourney, DALL-E, Stable Diffusion, and emerging models.' },
          { title: 'Product Development', desc: 'Digital products and interfaces built with AI-native thinking.' },
        ].map((item) => (
          <div key={item.title} className="p-5 bg-accent-surface border border-border">
            <h5 className="text-sm font-semibold text-foreground mb-2">{item.title}</h5>
            <p className="text-soft text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <ModalCTA />
    </div>
  );
}

/* ════════════════════════════════════════════════
   7. Soundtrack
   ════════════════════════════════════════════════ */
export function SoundtrackContent() {
  return (
    <div>
      <p className="label-style mb-2">Soundtrack</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Sound Shapes Emotion</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Original music composed for cinematic storytelling. Each soundtrack is directed to
        amplify the emotional arc of the visual narrative.
      </p>

      <SectionLabel>Tracks</SectionLabel>
      <div className="space-y-3">
        <AudioPlayer src="/audio/soundtrack-lola.mov" label="A Fragile Light — Lola (Short Film)" />
      </div>

      <ModalCTA />
    </div>
  );
}

/* ════════════════════════════════════════════════
   8. Voice Design
   ════════════════════════════════════════════════ */
export function VoiceDesignContent() {
  return (
    <div>
      <p className="label-style mb-2">Voice Design</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Cloned Voice, Authored Tone</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Cinematic narration with cloned voice models. Custom voice design using ElevenLabs
        for consistent, emotionally directed voiceover across projects.
      </p>

      <SectionLabel>Audio Samples</SectionLabel>
      <div className="space-y-3">
        <AudioPlayer src="/audio/lola-audio-final.mp3" label="Lola — Final Audio" />
        <AudioPlayer src="/audio/voz-gessika.mp3" label="Voice Clone — ElevenLabs" />
      </div>

      <ModalCTA />
    </div>
  );
}
