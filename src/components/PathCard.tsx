/**
 * PathCard · Wave 1 Foundations · canon Fred v1
 * Card editorial (não SaaS) usado no Choose your path da Home.
 * Superfície com peso, respiro. Bronze arrow como CTA discreto.
 */
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  desc: string;
  cta: string;
  to: string;
};

export default function PathCard({ name, desc, cta, to }: Props) {
  return (
    <Link
      to={to}
      className="group block border border-ink/10 hover:border-ink/25 transition-colors duration-500 p-8 md:p-10 bg-background hover:bg-secondary/20"
    >
      <div className="flex flex-col h-full min-h-[220px]">
        <h3
          className="text-2xl md:text-3xl mb-4 leading-tight"
          style={{ fontWeight: 400, color: 'hsl(30 25% 10%)' }}
        >
          {name}
        </h3>
        <p
          className="text-base text-ink-soft leading-relaxed mb-8 flex-grow max-w-[36ch]"
          style={{ fontWeight: 300 }}
        >
          {desc}
        </p>
        <span
          className="text-xs tracking-[0.15em] uppercase inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-500"
          style={{ color: 'hsl(var(--bronze))', fontWeight: 500 }}
        >
          {cta}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
