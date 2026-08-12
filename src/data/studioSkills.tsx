/**
 * Fonte única dos 8 skills do Studio (8/ago) — antes vivia só dentro de
 * StudioSkills.tsx; extraído pra ser reusado também pela página dedicada
 * /studio/:slug (StudioSkill.tsx), sem duplicar slug/título/descrição em
 * dois lugares que puderiam divergir com o tempo.
 */
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

export interface StudioSkill {
  slug: string;
  title: string;
  desc: string;
  content: JSX.Element;
  // Imagem pra og:image/twitter:image da página dedicada (8/ago) — só as
  // disciplinas com galeria de imagem estática têm uma candidata razoável;
  // as outras caem no og-image.jpg default do site (useSeo já resolve isso).
  // Precisa ser URL absoluta: useSeo() só prefixa com o domínio o DEFAULT_IMAGE
  // dele mesmo, não a `image` custom passada por quem chama.
  ogImage?: string;
}

const SITE_URL = 'https://www.lolalabstudio.com';

export const STUDIO_SKILLS: StudioSkill[] = [
  {
    slug: 'characters',
    title: 'AI Character Design',
    desc: 'Persistent people and avatars — identical across scenes, seasons and campaigns.',
    content: <CharacterContent />,
    ogImage: `${SITE_URL}/images/kris/casting/kris-closeup.jpg`,
  },
  {
    slug: 'fashion',
    title: 'AI Fashion Direction',
    desc: 'Editorial fashion film and imagery with real garment logic and styling intent.',
    content: <FashionContent />,
    ogImage: `${SITE_URL}/images/hollis/campaign/campaign-06.jpg`,
  },
  {
    slug: 'costume',
    title: 'Costume & Styling',
    desc: 'Wardrobe systems for synthetic casts — texture, drape and era done properly.',
    content: <CostumeContent />,
    ogImage: `${SITE_URL}/images/kris/still/kris-still-04.jpg`,
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
    ogImage: `${SITE_URL}/images/hollis/outras/hollis-outras-08.jpg`,
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

export const STUDIO_SKILL_SLUGS = STUDIO_SKILLS.map((s) => s.slug);
