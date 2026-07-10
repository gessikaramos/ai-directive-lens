/**
 * Signal · /signal (canon Gé 10/jul)
 * A área de comunidade da LolaLab: os reads (Signal), a newsletter e o
 * formulário do Collective — tudo que era acordeão espalhado em Lab/Studio
 * agora tem casa própria no menu.
 */
import { useEffect, useState } from 'react';
import { LanguageProvider } from '@/hooks/use-language';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CollectiveForm, SignalReads } from '@/components/lab/LabExtras';
import { supabase } from '@/integrations/supabase/client';

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const NewsletterBlock = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'sending') return;
    setStatus('sending');
    const { error } = await supabase
      .from('signal_opt_in')
      .insert({ email: email.trim(), source: 'signal' });
    setStatus(error && !/duplicate/i.test(error.message ?? '') ? 'error' : 'done');
  };

  return (
    <section className="px-6 md:px-12 py-20 md:py-28" style={{ borderTop: '1px solid #1C1C1E' }}>
      <div className="max-w-[900px] mx-auto">
        <span className="block mb-4" style={labelStyle}>
          The Newsletter
        </span>
        <p
          className="mb-8 max-w-[560px]"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          New reads, breakdowns and openings from the studio — written on our own
          rhythm, not a content calendar.
        </p>
        {status === 'done' ? (
          <p style={{ fontSize: '0.8125rem', fontWeight: 300, color: 'hsl(var(--bronze-soft))' }}>
            You're in. We write when there's something worth reading.
          </p>
        ) : (
          <form onSubmit={subscribe} className="flex flex-wrap gap-3 items-center max-w-[540px]">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="flex-1 min-w-[220px] py-3 px-4 focus:outline-none"
              style={{
                backgroundColor: 'transparent',
                color: 'hsl(var(--background))',
                border: '1px solid hsl(var(--background) / 0.2)',
                fontSize: '0.875rem',
                fontWeight: 300,
              }}
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-7 py-3 transition-all duration-300 hover:opacity-85 disabled:opacity-40"
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
              Subscribe
            </button>
            {status === 'error' && (
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--bronze-soft))' }}>
                Something slipped — try again.
              </span>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

const SignalContent = () => {
  useEffect(() => {
    document.title = 'Signal · LolaLab';
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.setAttribute('content', 'Reads, newsletter and the Collective — the quiet network of LolaLab.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-32" style={{ backgroundColor: 'hsl(var(--ink))' }}>
        {/* Reads do estúdio */}
        <SignalReads />

        {/* Newsletter */}
        <NewsletterBlock />

        {/* Collective · formulário */}
        <section
          className="px-6 md:px-12 py-20 md:py-28"
          style={{ borderTop: '1px solid #1C1C1E' }}
        >
          <div className="max-w-[900px] mx-auto">
            <span className="block mb-4" style={labelStyle}>
              Collective · A Quiet Network
            </span>
            <p
              className="mb-10 max-w-[560px]"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 300,
                lineHeight: 1.65,
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              A curated circle of makers we trust with the work. Apply below —
              we read everything, slowly.
            </p>
            <CollectiveForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

const Signal = () => (
  <LanguageProvider>
    <SignalContent />
  </LanguageProvider>
);

export default Signal;
