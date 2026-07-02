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

const StudioExperiments = () => {
  const [filter, setFilter] = useState<'ALL' | Cat>('ALL');
  const [open, setOpen] = useState<Tile | null>(null);

  const visible = useMemo(
    () => (filter === 'ALL' ? TILES : TILES.filter((t) => t.cats.includes(filter))),
    [filter],
  );

  return (
    <section className="px-6 md:px-12 py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <span className="label-style block mb-6" style={{ color: 'hsl(var(--bronze))' }}>
          STUDIO EXPERIMENTS · CURRENTLY IN MOTION
        </span>
        <p className="text-ink-soft max-w-2xl mb-10" style={{ fontWeight: 300 }}>
          Character bibles. Editorial studies. Method experiments.
          <br />
          Sometimes finished. Sometimes on purpose unfinished.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="label-style border px-3 py-1.5 transition-colors"
              style={{
                borderColor:
                  filter === f ? 'hsl(var(--bronze))' : 'hsl(var(--border))',
                color: filter === f ? 'hsl(var(--bronze))' : undefined,
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {visible.map((t, i) => (
            <button
              key={i}
              onClick={() => setOpen(t)}
              className="group relative text-left bg-card p-8 min-h-[260px] flex flex-col justify-between transition-colors hover:bg-paper"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className="label-style"
                  style={{ color: 'hsl(var(--bronze))' }}
                >
                  {t.cats.join(' · ')}
                </span>
                <span className="label-style text-ink-soft">{t.status}</span>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl text-ink mb-2" style={{ fontWeight: 500 }}>
                  {t.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed mb-4" style={{ fontWeight: 300 }}>
                  {t.caption}
                </p>
                <span className="label-style block">{t.date}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          style={{ backgroundColor: 'hsla(30, 14%, 15%, 0.92)' }}
          onClick={() => setOpen(null)}
        >
          <button
            onClick={() => setOpen(null)}
            className="absolute top-6 right-6 text-background/80 hover:text-background transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="max-w-[720px] w-full bg-card p-10 md:p-14"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6 mb-6">
              <span className="label-style" style={{ color: 'hsl(var(--bronze))' }}>
                {open.cats.join(' · ')}
              </span>
              <span className="label-style text-ink-soft">{open.status}</span>
            </div>
            <h3 className="text-3xl md:text-4xl text-ink mb-4" style={{ fontWeight: 300 }}>
              {open.title}
            </h3>
            <span className="label-style block mb-6">{open.date}</span>
            <p className="text-ink-soft leading-relaxed" style={{ fontWeight: 300 }}>
              {open.caption}
            </p>
            {open.designerRef && (
              <p className="mt-8 text-xs italic text-ink-soft/70" style={{ fontWeight: 300 }}>
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
