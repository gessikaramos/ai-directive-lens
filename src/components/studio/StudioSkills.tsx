/**
 * StudioSkills · o "What we do" do site antigo, de volta ao Studio (canon Gé 10/jul).
 * As 8 disciplinas com os conteúdos ricos originais (SkillModalContents):
 * Character, Fashion, Costume, Video, UGC, Soundtrack (player), Voice, Atelier.
 * Tiles dark editoriais; o modal abre em cream — inversão A24 proposital.
 */
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SkillModal from '@/components/SkillModal';
import {
  CharacterContent,
  FashionContent,
  CostumeContent,
  VideoContent,
  UGCContent,
  SoundtrackContent,
  VoiceDesignContent,
  AtelierContent,
} from '@/components/SkillModalContents';

const SKILLS: Array<{ slug: string; title: string; desc: string; content: JSX.Element }> = [
  {
    slug: 'characters',
    title: 'AI Character Design',
    desc: 'Persistent people and avatars — identical across scenes, seasons and campaigns.',
    content: <CharacterContent />,
  },
  {
    slug: 'fashion',
    title: 'AI Fashion Direction',
    desc: 'Editorial fashion film and imagery with real garment logic and styling intent.',
    content: <FashionContent />,
  },
  {
    slug: 'costume',
    title: 'Costume & Styling',
    desc: 'Wardrobe systems for synthetic casts — texture, drape and era done properly.',
    content: <CostumeContent />,
  },
  {
    slug: 'video',
    title: 'Video Production',
    desc: 'Cinematic films from script to grade. AI-native pipeline, human direction.',
    content: <VideoContent />,
  },
  {
    slug: 'ugc',
    title: 'UGC',
    desc: 'Native-feeling creator content at brand quality — without the creator logistics.',
    content: <UGCContent />,
  },
  {
    slug: 'soundtrack',
    title: 'Soundtrack',
    desc: 'Original music directed for the film — not licensed, not library.',
    content: <SoundtrackContent />,
  },
  {
    slug: 'voice',
    title: 'Voice Design',
    desc: 'Voices cast, cloned and directed like actors.',
    content: <VoiceDesignContent />,
  },
  {
    slug: 'atelier',
    title: 'Atelier',
    desc: 'Custom creative systems built for one brand only. The bespoke tier.',
    content: <AtelierContent />,
  },
];

const StudioSkills = () => {
  const [active, setActive] = useState<string | null>(null);
  const current = SKILLS.find((s) => s.slug === active);

  return (
    <section className="px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <span
          className="block mb-10 md:mb-14"
          style={{
            color: 'hsl(var(--bronze-soft))',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          What We Make
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: '1px solid #1C1C1E' }}>
          {SKILLS.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setActive(s.slug)}
              className="group text-left relative p-8 md:p-12 min-h-[220px] flex flex-col justify-between transition-colors duration-500 cursor-pointer"
              style={{
                borderBottom: '1px solid #1C1C1E',
                borderRight: i % 2 === 0 ? '1px solid #1C1C1E' : 'none',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#121214'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
              aria-label={`Open ${s.title} details`}
            >
              <span
                className="absolute top-6 right-6 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: 'hsl(var(--bronze-soft))' }}
                aria-hidden="true"
              >
                <ArrowUpRight strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <span
                className="block mb-6"
                style={{
                  color: 'hsl(var(--bronze-soft))',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontSize: 'clamp(1.375rem, 2vw, 1.875rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: '#FFFFFF',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="max-w-[40ch]"
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: 'hsl(var(--cool-gray-tertiary))',
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <SkillModal open={active !== null} skillSlug={active ?? ''} onClose={() => setActive(null)}>
        {current ? current.content : null}
      </SkillModal>
    </section>
  );
};

export default StudioSkills;
