/**
 * StudioExperiments · Wave 3.1.2 · canon Mary Editorial Dark Fred+Gé 7/jul
 * Grid tipográfico rigoroso dark · linhas 1px #1C1C1E · texto Apple cinzas frios.
 */
import { useMemo, useState } from 'react';
import { X } from 'lucide-react';

type Cat = 'CHARACTER' | 'FASHION' | 'MOTION' | 'EDITORIAL' | 'RESEARCH' | 'SIGNAL';
type Status = 'SHIPPED' | 'IN PRODUCTION' | 'TESTING' | 'IDEA';

interface Tile {
  title: string;
  cats: Cat[];
  status: Status;
  date: string;
  caption: string;
  designerRef?: boolean;
}

const TILES: Tile[] = [
  { title: 'Valentina', cats: ['CHARACTER'], status: 'SHIPPED', date: '2026', caption: 'Persistent character bible. Study in editorial restraint.' },
  { title: 'BLOOM', cats: ['FASHION', 'MOTION'], status: 'SHIPPED', date: '2026', caption: 'Fashion-in-motion editorial. Light as narrative device.' },
  { title: '_lumo Method', cats: ['RESEARCH'], status: 'TESTING', date: '2026', caption: 'A pipeline for character skin, motion, and light coherence.' },
  { title: 'Hollis Pietra', cats: ['CHARACTER', 'FASHION'], status: 'SHIPPED', date: '2026', caption: '24-piece editorial fashion collection with persistent character.', designerRef: true },
  { title: 'Rains', cats: ['FASHION'], status: 'SHIPPED', date: '2026', caption: 'Rain as material. Water as motion. Fabric as reply.' },
  { title: 'Filme Lola WIP', cats: ['MOTION', 'RESEARCH'], status: 'IN PRODUCTION', date: '2026', caption: 'Long-form editorial film in progress.' },
  { title: 'Momentum', cats: ['FASHION', 'MOTION'], status: 'SHIPPED', date: '2026', caption: 'Studies of movement inside stillness.' },
  { title: 'Kris 360', cats: ['CHARACTER'], status: 'TESTING', date: '2026', caption: 'Character rotation and identity persistence across angles.' },
  { title: 'Ben Affleck Signal', cats: ['SIGNAL'], status: 'SHIPPED', date: 'JUN 2026', caption: 'Editorial reading of the Sam Altman forum speech.' },
  { title: 'Hollis Bottega', cats: ['CHARACTER', 'FASHION'], status: 'TESTING', date: '2026', caption: 'Character-carried lookbook study.', designerRef: true },
  { title: 'Campanha Timeless', cats: ['EDITORIAL'], status: 'SHIPPED', date: '2026', caption: 'Editorial campaign for a Nordic aesthetic.' },
  { title: 'Cortex Infrastructure', cats: ['RESEARCH'], status: 'IN PRODUCTION', date: '2026', caption: 'Internal creative-systems infrastructure.' },
  { title: 'Tilda Study', cats: ['CHARACTER', 'RESEARCH'], status: 'TESTING', date: '2026', caption: 'A face study. Where does a character actually live.' },
  { title: 'AI Fashion Product', cats: ['MOTION'], status: 'SHIPPED', date: '2026', caption: 'Product-first fashion motion for launch surfaces.' },
  { title: 'Ge Founder', cats: ['EDITORIAL'], status: 'SHIPPED', date: '2026', caption: 'Editorial founder portrait series.' },
];

