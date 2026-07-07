/**
 * PageHero · Wave 3.1 · canon Mary Editorial Dark Fred+Gé 7/jul
 *
 * Hero editorial reutilizável para páginas mãe (Library · Studio · About · Contact).
 * Home tem hero próprio (HeroSection.tsx) com vídeo.
 *
 * Canon Mary:
 *   - Fundo dark #0B0B0C coeso com Home
 *   - H1 branco puro #FFFFFF (não cream warm)
 *   - Support cinza Apple #86868B
 *   - Label bronze-soft
 *   - Espaço negativo radical · padding cinematográfico
 */
type Props = {
  label?: string;
  headline: string;
  sub?: string;
  children?: React.ReactNode;
};

export default function PageHero({ label, headline, sub, children }: Props) {
  return (
    <section
      className="px-6 md:px-12 pt-40 md:pt-56 pb-24 md:pb-40"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[1000px] mx-auto text-center">
        {label && (
          <div className="mb-10 md:mb-14">
            <span
              style={{
                color: 'hsl(var(--bronze-soft))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          </div>
        )}
        <h1
          className="mb-8"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.022em',
            lineHeight: 1.05,
            color: '#FFFFFF',
          }}
        >
          {headline}
        </h1>
        {sub && (
          <p
            className="max-w-[680px] mx-auto"
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
              fontWeight: 300,
              letterSpacing: '-0.005em',
              lineHeight: 1.5,
              color: 'hsl(var(--cool-gray-secondary))',
            }}
          >
            {sub}
          </p>
        )}
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
