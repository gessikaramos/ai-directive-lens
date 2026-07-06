/**
 * PageHero · Wave 1 Foundations · canon Fred v1
 * Hero editorial reutilizável para páginas mãe (Library, Studio, About, Contact).
 * Home tem hero próprio (HeroSection.tsx) com vídeo — não usa este.
 */
import SectionLabel from './SectionLabel';

type Props = {
  label?: string;
  headline: string;
  sub?: string;
  children?: React.ReactNode;
};

export default function PageHero({ label, headline, sub, children }: Props) {
  return (
    <section className="px-6 md:px-12 pt-40 md:pt-48 pb-24 md:pb-32 bg-background">
      <div className="max-w-[900px] mx-auto text-center">
        {label && (
          <div className="mb-10">
            <SectionLabel>{label}</SectionLabel>
          </div>
        )}
        <h1
          className="text-4xl md:text-6xl leading-[1.1] tracking-tight mb-6"
          style={{ fontWeight: 400, color: 'hsl(30 25% 10%)' }}
        >
          {headline}
        </h1>
        {sub && (
          <p
            className="text-lg md:text-xl text-ink-soft leading-relaxed max-w-[720px] mx-auto"
            style={{ fontWeight: 300 }}
          >
            {sub}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