const FILTERS: Array<'ALL' | Cat> = ['ALL', 'CHARACTER', 'FASHION', 'MOTION', 'EDITORIAL', 'RESEARCH', 'SIGNAL'];

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const StudioExperiments = () => {
  const [filter, setFilter] = useState<'ALL' | Cat>('ALL');
  const [open, setOpen] = useState<Tile | null>(null);

  const visible = useMemo(
    () => (filter === 'ALL' ? TILES : TILES.filter((t) => t.cats.includes(filter))),
    [filter],
  );

  return (
    <section
      className="px-6 md:px-12 py-24 md:py-32"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span className="block mb-6" style={labelStyle}>
          STUDIO EXPERIMENTS · CURRENTLY IN MOTION
        </span>
        <p
          className="max-w-2xl mb-10"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          Character bibles. Editorial studies. Method experiments.
          <br />
          Sometimes finished. Sometimes on purpose unfinished.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="border px-3 py-1.5 transition-colors duration-300"
              style={{
                borderColor: filter === f ? 'hsl(var(--bronze-soft))' : '#1C1C1E',
                color: filter === f ? 'hsl(var(--bronze-soft))' : 'hsl(var(--cool-gray-secondary))',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ borderTop: '1px solid #1C1C1E' }}
        >
          {visible.map((t, i) => (
            <button
              key={i}
              onClick={() => setOpen(t)}
              className="group relative text-left p-10 md:p-12 min-h-[280px] flex flex-col justify-between transition-colors duration-500"
              style={{
                borderBottom: '1px solid #1C1C1E',
                borderRight: '1px solid #1C1C1E',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#121214';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              <span
                className="absolute top-6 right-6 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: 'hsl(var(--bronze-soft))' }}
                aria-hidden="true"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
              </span>

              <div className="flex items-start justify-between gap-4">
                <span
                  style={{
                    color: 'hsl(var(--bronze-soft))',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                  }}
                >
                  {t.cats.join(' · ')}
                </span>
                <span
                  style={{
                    color: 'hsl(var(--cool-gray-secondary))',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                  }}
                >
                  {t.status}
                </span>
              </div>
              <div>
                <h3
                  className="mb-3 leading-tight"
                  style={{
                    fontSize: 'clamp(1.25rem, 1.75vw, 1.5rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.015em',
                    color: '#FFFFFF',
                  }}
                >
                  {t.title}
                </h3>
                <p
                  className="mb-6 max-w-[42ch]"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: 'hsl(var(--cool-gray-secondary))',
                  }}
                >
                  {t.caption}
                </p>
                <span
                  className="block"
                  style={{
                    color: 'hsl(var(--cool-gray-secondary))',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.16em',
                  }}
                >
                  {t.date}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 animate-in fade-in duration-300"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            className="absolute top-8 right-8 transition-opacity hover:opacity-100"
            style={{ color: 'hsl(var(--background) / 0.6)' }}
            aria-label="Close"
          >
            <X className="w-6 h-6" strokeWidth={1.5} />
          </button>
          <div
            className="max-w-[920px] w-full p-12 md:p-20 relative"
            style={{
              backgroundColor: 'hsl(var(--ink-soft))',
              border: '1px solid #1C1C1E',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 mb-16">
              <span
                style={{
                  color: 'hsl(var(--bronze-soft))',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                }}
              >
                {open.cats.join(' · ')}
              </span>
              <span
                style={{
                  color: 'hsl(var(--cool-gray-secondary))',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.16em',
                }}
              >
                {open.status} · {open.date}
              </span>
            </div>
            <h3
              className="mb-10"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.75rem)',
                fontWeight: 400,
                letterSpacing: '-0.022em',
                lineHeight: 1.05,
                color: '#FFFFFF',
              }}
            >
              {open.title}
            </h3>
            <p
              className="max-w-[62ch]"
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'hsl(var(--cool-gray-tertiary))',
              }}
            >
              {open.caption}
            </p>
            {open.designerRef && (
              <p
                className="mt-16 pt-8 italic max-w-[62ch]"
                style={{
                  borderTop: '1px solid #1C1C1E',
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, Monaco, "Cascadia Mono", monospace',
                  fontSize: '0.6875rem',
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: '#FFFFFF',
                  opacity: 0.4,
                }}
              >
                Designer references shown for creative demonstration purposes only. No brand affiliation or endorsement implied.
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default StudioExperiments;
