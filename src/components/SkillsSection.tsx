import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import SkillModal from './SkillModal';
import {
  CharacterContent,
  FashionContent,
  CostumeContent,
  VideoContent,
} from './SkillModalContents';

/* Canon Fred 3/jul + Ge 4/jul · 4 servicos canon
   Mapeamento canon-visual pros modais orfaos reativados:
   films      -> VideoContent      (3 videos motion)
   characters -> CharacterContent  (5 imgs Kris + 360 video)
   systems    -> CostumeContent    (4 stills + 7 lookbook)
   fashion    -> FashionContent    (14 imgs Hollis campaign)
*/
const services = [
  { slug: 'films',      titleKey: 'service.films.title',      descKey: 'service.films.desc' },
  { slug: 'characters', titleKey: 'service.characters.title', descKey: 'service.characters.desc' },
  { slug: 'systems',    titleKey: 'service.systems.title',    descKey: 'service.systems.desc' },
  { slug: 'fashion',    titleKey: 'service.fashion.title',    descKey: 'service.fashion.desc' },
];

const contentBySlug: Record<string, JSX.Element> = {
  films:      <VideoContent />,
  characters: <CharacterContent />,
  systems:    <CostumeContent />,
  fashion:    <FashionContent />,
};

const SkillsSection = () => {
  const { lang } = useLanguage();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <section id="work" className="section-spacing px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <span className="label-style block mb-6">{t('services.label', lang)}</span>
        <h2
          className="text-3xl md:text-5xl tracking-tight text-ink mb-16 md:mb-24"
          style={{ fontWeight: 300 }}
        >
          {t('services.heading', lang)}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              data-anim="skill-card"
              onClick={() => setActiveSlug(s.slug)}
              className="text-left bg-card p-8 md:p-12 flex flex-col justify-between min-h-[220px] transition-colors duration-300 hover:bg-secondary/40 focus:outline-none focus:bg-secondary/40 cursor-pointer"
              aria-label={`Open ${t(s.titleKey, lang)} details`}
            >
              <span
                className="label-style mb-6"
                style={{ color: 'hsl(var(--bronze))' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3
                  className="text-xl md:text-2xl text-ink mb-4 leading-tight"
                  style={{ fontWeight: 500 }}
                >
                  {t(s.titleKey, lang)}
                </h3>
                <p className="text-sm md:text-base text-ink-soft leading-relaxed">
                  {t(s.descKey, lang)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <SkillModal
        open={activeSlug !== null}
        skillSlug={activeSlug ?? ''}
        onClose={() => setActiveSlug(null)}
      >
        {activeSlug ? contentBySlug[activeSlug] : null}
      </SkillModal>
    </section>
  );
};

export default SkillsSection;
