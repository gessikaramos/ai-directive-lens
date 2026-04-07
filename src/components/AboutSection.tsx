import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';

const pitchDeckSections = [
  {
    label: 'THE OPPORTUNITY',
    quote: 'Luxury brands need AI-native creative direction — now.',
    bullets: [
      '73% of luxury consumers expect personalized digital experiences',
      '4.2x higher engagement on AI-crafted visual content vs traditional',
      '$0 what most luxury brands spend on AI-native creative direction',
    ],
  },
  {
    label: 'WHAT WE DO',
    quote: 'End-to-end AI creative direction for the world\'s most discerning brands.',
    bullets: [
      'AI Video Production: Hyper-realistic AI-generated models, product showcases, and campaign films',
      'Sensory Storytelling: Cinematic narratives built for TikTok, Reels, e-commerce, and editorial',
      'Creative Direction: Full brand aesthetic oversight from concept to execution',
      'AI Strategy & Pipeline: Custom AI workflows from ideation to scaled content production',
    ],
  },
  {
    label: 'WHY LOLALAB',
    quote: 'Not a tech company doing fashion. A creative director who masters technology.',
    bullets: [
      'Fashion-First Aesthetic',
      'Full Creative Pipeline',
      'Proven AI Mastery',
      'Speed Without Compromise',
    ],
  },
  {
    label: 'WHO WE SERVE',
    quote: 'Luxury, fashion, and premium lifestyle brands ready for the AI creative era.',
    bullets: [
      'Haute Couture & Fashion Houses',
      'Premium Beauty & Fragrance',
      'Luxury Hospitality & Lifestyle',
    ],
  },
  {
    label: 'ENGAGEMENT MODELS',
    quote: null,
    bullets: [
      'Project-Based: From $5,000',
      'Monthly Retainer: From $8,000/mo',
      'Creative Direction as a Service: Custom',
    ],
  },
];

export default function AboutSection() {
  const { lang } = useLanguage();
  const [deckOpen, setDeckOpen] = useState(false);
  const [openSlide, setOpenSlide] = useState<number | null>(null);

  return (
    <section id="about" className="section-spacing px-6 md:px-10 bg-background">
      <div data-anim="about" className="max-w-[900px] mx-auto">
        <span className="label-style block mb-10">{t('about.label', lang)}</span>

        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mb-10">
          {t('about.name', lang)}
        </h2>

        <div className="space-y-6 mb-14">
          <p className="text-lg md:text-xl font-light leading-relaxed text-soft">
            {t('about.bio1', lang)}
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed text-soft">
            {t('about.bio2', lang)}
          </p>
        </div>

        <blockquote className="text-xl md:text-2xl font-light italic text-foreground mb-14 border-l border-border pl-6">
          {t('about.statement', lang)}
        </blockquote>

        <p className="label-style leading-loose tracking-[0.16em] mb-20">
          {t('about.capabilities', lang)}
        </p>

        {/* Pitch Deck */}
        <div className="border-t border-border pt-14">
          <button
            onClick={() => setDeckOpen(!deckOpen)}
            className="flex items-center gap-3 group cursor-pointer w-full"
          >
            <span
              className="uppercase tracking-[0.2em] text-[10px] font-medium"
              style={{ color: '#C9A96E' }}
            >
              PITCH DECK
            </span>
            <ChevronDown
              className="w-3.5 h-3.5 transition-transform duration-300"
              style={{ color: '#C9A96E' }}
              strokeWidth={2}
              data-open={deckOpen}
              {...(deckOpen ? { style: { color: '#C9A96E', transform: 'rotate(180deg)' } } : { style: { color: '#C9A96E' } })}
            />
          </button>

          {deckOpen && (
            <div className="mt-10 space-y-4">
              {pitchDeckSections.map((section, i) => {
                const isOpen = openSlide === i;
                return (
                  <div
                    key={i}
                    className="border border-border"
                  >
                    <button
                      onClick={() => setOpenSlide(isOpen ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 cursor-pointer"
                    >
                      <span
                        className="uppercase tracking-[0.2em] text-[11px] font-medium"
                        style={{ color: '#C9A96E' }}
                      >
                        {section.label}
                      </span>
                      <ChevronDown
                        className="w-3.5 h-3.5 transition-transform duration-300 text-muted-foreground"
                        style={isOpen ? { transform: 'rotate(180deg)' } : {}}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 space-y-5">
                        {section.quote && (
                          <p className="text-lg md:text-xl font-light italic text-foreground">
                            "{section.quote}"
                          </p>
                        )}
                        <ul className="space-y-3">
                          {section.bullets.map((bullet, j) => (
                            <li
                              key={j}
                              className="text-sm md:text-base font-light leading-relaxed text-soft pl-4 border-l border-border"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}