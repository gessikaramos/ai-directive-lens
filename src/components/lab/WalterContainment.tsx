/**
 * WalterContainment · página editorial de contenção (Wave DOP CH01).
 * Exibida quando PUBLIC_WALTER_ENABLED=false: nenhuma chamada a hit_chat,
 * nenhum login à sala, nenhuma promessa de teste. Só a tese, o status e
 * dois caminhos: lista de abertura e o Capítulo 01.
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

const WalterContainment = () => {
  return (
    <section className="px-6 md:px-12 pt-16 md:pt-24 pb-24 md:pb-32">
      <div className="max-w-[760px] mx-auto text-center">
        <span className="block mb-6" style={label}>
          WALTER
        </span>
        <h1
          className="mb-6"
          style={{
            fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
            fontWeight: 300,
            letterSpacing: '-0.018em',
            lineHeight: 1.25,
            color: '#FFFFFF',
          }}
        >
          Walter listens before the machines produce.
        </h1>
        <p className="mb-10" style={{ ...label, color: 'hsl(var(--cool-gray-secondary))' }}>
          HUMAN INTENT TRANSLATOR · PRIVATE REFINEMENT
        </p>

        <div
          className="mx-auto max-w-[560px] text-left mb-12"
          style={{
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'hsl(var(--cool-gray-tertiary))',
          }}
        >
          <p>
            Walter is currently being refined in a closed environment. Public access will
            open only when the experience can preserve human intention with the rigor it
            requires.
          </p>
        </div>

        {/* Finalization round (Gé+Fred): SEM funil próprio do Walter nesta Wave —
            uma única conversão central (o capítulo). Opening list removida. */}
        <p
          className="mb-10 inline-block px-7 py-3"
          style={{
            border: '1px solid hsl(var(--background) / 0.25)',
            borderRadius: '9999px',
            color: 'hsl(var(--background) / 0.7)',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          Private access closed
        </p>
        <br />

        <Link
          to="/library/direction-over-prompt"
          className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-500"
          style={label}
          onClick={() => track('walter_to_dop_click')}
        >
          Read Direction Over Prompt <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default WalterContainment;
