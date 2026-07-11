/**
 * WalterContainment · página editorial de contenção (Wave DOP CH01).
 * Exibida quando PUBLIC_WALTER_ENABLED=false: nenhuma chamada a hit_chat,
 * nenhum login, nenhum formulário. Só a tese, o estado e um caminho.
 *
 * Composition Pass (canon Gé+Fred 11/jul): ausência COM presença — a página
 * é fechada por decisão, não vazia por falta. Um único gesto visual: a
 * tipografia surge em etapas (lolab-stage) e o marcador de estado respira
 * (lolab-pulse). Zero esferas, zero sci-fi, zero mockup. prefers-reduced-motion
 * desliga tudo via CSS.
 */
import { Link } from 'react-router-dom';
import { track } from '@/lib/analytics';

const label = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

/** revelação sequencial: cada bloco entra no ritmo de uma frase pensada */
const stage = (i: number) => ({ animationDelay: `${0.15 + i * 0.35}s` });

const WalterContainment = () => {
  return (
    <section className="px-6 md:px-12 pt-20 md:pt-32 pb-28 md:pb-40">
      <div className="max-w-[760px] mx-auto text-center">
        <span className="lolab-stage block mb-8" style={{ ...label, ...stage(0) }}>
          WALTER
        </span>
        <h1
          className="lolab-stage mb-8"
          style={{
            fontSize: 'clamp(1.875rem, 3.6vw, 3rem)',
            fontWeight: 300,
            letterSpacing: '-0.018em',
            lineHeight: 1.22,
            color: '#FFFFFF',
            ...stage(1),
          }}
        >
          Walter listens before the machines produce.
        </h1>

        {/* linha de estado · o único elemento vivo da página */}
        <p
          className="lolab-stage mb-12 flex items-center justify-center gap-3"
          style={{ ...label, color: 'hsl(var(--cool-gray-secondary))', ...stage(2) }}
        >
          <span
            aria-hidden="true"
            className="lolab-pulse inline-block rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: 'hsl(var(--bronze-soft))',
            }}
          />
          HUMAN INTENT TRANSLATOR · PRIVATE REFINEMENT
        </p>

        <div
          className="lolab-stage mx-auto max-w-[560px] text-left mb-14"
          style={{
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'hsl(var(--cool-gray-tertiary))',
            ...stage(3),
          }}
        >
          <p>
            Walter is currently being refined in a closed environment. Public access will
            open only when the experience can preserve human intention with the rigor it
            requires.
          </p>
        </div>

        {/* Finalization round (Gé+Fred): SEM funil próprio do Walter nesta Wave —
            uma única conversão central (o capítulo). Zero forms, zero inputs. */}
        <p
          className="lolab-stage mb-12 inline-block px-7 py-3"
          style={{
            border: '1px solid hsl(var(--background) / 0.25)',
            borderRadius: '9999px',
            color: 'hsl(var(--background) / 0.7)',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            ...stage(4),
          }}
        >
          Private access closed
        </p>
        <br />

        <Link
          to="/library/direction-over-prompt"
          className="lolab-stage inline-flex items-center gap-2 hover:gap-3 transition-all duration-500"
          style={{ ...label, ...stage(5) }}
          onClick={() => track('walter_to_dop_click')}
        >
          Read Direction Over Prompt <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default WalterContainment;
