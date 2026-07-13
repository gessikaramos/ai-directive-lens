/**
 * Library Access · destino do link seguro enviado no e-mail de recibo
 * (Camada C, checkout Lemon Squeezy). O token não abre o arquivo diretamente —
 * troca por uma URL assinada e temporária do Storage (10min), sempre gerada
 * na hora pela Edge Function library/access. Link pessoal: não compartilhar.
 */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ink = 'hsl(30 14% 15%)';
const inkSoft = 'hsl(30 10% 38%)';
const bronzeLabel = {
  color: 'hsl(28 35% 45%)',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

type AccessResult = {
  book_slug: string;
  product_tier: 'digital' | 'bundle';
  urls: Record<string, string | null>;
};

const FILE_LABEL = (path: string) =>
  path.includes('audiobook') ? 'Audiobook' : 'PDF · Reader Edition';

const LibraryAccess = () => {
  const [params] = useSearchParams();
  const [state, setState] = useState<'working' | 'ok' | 'invalid'>('working');
  const [result, setResult] = useState<AccessResult | null>(null);

  useEffect(() => {
    document.title = 'Your Library · LolaLab';
    const token = params.get('token') ?? '';
    (async () => {
      const { data, error } = await supabase.functions.invoke('library', {
        body: { action: 'access', token },
      });
      if (error || !data?.ok) {
        setState('invalid');
        return;
      }
      setResult(data);
      setState('ok');
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen px-6 md:px-12 pt-40 pb-32 text-center"
        style={{ backgroundColor: 'hsl(var(--background))', color: ink }}
      >
        <span className="block mb-6" style={bronzeLabel}>
          YOUR LIBRARY
        </span>

        {state === 'working' && (
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '1.25rem', color: inkSoft }}>
            Opening your copy…
          </p>
        )}

        {state === 'invalid' && (
          <p style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '1.25rem', color: inkSoft }}>
            This link has expired or isn't valid anymore. Check your receipt e-mail for the
            most recent one, or write to{' '}
            <a href="mailto:hello@lolalabstudio.com" style={{ color: 'hsl(28 35% 45%)' }}>
              hello@lolalabstudio.com
            </a>
            .
          </p>
        )}

        {state === 'ok' && result && (
          <div className="max-w-[480px] mx-auto">
            <p
              className="mb-10"
              style={{ fontFamily: "'Newsreader', Georgia, serif", fontSize: '1.75rem', color: ink }}
            >
              Your copy is ready.
            </p>
            <div className="flex flex-col gap-4">
              {Object.entries(result.urls).map(([path, url]) =>
                url ? (
                  <a
                    key={path}
                    href={url}
                    className="px-8 py-4 transition-all duration-300 hover:opacity-85"
                    style={{
                      backgroundColor: ink,
                      color: 'hsl(var(--background))',
                      borderRadius: '9999px',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Download {FILE_LABEL(path)}
                  </a>
                ) : null,
              )}
            </div>
            <p className="mt-10" style={{ fontSize: '0.8125rem', fontWeight: 300, color: inkSoft }}>
              These links are personal and expire in 10 minutes — reopen this page anytime for
              a fresh one.
            </p>
          </div>
        )}
      </main>
      <Footer hideNewsletter />
    </>
  );
};

export default LibraryAccess;
