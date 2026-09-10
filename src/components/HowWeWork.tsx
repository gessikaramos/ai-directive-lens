/**
 * HowWeWork · nova seção da Studio homepage (10/set, brief Gé).
 * Entre as 8 disciplinas e o Contact: mostra o processo (Direction System →
 * Design System → Execution Map → geração/montagem com QC gate) e o prazo
 * típico — o argumento pro visitante-agência de que isso é produção com
 * método, não geração solta.
 */
const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const PHASES = [
  {
    n: '01',
    title: 'Direction System',
    desc: 'What the piece is for, who it speaks to, and what it must not become. Decided before anything is made.',
  },
  {
    n: '02',
    title: 'Design System',
    desc: 'Characters, wardrobe, palette, light and camera logic, locked as references. This is what makes frame 200 match frame 1.',
  },
  {
    n: '03',
    title: 'Execution Map',
    desc: 'Shot list, dependencies, delivery plan and the quality bar, agreed before generation starts.',
  },
];

const HowWeWork = () => (
  <section className="px-6 md:px-12 py-24 md:py-32" style={{ backgroundColor: 'hsl(var(--ink))' }}>
    <div className="max-w-[1200px] mx-auto">
      <span className="block mb-6" style={labelStyle}>
        How We Work
      </span>
      <h2
        className="max-w-[720px] mb-16 md:mb-20"
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          color: '#FFFFFF',
        }}
      >
        Three phases of thinking before the first frame is generated.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12" style={{ borderTop: '1px solid #1C1C1E' }}>
        {PHASES.map((p) => (
          <div key={p.n} className="pt-10">
            <span className="block mb-4" style={{ ...labelStyle, letterSpacing: '0.2em', fontSize: '0.65rem' }}>
              {p.n}
            </span>
            <h3
              className="mb-3"
              style={{
                fontSize: '1.25rem',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                lineHeight: 1.3,
                color: '#FFFFFF',
              }}
            >
              {p.title}
            </h3>
            <p style={{ fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.65, color: 'hsl(var(--cool-gray-tertiary))' }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 md:mt-20 pt-12 md:pt-14 max-w-[820px]" style={{ borderTop: '1px solid #1C1C1E' }}>
        <p
          className="mb-6"
          style={{
            fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)',
            fontWeight: 300,
            letterSpacing: '-0.01em',
            lineHeight: 1.5,
            color: 'hsl(var(--cool-gray-tertiary))',
          }}
        >
          Then generation and assembly, with a documented QC gate before anything is released.
        </p>
        <p style={{ fontSize: '0.9375rem', fontWeight: 300, lineHeight: 1.7, color: 'hsl(var(--cool-gray-secondary))' }}>
          Typical delivery: 10 to 14 days from approved brief to master — client review and
          approval cycles included. Production time is a fraction of that: the 25-track voice
          production was four days of production. Typical scale per cycle: one cinematic short
          (~54s, six shots plus three cutaways), or a 25-track voice production.
        </p>
      </div>
    </div>
  </section>
);

export default HowWeWork;
