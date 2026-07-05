import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import SkillModal from './SkillModal';
import {
  CharacterContent,
  FashionContent,
  CostumeContent,
  VideoContent,
} from './SkillModalContents';

/* Canon Wave 4A · Fred+Gé 5/jul
   Tiles editoriais canon-Apple/archive · sem sensação SaaS
   - remover bg-card sólido · deixar cream de fundo
   - border-b sutil (ink/10) como divider editorial
   - arrow bronze discreta superior direita · translate-x on hover
   - number bronze maior + tracking editorial
   - hover bg-secondary/20 (subtle warmth)
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
          style={{ fontWeight: 300, color: 'hsl(30 25% 10%)' }}
        >
          {t('services.heading', lang)}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-ink/10">
          {services.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              data-anim="skill-card"
              onClick={() => setActiveSlug(s.slug)}
              className="group text-left relative border-b border-ink/10 md:border-r p-10 md:p-14 flex flex-col justify-between min-h-[280px] transition-colors duration-500 hover:bg-secondary/20 focus:outline-none focus:bg-secondary/20 cursor-pointer"
              aria-label={`Open ${t(s.titleKey, lang)} details`}
            >
              <span
                className="absolute top-6 right-6 md:top-8 md:right-8 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: 'hsl(var(--bronze))' }}
                aria-hidden="true"
              >
                <ArrowUpRight strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5" />
              </span>

              <span
                className="text-xs md:text-sm tracking-[0.2em] mb-8"
                style={{ color: 'hsl(var(--bronze))', fontWeight: 500 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3
                  className="text-xl md:text-2xl mb-4 leading-tight"
                  style={{ fontWeight: 400, color: 'hsl(30 25% 10%)' }}
                >
                  {t(s.titleKey, lang)}
                </h3>
                <p className="text-sm md:text-base text-ink-soft leading-relaxed max-w-[38ch]">
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
