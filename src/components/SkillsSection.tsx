import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import SkillModal from './SkillModal';
/* rebuild trigger */
import {
  CharacterContent,
  FashionContent,
  CostumeContent,
  VideoContent,
  UGCContent,
  SoundtrackContent,
  VoiceDesignContent,
  CoursesContent,
} from './SkillModalContents';

type SkillCategory = 'all' | 'character' | 'fashion' | 'video' | 'more';

interface SkillCard {
  slug: string;
  label: string;
  titleKey: string;
  tagline: string;
  thumbnail: string | null;
  category: SkillCategory[];
  icon?: string;
}

const skills: SkillCard[] = [
  {
    slug: 'character',
    label: 'AI Character Design',
    titleKey: 'skill.character.title',
    tagline: 'Consistent characters across scenes and styles.',
    thumbnail: '/images/kris/casting/kris-closeup.jpg',
    category: ['character'],
  },
  {
    slug: 'fashion',
    label: 'AI Fashion Direction',
    titleKey: 'skill.fashion.title',
    tagline: 'Fashion editorials created through AI direction.',
    thumbnail: '/images/hollis/campaign/campaign-06.jpg',
    category: ['fashion'],
  },
  {
    slug: 'costume',
    label: 'Costume & Styling',
    titleKey: 'skill.costume.title',
    tagline: 'Wardrobe and styling direction for AI cinema.',
    thumbnail: '/images/kris/still/kris-still-04.jpg',
    category: ['fashion'],
  },
  {
    slug: 'video',
    label: 'Video Production',
    titleKey: 'skill.video.title',
    tagline: 'Cinematic AI video from frame to motion.',
    thumbnail: '/images/video-thumb.jpg',
    category: ['video'],
  },
  {
    slug: 'ugc',
    label: 'UGC',
    titleKey: 'skill.ugc.title',
    tagline: 'Scroll-stopping content for brands.',
    thumbnail: '/images/ugc-thumb.jpg',
    category: ['video'],
  },
  {
    slug: 'soundtrack',
    label: 'Soundtrack',
    titleKey: 'skill.soundtrack.title',
    tagline: 'Original music for cinematic storytelling.',
    thumbnail: '/images/lola-face.jpg',
    category: ['more'],
  },
  {
    slug: 'voice',
    label: 'Voice Design',
    titleKey: 'skill.voice.title',
    tagline: 'Cinematic narration with cloned voice models.',
    thumbnail: '/images/valentina.png',
    category: ['more'],
  },
  {
    slug: 'courses',
    label: 'Courses',
    titleKey: 'skill.courses.title',
    tagline: 'Learn AI creative direction from the source.',
    thumbnail: '/images/luma.png',
    category: ['more'],
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
  ugc: UGCContent,
  soundtrack: SoundtrackContent,
  voice: VoiceDesignContent,
  courses: CoursesContent,
};

const SkillsSection = () => {
  const { lang } = useLanguage();
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
        className="relative sticky top-14 z-40 bg-background py-4 mb-10 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 shadow-[0_8px_16px_8px_hsl(var(--background))] before:content-[''] before:absolute before:-top-16 before:left-0 before:right-0 before:h-16 before:bg-background"
      >
        <div className="flex gap-5 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(activeFilter === f.key ? 'all' : f.key)}
              className={`label-style whitespace-nowrap transition-all duration-300 px-3 py-1.5 ${
                activeFilter === f.key
                  ? 'text-foreground border border-foreground/30'
                  : 'text-dim border border-transparent hover:text-foreground/60'
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
            data-anim="skill-card"
            onClick={() => setOpenSkill(skill.slug)}
            className="group cursor-pointer relative overflow-hidden aspect-[3/4] flex flex-col justify-end bg-card border border-border hover:border-foreground/20 transition-all duration-500"
          >
            {skill.thumbnail ? (
              <img
                src={skill.thumbnail}
                alt={skill.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.05]"
              />
            ) : (
              <div className="absolute inset-0 bg-card flex items-center justify-center">
                <span className="text-4xl text-dim opacity-30">{skill.icon}</span>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />

            {/* Text */}
            <div className="relative z-10 p-5">
              <h3 className="text-xl font-semibold text-foreground mb-1 leading-tight">{t(skill.titleKey, lang)}</h3>
              <p className="label-style text-dim text-[10px] mb-1">{skill.label}</p>
              <p className="text-soft text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{skill.tagline}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All button */}
      {activeFilter !== 'all' && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setActiveFilter('all')}
            className="label-style border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300"
          >
            View All Skills
          </button>
        </div>
      )}

      {/* Modal */}
      {openSkill && ModalContentComponent && (
        <SkillModal
          open={!!openSkill}
          skillSlug={openSkill}
          onClose={() => {
            setOpenSkill(null);
            // Clear hash to prevent Lenis scroll conflicts
            window.history.replaceState(null, '', window.location.pathname);
          }}
        >
          <ModalContentComponent />
        </SkillModal>
      )}
    </section>
  );
};

export default SkillsSection;
