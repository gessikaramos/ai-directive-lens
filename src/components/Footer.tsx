/**
 * Footer · Wave 3.2 · canon Cláudio+Mary Fred+Gé 8/jul
 *
 * Reformulação canon:
 *   - Logo STACKED (não texto)
 *   - Signal newsletter global (email opt-in Supabase table signal_opt_in source=footer)
 *   - Social links globais (LinkedIn · Instagram · YouTube · Upwork)
 *   - Copyright + Direction ainda embaixo
 *   - Aparece em TODAS as páginas (canon Gé)
 */
import { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';

const SOCIALS = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/gessikaolivieri/' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/lolalabstudio/' },
  { label: 'YOUTUBE', href: 'https://www.youtube.com/@lolalabstudio' },
  { label: 'UPWORK', href: 'https://www.upwork.com/freelancers/lolalabstudio?mp_source=share' },
];

export default function Footer({ hideNewsletter = false }: { hideNewsletter?: boolean }) {
  const { lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr('Enter a valid email.');
      return;
    }
    const { error } = await supabase.from('signal_opt_in').insert({ email, source: 'footer' });
    if (error && !/duplicate/i.test(error.message)) {
      setErr('Something went wrong. Try again.');
      return;
    }
    setDone(true);
  };

  return (
    <footer
      className="px-6 md:px-12 pt-20 md:pt-28 pb-14"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Signal newsletter · UMA captura por jornada (Wave DOP): páginas com
            captura própria (Library/DOP/Walter/About/Contact) escondem esta. */}
        <div
          className="pb-16 md:pb-20 mb-16 md:mb-20"
          style={{ borderBottom: '1px solid #1C1C1E', display: hideNewsletter ? 'none' : undefined }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <span
                className="block mb-4"
                style={{
                  color: 'hsl(var(--bronze-soft))',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                }}
              >
                Signal · Reads from the Studio
              </span>
              <p
                className="max-w-[420px]"
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'hsl(var(--cool-gray-tertiary))',
                }}
              >
                Editorial takes on what the AI industry is doing, missing, or getting wrong.
                Not hot takes.
              </p>
            </div>
            <div>
              {done ? (
                <p style={{ color: '#FFFFFF', fontWeight: 300 }}>Received. Thank you.</p>
              ) : (
                <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Get new reads by email"
                    className="flex-1 focus:outline-none px-4 py-3"
                    style={{
                      backgroundColor: 'transparent',
                      color: '#FFFFFF',
                      border: '1px solid #1C1C1E',
                      fontSize: '0.9375rem',
                      fontWeight: 400,
                    }}
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 transition-opacity hover:opacity-70"
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
                    Subscribe
                  </button>
                </form>
              )}
              {err && (
                <p className="mt-3" style={{ fontSize: '0.875rem', color: 'hsl(var(--cool-gray-secondary))' }}>
                  {err}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Logo stacked + social + copyright */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Coluna 1 · Logo — o MESMO wordmark da navbar (logo-horizontal).
              O logo-stacked.svg era um arquivo gerado, fora da marca ("sempre
              errado" — canon Gé 10/jul). */}
          <div>
            <img
              src="/images/logos/logo-horizontal.svg"
              alt="LolaLab"
              className="h-8 md:h-9"
              style={{ opacity: 0.95, width: 'auto' }}
            />
          </div>

          {/* Coluna 2 · Social links */}
          <div>
            <span
              className="block mb-4"
              style={{
                color: 'hsl(var(--bronze-soft))',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
              }}
            >
              Connect
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-500"
                  style={{
                    color: '#2C2C2E',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = '#2C2C2E';
                  }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 3 · Copyright + credit */}
          <div className="md:text-right">
            <p
              className="mb-2"
              style={{
                color: 'hsl(var(--cool-gray-secondary))',
                fontSize: '0.7rem',
                fontWeight: 400,
                letterSpacing: '0.08em',
              }}
            >
              {t('footer.rights', lang)}
            </p>
            <p
              style={{
                color: 'hsl(var(--cool-gray-secondary))',
                fontSize: '0.7rem',
                fontWeight: 400,
                letterSpacing: '0.08em',
              }}
            >
              {t('footer.credit', lang)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
