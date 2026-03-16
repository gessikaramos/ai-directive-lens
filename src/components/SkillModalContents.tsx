import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import Lightbox from './Lightbox';

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

/* ─── Reusable gallery ─── */
interface ModalGalleryProps {
  images: string[];
  title: string;
  onOpen: (src: string) => void;
}

const ModalGallery = ({ images, title, onOpen }: ModalGalleryProps) => (
  <div className="mt-10">
    <h4 className="label-style mb-4">{title}</h4>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {images.map((src) => (
        <div key={src} className="overflow-hidden cursor-pointer" onClick={() => onOpen(src)}>
          <img
            src={src}
            alt=""
            loading="lazy"
            className="w-full aspect-[9/16] object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
      ))}
    </div>
  </div>
);

/* ─── Clickable video thumbnail ─── */
interface VideoThumbnailProps {
  src: string;
  onOpen: (src: string) => void;
  className?: string;
}

const VideoThumbnail = ({ src, onOpen, className = '' }: VideoThumbnailProps) => (
  <div
    className={`relative cursor-pointer group ${className}`}
    onClick={() => onOpen(src)}
  >
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="w-full aspect-video object-cover"
    />
    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
      <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════════
   1. AI Character Design
   ════════════════════════════════════════════════ */
export function CharacterContent() {
  const [lightbox, setLightbox] = useState<string | { src: string; type: 'video' } | null>(null);

  return (
    <div>
      <p className="label-style mb-2">AI Character Design</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Characters With Memory</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Design of AI characters with stable visual DNA across scenes, angles, and styles.
        Built through prompt engineering and visual direction so identities remain coherent
        across an entire narrative.
      </p>

      <SectionLabel>Process</SectionLabel>
      <p className="text-soft max-w-2xl leading-relaxed">
        Each character begins with a detailed character bible — defining facial structure, skin tone,
        hair texture, body proportions, and personality traits. Through iterative prompt refinement
        in Midjourney and Nano Banana, visual consistency is locked across poses, lighting conditions,
        and wardrobe changes.
      </p>

      <SectionLabel>Capabilities</SectionLabel>
      <ul className="space-y-2 text-soft text-sm leading-relaxed max-w-2xl">
        <li>• Character bible creation with visual DNA documentation</li>
        <li>• Multi-angle consistency (front, profile, 3/4, close-up)</li>
        <li>• Cross-scene identity preservation</li>
        <li>• 360° turnaround generation for animation pipelines</li>
        <li>• Casting sheets and model cards for production teams</li>
      </ul>

      <ModalGallery
        title="CHARACTER GALLERY"
        images={[
          '/images/kris/casting/kris-closeup.jpg',
          '/images/kris/casting/kris-frente.jpg',
          '/images/kris/casting/kris-costas.jpg',
          '/images/kris/casting/kris-perfil.jpg',
          '/images/kris/casting/kris-34.jpg',
        ]}
        onOpen={(src) => setLightbox(src)}
      />

      <SectionLabel>360° Turnaround</SectionLabel>
      <div className="mt-4 max-w-2xl">
        <VideoThumbnail src="/videos/kris-360.mp4" onOpen={(src) => setLightbox({ src, type: 'video' })} />
      </div>

      <ModalCTA />

      {lightbox && (
        <Lightbox
          src={typeof lightbox === 'string' ? lightbox : lightbox.src}
          type={typeof lightbox === 'string' ? 'image' : lightbox.type}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════
   2. AI Fashion Direction
   ════════════════════════════════════════════════ */
export function FashionContent() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div>
      <p className="label-style mb-2">AI Fashion Direction</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Editorial Without Cameras</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Fashion editorials and campaigns developed through AI visual pipelines. Direction covers
        styling, casting, lighting, and composition while preserving the language of real photography.
      </p>

      <SectionLabel>Approach</SectionLabel>
      <p className="text-soft max-w-2xl leading-relaxed">
        Every editorial begins with a mood board and creative brief — defining references, color palettes,
        and styling direction. AI generation is treated as a camera: each prompt is a shot list instruction,
        each refinement is a retake. The result is indistinguishable from a directed photo shoot.
      </p>

      <SectionLabel>Deliverables</SectionLabel>
      <ul className="space-y-2 text-soft text-sm leading-relaxed max-w-2xl">
        <li>• Full editorial campaigns (10–30 images)</li>
        <li>• Lookbook generation with consistent model identity</li>
        <li>• E-commerce and social media content packages</li>
        <li>• Art direction for brand campaigns</li>
      </ul>

      <ModalGallery
        title="EDITORIAL GALLERY"
        images={[
          '/images/hollis/campaign/campaign-06.jpg',
          '/images/hollis/campaign/campaign-01.jpg',
          '/images/hollis/campaign/campaign-02.jpg',
          '/images/hollis/campaign/campaign-03.jpg',
          '/images/hollis/campaign/campaign-04.jpg',
          '/images/hollis/campaign/campaign-05.jpg',
        ]}
        onOpen={setLightbox}
      />

      <ModalCTA />

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

/* ════════════════════════════════════════════════
   3. Costume & Styling
   ════════════════════════════════════════════════ */
export function CostumeContent() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div>
      <p className="label-style mb-2">Costume & Styling</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Dressing What Doesn't Exist</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Complete wardrobe direction for AI-generated characters — from fabric selection to styling composition.
        Every look is designed to ground digital figures in physical reality.
      </p>

      <SectionLabel>Method</SectionLabel>
      <p className="text-soft max-w-2xl leading-relaxed">
        Styling direction bridges real fashion knowledge with AI generation. Each look references actual
        brands, fabrics, and silhouettes — then translates them into prompts that produce believable,
        editorially compelling wardrobes.
      </p>

      <SectionLabel>Scope</SectionLabel>
      <ul className="space-y-2 text-soft text-sm leading-relaxed max-w-2xl">
        <li>• Multi-look wardrobe planning per character</li>
        <li>• Brand-specific styling (luxury, streetwear, editorial)</li>
        <li>• Fabric and texture direction for realism</li>
        <li>• Seasonal collection development</li>
      </ul>

      <ModalGallery
        title="STYLING GALLERY"
        images={[
          '/images/kris/still/kris-still-04.jpg',
          '/images/kris/still/kris-still-01.jpg',
          '/images/kris/still/kris-still-02.jpg',
          '/images/kris/still/kris-still-03.jpg',
        ]}
        onOpen={setLightbox}
      />

      <ModalCTA />

      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

/* ════════════════════════════════════════════════
   4. Video Production
   ════════════════════════════════════════════════ */
export function VideoContent() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div>
      <p className="label-style mb-2">Video Production</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Motion With Intention</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Cinematic video production using AI pipelines — from keyframes to graded final cut.
        Tools include Higgsfield, Kling, Veo, and DaVinci Resolve for professional post-production.
      </p>

      <SectionLabel>Pipeline</SectionLabel>
      <p className="text-soft max-w-2xl leading-relaxed">
        Video production starts with keyframe generation — hero images that define the visual language
        of each shot. These frames are then animated through AI video tools, directed for camera movement,
        pacing, and emotion. Final grading and editing happen in DaVinci Resolve.
      </p>

      <SectionLabel>Output Formats</SectionLabel>
      <ul className="space-y-2 text-soft text-sm leading-relaxed max-w-2xl">
        <li>• Short films and narrative content</li>
        <li>• Fashion campaign videos</li>
        <li>• Social media reels and vertical content</li>
        <li>• 360° character turnarounds</li>
        <li>• Color-graded final deliverables</li>
      </ul>

      <SectionLabel>Video Showcase</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <VideoThumbnail src="/videos/bloom-final.mp4" onOpen={setLightbox} />
        <VideoThumbnail src="/videos/bewe-shearling.mp4" onOpen={setLightbox} />
      </div>

      <ModalCTA />

      {lightbox && <Lightbox src={lightbox} type="video" onClose={() => setLightbox(null)} />}
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
