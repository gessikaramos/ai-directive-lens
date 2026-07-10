/**
 * CreativeDirectionPack · renderização editorial do entregável do Translator.
 * - Documento diagramado (não bolha de chat), tipografia da casa.
 * - Não-assinante: primeiras linhas visíveis + frost glass + convite Founding Access.
 * - Assinante (entitlements): documento completo + export .md assinado LolaLab.
 * - Fechamento ativo (canon Mary 10/jul): caminho Studio sempre presente.
 */
import { Link } from 'react-router-dom';

const label = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.65rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

interface Props {
  text: string;
  entitled: boolean;
  techLocked?: boolean;
}

/** Realça **negritos** do Markdown sem depender de lib externa. */
function inlineBold(line: string, key: number) {
  const parts = line.split(/\*\*(.+?)\*\*/g);
  return (
    <p key={key} className="mb-2 last:mb-0">
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <strong key={i} style={{ fontWeight: 500, color: 'hsl(var(--background))' }}>
            {p}
          </strong>
        ) : (
          p
        ),
      )}
    </p>
  );
}

function exportMarkdown(text: string) {
  const signed = `${text}\n\n—\nPowered by LolaLab Studio · Direction over prompt\nlolalabstudio.com`;
  const blob = new Blob([signed], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'creative-direction-pack.md';
  a.click();
  URL.revokeObjectURL(url);
}

const CreativeDirectionPack = ({ text, entitled, techLocked }: Props) => {
  const lines = text.split('\n');
  // separa o corpo do marcador-título
  const bodyLines = lines.filter((l) => !/^##\s+CREATIVE DIRECTION PACK/.test(l));
  // Paywall de utilidade (não de leitura): o conceito inteiro (camadas 1–5) é
  // sempre visível — cobra-se a camada técnica derivada (6), o export e a
  // memória de longo prazo. Nada de texto borrado (canon Mary: frost blur
  // rebaixa a grife a funil de infoproduto).
  const techIdx = bodyLines.findIndex((l) => /^6\.\s/.test(l));
  // O servidor já corta a camada 6 para não-assinantes (tech_locked); o corte
  // local é só fallback para histórico antigo que veio completo.
  const hasTechCut = !entitled && (techLocked === true || techIdx > 0);
  const visible = !entitled && techIdx > 0 ? bodyLines.slice(0, techIdx) : bodyLines;

  return (
    <div
      className="w-full my-2"
      style={{
        border: '1px solid hsl(var(--background) / 0.14)',
        backgroundColor: 'hsl(var(--background) / 0.03)',
        borderRadius: '2px',
      }}
    >
      <div
        className="px-6 pt-5 pb-4"
        style={{ borderBottom: '1px solid hsl(var(--background) / 0.1)' }}
      >
        <span style={label}>Creative Direction Pack</span>
      </div>

      <div
        className="px-6 py-5"
        style={{
          fontFamily: "'Newsreader', Georgia, serif",
          color: 'hsl(var(--background) / 0.92)',
          fontSize: '1.0625rem',
          fontWeight: 300,
          lineHeight: 1.75,
        }}
      >
        {visible.map((l, i) => inlineBold(l, i))}

        {hasTechCut && (
          <div
            className="mt-4 pt-4 flex items-baseline gap-3"
            style={{ borderTop: '1px solid hsl(var(--background) / 0.1)' }}
          >
            <span style={{ ...label, fontSize: '0.6rem' }}>6 · Technical prompts</span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: 300,
                color: 'hsl(var(--background) / 0.55)',
              }}
            >
              The derived command layer for visual tools ships with Founding Access —
              along with the exportable brief and long-term memory.
            </span>
          </div>
        )}
      </div>

      {!entitled && (
        <div
          className="mx-6 mb-6 px-6 py-6"
          style={{
            border: '1px solid hsl(var(--bronze-soft) / 0.4)',
            backgroundColor: 'hsl(var(--background) / 0.04)',
            borderRadius: '2px',
          }}
        >
          <span style={label}>Founding Access · Cohort 01 — 20 seats</span>
          <p
            className="mt-3 mb-5"
            style={{
              color: 'hsl(var(--background) / 0.85)',
              fontSize: '0.9375rem',
              fontWeight: 300,
              lineHeight: 1.65,
            }}
          >
            The concept is yours — take it. Founding Access adds the working layer: the
            technical prompt commands for visual tools, the exportable brief, and Walter's
            long-term memory of this project. €19/month, or €149/year at the Founding
            Commitment Rate.
          </p>
          <a
            href="mailto:hello@lolalabstudio.com?subject=Founding%20Access%20%C2%B7%20Cohort%2001"
            className="inline-block px-6 py-3 transition-opacity hover:opacity-80"
            style={{
              backgroundColor: 'hsl(var(--bronze-soft))',
              color: 'hsl(var(--ink))',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: '2px',
            }}
          >
            Apply for Founding Access
          </a>
        </div>
      )}

      <div
        className="px-6 py-5 flex flex-wrap items-center gap-x-8 gap-y-3"
        style={{ borderTop: '1px solid hsl(var(--background) / 0.1)' }}
      >
        {entitled && (
          <button
            onClick={() => exportMarkdown(text)}
            className="transition-opacity hover:opacity-80"
            style={label}
          >
            ↓ Export brief
          </button>
        )}
        <Link to="/contact" className="transition-opacity hover:opacity-80" style={label}>
          Need human hands to produce this? → Apply for the Studio
        </Link>
      </div>
    </div>
  );
};

export default CreativeDirectionPack;
