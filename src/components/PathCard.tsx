/**
 * PathCard · Wave 3.0-B · canon Apple/Mary Fred+Gé 7/jul
 *
 * Refactor:
 *   - Bloco editorial flat (NÃO retangulo com border 4 lados)
 *   - Fundo transparente (herda dark do parent)
 *   - Hairline top que fica em bronze soft no hover
 *   - Tipografia refinada Apple: weight 400 no nome, 300 na desc
 *   - Cor cream sobre dark base
 *   - Espaçamento controlado
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
      className="group block relative py-8 md:py-10 transition-all duration-500 hover:opacity-80"
      style={{ borderTop: '1px solid #1C1C1E' }}
    >
      <div className="flex flex-col h-full min-h-[200px]">
        <h3
          className="mb-3"
          style={{
            fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            lineHeight: 1.15,
            color: '#FFFFFF',
          }}
        >
          {name}
        </h3>
        <p
          className="mb-6 flex-grow max-w-[32ch]"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'hsl(var(--cool-gray-tertiary))',
          }}
        >
          {desc}
        </p>
        <span
          className="inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-500"
          style={{
            color: 'hsl(var(--bronze-soft))',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {cta}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
