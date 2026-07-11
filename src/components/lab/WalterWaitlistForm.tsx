/**
 * WalterWaitlistForm · lista de abertura específica do Walter.
 * Canon Gé 11/jul "FINAL CONTENT + CONVERSION PATCH": consentimento próprio,
 * separado do editorial de Direction Over Prompt. Renderizado apenas quando
 * WALTER_WAITLIST_ENABLED=true (default false) — inerte até ativação
 * explícita pós live-QA do Resend + prova de persistência.
 */
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/analytics';

const label = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

export default function WalterWaitlistForm() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || status === 'sending') return;
    setStatus('sending');
    try {
      const { data, error } = await supabase.functions.invoke('walter_waitlist', {
        body: {
          action: 'subscribe',
          email,
          consent_walter: consent,
          locale: (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt-BR' : 'en',
          source: 'walter_containment',
          website, // honeypot
        },
      });
      if (error) throw error;
      if (!data?.ok) throw new Error('not_ok');
      setStatus('sent');
      track('walter_waitlist_joined');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="mx-auto max-w-[440px] mt-12 text-left">
      <p className="mb-2 text-center" style={label}>
        JOIN THE WALTER OPENING LIST
      </p>
      <p
        className="mb-7 text-center"
        style={{
          fontSize: '0.9375rem',
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'hsl(var(--cool-gray-tertiary))',
        }}
      >
        Walter is being refined in a closed environment. Join the list to hear when the
        first paid access opens.
      </p>

      {status === 'sent' ? (
        <p className="text-center" style={{ color: '#FFFFFF', fontWeight: 300 }}>
          Received. Thank you.
        </p>
      ) : (
        <form onSubmit={submit}>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-5000px', height: 0, width: 0, opacity: 0 }}
          />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full py-3.5 px-5 mb-4 focus:outline-none"
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1px solid #1C1C1E',
              fontSize: '0.9375rem',
              fontWeight: 300,
            }}
          />
          <label
            className="flex items-start gap-3 mb-6 cursor-pointer"
            style={{ fontSize: '0.75rem', fontWeight: 300, lineHeight: 1.55, color: 'hsl(var(--cool-gray-secondary))' }}
          >
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1"
              required
            />
            <span>
              I agree to receive emails specifically about Walter&rsquo;s opening and future
              access.
            </span>
          </label>
          <button
            type="submit"
            disabled={status === 'sending' || !consent}
            className="w-full py-3.5 transition-opacity duration-300 hover:opacity-70 disabled:opacity-40"
            style={{
              border: '1px solid hsl(var(--bronze-soft))',
              color: 'hsl(var(--bronze-soft))',
              backgroundColor: 'transparent',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            JOIN THE LIST
          </button>
          {status === 'error' && (
            <p className="mt-3 text-center" style={{ fontSize: '0.8125rem', color: 'hsl(var(--cool-gray-secondary))' }}>
              Something slipped — try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
