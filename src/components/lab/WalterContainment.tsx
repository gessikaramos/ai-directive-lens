/**
 * WalterContainment · página editorial de contenção (Wave DOP CH01).
 * Exibida quando PUBLIC_WALTER_ENABLED=false: nenhuma chamada a hit_chat,
 * nenhum login à sala, nenhuma promessa de teste. Só a tese, o status e
 * dois caminhos: lista de abertura e o Capítulo 01.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/analytics';

const label = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const WalterContainment = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const join = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'sending') return;
    setStatus('sending');
    const { error } = await supabase
      .from('signal_opt_in')
      .insert({ email: email.trim(), source: 'lab' });
    const ok = !error || /duplicate/i.test(error.message ?? '');
    setStatus(ok ? 'done' : 'error');
    if (ok) track('walter_opening_interest');
  };

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
          <p className="mb-4">
            Walter is an investigation into how humans express ideas before they become
            instructions.
          </p>
          <p>
            The system is currently being refined in a closed environment. Public access
            will open only when the experience can preserve intention with the rigor it
            requires.
          </p>
        </div>

        {status === 'done' ? (
          <p
            className="mb-10"
            style={{ fontSize: '0.875rem', fontWeight: 300, color: 'hsl(var(--bronze-soft))' }}
          >
            You're on the opening list. We'll write when the room opens.
          </p>
        ) : (
          <form onSubmit={join} className="mb-10 flex flex-wrap justify-center gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="min-w-[240px] py-3 px-5 focus:outline-none"
              style={{
                backgroundColor: 'transparent',
                color: 'hsl(var(--background))',
                border: '1px solid hsl(var(--background) / 0.2)',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 300,
              }}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-8 py-3 transition-all duration-300 hover:opacity-85 disabled:opacity-40"
              style={{
                backgroundColor: 'hsl(var(--bronze-soft))',
                color: 'hsl(var(--ink))',
                borderRadius: '9999px',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Join the opening list
            </button>
            {status === 'error' && (
              <span className="w-full" style={{ fontSize: '0.75rem', color: 'hsl(var(--bronze-soft))' }}>
                Something slipped — try again.
              </span>
            )}
          </form>
        )}

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
