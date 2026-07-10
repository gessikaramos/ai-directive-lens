/**
 * The LolaLab Compendiums · seção de livros da /library (briefing Mary 10/jul).
 * Capas tipográficas em CSS (sem imagem), tom coffee-table book.
 * Pré-lançamento: captura de e-mail via signal_opt_in (source = slug do livro).
 * Quando Stripe/Amazon entrarem: botões viram checkout digital €29 / capa dura €59.
 */
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const label = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const BOOKS = [
  {
    slug: 'book_tactility',
    roman: 'COMPENDIUM I',
    title: 'The Book of Tactility',
    subtitle: 'The LolaLab Manual of Aesthetics, Texture & Imperfection in the Synthetic Era',
    desc: 'Why the human eye rejects digital perfection — and how grain, friction and deliberate imperfection became the proof of life that validates luxury. The grammar of matter, from 35mm noise to Nordic chiaroscuro.',
    digital: '€29',
    hardcover: '€59',
  },
  {
    slug: 'book_direction_over_prompt',
    roman: 'COMPENDIUM II',
    title: 'Direction Over Prompt',
    subtitle: 'The Art of Human Translation & the Recovery of Creative Repertoire',
    desc: 'Prompt engineering is a career with a six-month shelf life. Repertoire is not. How directors think, why aesthetic restriction extracts genius from machines, and the method behind the Creative Direction Pack.',
    digital: '€29',
    hardcover: '€59',
  },
];

const BookCard = ({ book }: { book: (typeof BOOKS)[number] }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'form' | 'sending' | 'done' | 'error'>('idle');

  const reserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === 'sending') return;
    setStatus('sending');
    const { error } = await supabase
      .from('signal_opt_in')
      .insert({ email: email.trim(), source: book.slug });
    // 23505 = já reservado com este e-mail — para o leitor, é sucesso.
    setStatus(error && error.code !== '23505' ? 'error' : 'done');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 py-12 md:py-16"
      style={{ borderBottom: '1px solid #1C1C1E' }}>
      {/* Capa tipográfica (5/12) */}
      <div className="md:col-span-5 flex justify-center md:justify-start">
        <div
          className="w-[240px] h-[340px] px-7 py-9 flex flex-col justify-between"
          style={{
            border: '1px solid hsl(var(--background) / 0.25)',
            backgroundColor: '#101012',
            boxShadow: '14px 18px 40px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.02)',
          }}
        >
          <span style={{ ...label, fontSize: '0.55rem' }}>{book.roman}</span>
          <div>
            <h4
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: '1.75rem',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                color: '#FFFFFF',
              }}
            >
              {book.title}
            </h4>
          </div>
          <div>
            <span
              className="block"
              style={{
                color: 'hsl(var(--background) / 0.45)',
                fontSize: '0.55rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              LolaLab Studio
            </span>
          </div>
        </div>
      </div>

      {/* Texto + reserva (7/12) */}
      <div className="md:col-span-7">
        <h3
          className="mb-2"
          style={{
            fontFamily: "'Newsreader', Georgia, serif",
            fontSize: 'clamp(1.5rem, 2.4vw, 2.125rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: '#FFFFFF',
          }}
        >
          {book.title}
        </h3>
        <p
          className="mb-5"
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          {book.subtitle}
        </p>
        <p
          className="mb-6 max-w-[540px]"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          {book.desc}
        </p>

        {status === 'done' ? (
          <p style={{ fontSize: '0.8125rem', fontWeight: 300, color: 'hsl(var(--bronze-soft))' }}>
            Reserved. Your copy is held for the first printing — we'll write when it opens.
          </p>
        ) : status === 'idle' ? (
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setStatus('form')}
              className="px-6 py-3.5 transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'hsl(var(--bronze-soft))',
                color: 'hsl(var(--ink))',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Pre-order Digital Edition · {book.digital}
            </button>
            <button
              onClick={() => setStatus('form')}
              className="px-6 py-3.5 transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'transparent',
                color: 'hsl(var(--background) / 0.85)',
                border: '1px solid hsl(var(--background) / 0.3)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Reserve Hardcover · {book.hardcover}
            </button>
          </div>
        ) : (
          <form onSubmit={reserve} className="flex flex-wrap gap-3 items-center max-w-[540px]">
            <input
              type="email"
              required
              autoFocus
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
              className="px-6 py-3 transition-opacity hover:opacity-80 disabled:opacity-40"
              style={{
                backgroundColor: 'hsl(var(--bronze-soft))',
                color: 'hsl(var(--ink))',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Hold my copy
            </button>
            {status === 'error' && (
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--bronze-soft))' }}>
                Something slipped — try again.
              </span>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

const Compendiums = () => (
  <section className="px-6 md:px-12 py-16 md:py-24" style={{ borderTop: '1px solid #1C1C1E' }}>
    <div className="max-w-[1100px] mx-auto">
      <span className="block mb-4" style={label}>
        The LolaLab Compendiums
      </span>
      <p
        className="mb-4 max-w-[720px]"
        style={{
          fontFamily: "'Newsreader', Georgia, serif",
          fontSize: 'clamp(1.375rem, 2.4vw, 1.875rem)',
          fontWeight: 300,
          lineHeight: 1.35,
          color: '#FFFFFF',
        }}
      >
        Execution became a commodity. Taste is the last competitive advantage.
      </p>
      <p
        className="mb-6 max-w-[620px]"
        style={{
          fontSize: '0.9375rem',
          fontWeight: 300,
          lineHeight: 1.65,
          color: 'hsl(var(--cool-gray-secondary))',
        }}
      >
        Two collector's manuals, compiled from live studio operations. Limited first
        printing. Annual members of the Human Intent Translator receive the digital
        editions as part of the Founding Cohort.
      </p>
      <div style={{ borderTop: '1px solid #1C1C1E' }}>
        {BOOKS.map((b) => (
          <BookCard key={b.slug} book={b} />
        ))}
      </div>
    </div>
  </section>
);

export default Compendiums;
