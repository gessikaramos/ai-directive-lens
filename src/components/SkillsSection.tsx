import { useState, useRef, useEffect } from 'react';
import SkillModal from './SkillModal';
import {
  CharacterContent,
  FashionContent,
  CostumeContent,
  VideoContent,
  CopywritingContent,
  TechnologyContent,
  SoundtrackContent,
  VoiceDesignContent,
} from './SkillModalContents';

type SkillCategory = 'all' | 'character' | 'fashion' | 'video' | 'more';

interface SkillCard {
  slug: string;
  label: string;
  title: string;
  tagline: string;
  thumbnail: string | null;
  category: SkillCategory[];
  icon?: string;
}

const skills: SkillCard[] = [
  {
    slug: 'character',
    label: 'AI Character Design',
    title: 'Characters With Memory',
    tagline: 'Consistent characters across scenes and styles.',
    thumbnail: '/images/hollis/casting/hollis-frente.jpg',
    category: ['character'],
  },
  {
    slug: 'fashion',
    label: 'AI Fashion Direction',
    title: 'Editorial Without Cameras',
    tagline: 'Fashion editorials created through AI direction.',
    thumbnail: '/images/hollis/campaign/campaign-01.jpg',
    category: ['fashion'],
  },
  {
    slug: 'costume',
    label: 'Costume & Styling',
    title: "Dressing What Doesn't Exist",
    tagline: 'Wardrobe and styling direction for AI cinema.',
    thumbnail: '/images/hollis/look1/look1-01.jpg',
    category: ['fashion'],
  },
  {
    slug: 'video',
    label: 'Video Production',
    title: 'Motion With Intention',
    tagline: 'Cinematic AI video from frame to motion.',
    thumbnail: null,
    category: ['video'],
    icon: '▶',
  },
  {
    slug: 'copywriting',
    label: 'Copywriting',
    title: 'Words That Frame Worlds',
    tagline: 'Manifestos, scripts, and narrative direction.',
    thumbnail: null,
    category: ['more'],
    icon: '✦',
  },
  {
    slug: 'technology',
    label: 'Technology',
    title: 'Built To Think',
    tagline: 'AI tools designed from concept to UX.',
    thumbnail: null,
    category: ['more'],
    icon: '⚙',
  },
  {
    slug: 'soundtrack',
    label: 'Soundtrack',
    title: 'Sound Shapes Emotion',
    tagline: 'Original music for cinematic storytelling.',
    thumbnail: null,
    category: ['more'],
    icon: '♫',
  },
  {
    slug: 'voice',
    label: 'Voice Design',
    title: 'Cloned Voice, Authored Tone',
    tagline: 'Cinematic narration with cloned voice models.',
    thumbnail: null,
    category: ['more'],
    icon: '◉',
  },
];

const filters: { key: SkillCategory; label: string }[] = [
  { key: 'character', label: 'CHARACTER' },
  { key: 'fashion', label: 'FASHION' },
  { key: 'video', label: 'VIDEO' },
  { key: 'more', label: 'MORE' },
];

const modalContent: Record<string, React.FC> = {
  character: CharacterContent,
  fashion: FashionContent,
  costume: CostumeContent,
  video: VideoContent,
  copywriting: CopywritingContent,
  technology: TechnologyContent,
  soundtrack: SoundtrackContent,
  voice: VoiceDesignContent,
};

const SkillsSection = () => {
  const [activeFilter, setActiveFilter] = useState<SkillCategory>('all');
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Check URL hash on mount for deep linking
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#skill/')) {
      const slug = hash.replace('#skill/', '');
      if (modalContent[slug]) setOpenSkill(slug);
    }
  }, []);

  const filtered =
    activeFilter === 'all'
      ? skills
      : skills.filter((s) => s.category.includes(activeFilter));

  const ModalContentComponent = openSkill ? modalContent[openSkill] : null;

  return (
    <section id="work" className="section-spacing px-6 md:px-12 lg:px-20">
      {/* Sub-nav */}
      <div
        ref={navRef}
        className="sticky top-16 z-40 bg-background/90 backdrop-blur-sm py-4 mb-12 border-b border-border overflow-x-auto"
      >
        <div className="flex gap-6">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(activeFilter === f.key ? 'all' : f.key)}
              className={`label-style whitespace-nowrap transition-colors duration-300 pb-2 border-b-2 ${
                activeFilter === f.key
                  ? 'border-foreground !text-foreground'
                  : 'border-transparent hover:text-foreground/60'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((skill) => (
          <div
            key={skill.slug}
            onClick={() => setOpenSkill(skill.slug)}
            className="group cursor-pointer relative overflow-hidden aspect-[3/4] flex flex-col justify-end bg-card border border-border hover:border-foreground/20 transition-all duration-500"
          >
            {skill.thumbnail ? (
              <img
                src={skill.thumbnail}
                alt={skill.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
              />
            ) : (
              <div className="absolute inset-0 bg-card flex items-center justify-center">
                <span className="text-4xl text-dim opacity-30">{skill.icon}</span>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

            {/* Text */}
            <div className="relative z-10 p-5">
              <p className="label-style mb-1">{skill.label}</p>
              <h3 className="text-lg font-semibold text-foreground mb-1">{skill.title}</h3>
              <p className="text-soft text-xs leading-relaxed">{skill.tagline}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {openSkill && ModalContentComponent && (
        <SkillModal
          open={!!openSkill}
          skillSlug={openSkill}
          onClose={() => {
            setOpenSkill(null);
            // Clean up hash
            if (window.location.hash.startsWith('#skill/')) {
              window.history.pushState(null, '', '#work');
            }
          }}
        >
          <ModalContentComponent />
        </SkillModal>
      )}
    </section>
  );
};

export default SkillsSection;
