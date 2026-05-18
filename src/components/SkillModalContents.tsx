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
          '/images/hollis/campaign/campaign-07.jpg',
          '/images/hollis/campaign/campaign-08.jpg',
          '/images/hollis/campaign/campaign-09.jpg',
          '/images/hollis/campaign/campaign-10.jpg',
          '/images/hollis/campaign/campaign-11.jpg',
          '/images/hollis/campaign/campaign-12.jpg',
          '/images/hollis/campaign/campaign-13.jpg',
          '/images/hollis/campaign/campaign-bottega.jpg',
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

      <ModalGallery
        title="E-COMMERCE LOOKS"
        images={[
          '/images/hollis/look1/look1-01.jpg',
          '/images/hollis/look1/look1-02.jpg',
          '/images/hollis/look1/look1-03.jpg',
          '/images/hollis/look1/look1-04.jpg',
          '/images/hollis/look1/look1-05.jpg',
          '/images/hollis/look1/look1-06.jpg',
          '/images/hollis/look1/look1-07.jpg',
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
        Tools include Kling 3.0, Veo, Seedance, and DaVinci Resolve for professional post-production.
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
        <VideoThumbnail src="/videos/hero-loop-logo.mp4" onOpen={setLightbox} />
        <VideoThumbnail src="/videos/bloom-final.mp4" onOpen={setLightbox} />
        <VideoThumbnail src="/videos/bewe-shearling.mp4" onOpen={setLightbox} />
      </div>

      <ModalCTA />

      {lightbox && <Lightbox src={lightbox} type="video" onClose={() => setLightbox(null)} />}
    </div>
  );
}

/* ════════════════════════════════════════════════
   5. UGC
   ════════════════════════════════════════════════ */
export function UGCContent() {
  const [lightbox, setLightbox] = useState<string | { src: string; type: 'video' } | null>(null);

  return (
    <div>
      <p className="label-style mb-2">UGC</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Content That Converts</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        User-generated content direction for brands — authentic, scroll-stopping videos
        designed for social media performance. From concept to final cut, every piece is
        crafted for engagement and conversion.
      </p>

      <SectionLabel>What We Deliver</SectionLabel>
      <ul className="space-y-2 text-soft text-sm leading-relaxed max-w-2xl">
        <li>• Product unboxing and lifestyle content</li>
        <li>• Testimonial-style videos</li>
        <li>• Social-first vertical content (Reels, TikTok, Shorts)</li>
        <li>• Brand storytelling in authentic format</li>
      </ul>

      <SectionLabel>Video Samples</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <VideoThumbnail src="/videos/ugc-packing.mp4" onOpen={(src) => setLightbox({ src, type: 'video' })} />
        <VideoThumbnail src="/videos/ugc-running.mp4" onOpen={(src) => setLightbox({ src, type: 'video' })} />
        <VideoThumbnail src="/videos/ugc-smartwatch.mp4" onOpen={(src) => setLightbox({ src, type: 'video' })} />
      </div>

      <ModalGallery
        title="SOCIAL CONTENT"
        images={[
          '/images/hollis/outras/hollis-outras-08.jpg',
          '/images/hollis/outras/hollis-outras-09.jpg',
        ]}
        onOpen={(src) => setLightbox(src)}
      />

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
   6. Soundtrack
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
   7. Voice Design
   ════════════════════════════════════════════════ */
export function VoiceDesignContent() {
  return (
    <div>
      <p className="label-style mb-2">Voice Design</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Cloned Voice, Authored Tone</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Cinematic narration with cloned voice models. Custom voice design
        for consistent, emotionally directed voiceover across projects.
      </p>

      <SectionLabel>Audio Samples</SectionLabel>
      <div className="space-y-3">
        <AudioPlayer src="/audio/lola-audio-final.mp3" label="Lola — Final Audio" />
        <AudioPlayer src="/audio/voz-gessika.mp3" label="Voice Clone" />
      </div>

      <ModalCTA />
    </div>
  );
}

/* ════════════════════════════════════════════════
   8. Atelier
   ════════════════════════════════════════════════ */
export function AtelierContent() {
  return (
    <div>
      <p className="label-style mb-2">Atelier</p>
      <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Cohort-Based Formation for AI Cinema Directors</h3>
      <p className="text-soft max-w-2xl mb-8 leading-relaxed">
        Lola Lab Atelier is a laboratory for directors learning to lead cinematic AI work — not a course.
        Cohort-based, experimental, founded on a single principle: AI is the medium, direction is the craft.
        Method, not tooling. Taste, not tutorials.
      </p>

      <SectionLabel>What the Cohort Develops</SectionLabel>
      <ul className="space-y-2 text-soft text-sm leading-relaxed max-w-2xl">
        <li>• A director's vocabulary — 8 cinematic pillars applied to AI work</li>
        <li>• Consistency methods — characters, skin, motion, light across scenes</li>
        <li>• Direction through compression — prompts as condensed creative decisions</li>
        <li>• A complete cinematic pipeline — from concept to final cut</li>
        <li>• Editorial sensibility — restraint, intention, taste</li>
      </ul>

      <div className="mt-12 max-w-md">
        <SectionLabel>Early Access</SectionLabel>
        <p className="text-soft text-sm mb-6">
          Cohort one is being shaped. Early access opens first; enrollment follows. Join the list and you will be the first to know.
        </p>

        <a
          href="https://lolalab-atelier.beehiiv.com/subscribe"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 text-sm font-medium text-primary-foreground bg-foreground hover:bg-foreground/90 transition-colors"
        >
          Join the Early Access list →
        </a>
      </div>

      <ModalCTA />
    </div>
  );
}
