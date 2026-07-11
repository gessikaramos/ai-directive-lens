/**
 * Auth · /auth
 * Editorial dark login/signup: email magic-link + Google.
 * Matches the site's minimal LolaLab tone.
 */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageProvider } from '@/hooks/use-language';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const AuthContent = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = 'Sign in · The Lab · LolaLab';
    window.scrollTo(0, 0);
  }, []);

  const sendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('sending');
    setMessage('');
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/lab` },
    });
    if (error) {
      setStatus('error');
      setMessage(error.message);
    } else {
      setStatus('sent');
      setMessage('Check your inbox for the sign-in link.');
    }
  };

  const signInGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/lab` },
    });
    if (error) {
      setStatus('error');
      setMessage(
        'Google sign-in is still being connected. Use the email link below — it takes one click.',
      );
    }
  };

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen pt-32 pb-24 px-6 md:px-12"
        style={{ backgroundColor: 'hsl(var(--ink))' }}
      >
        <div className="max-w-[440px] mx-auto">
          <span className="block mb-6" style={labelStyle}>
            {user ? 'Signed in' : 'Sign in to Walter'}
          </span>

          {loading ? (
            <p style={{ color: 'hsl(var(--cool-gray-secondary))', fontSize: '0.9375rem' }}>
              …
            </p>
          ) : user ? (
            <div>
              <p
                className="mb-8"
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 300,
                  lineHeight: 1.5,
                  color: '#FFFFFF',
                }}
              >
                You're signed in as{' '}
                <span style={{ color: 'hsl(var(--bronze-soft))' }}>{user.email}</span>.
                Your conversations with Walter are now saved across sessions.
              </p>
              <div className="flex gap-6">
                <button onClick={() => navigate('/lab')} style={labelStyle}>
                  → GO TO THE LAB
                </button>
                <button
                  onClick={async () => {
                    await signOut();
                  }}
                  style={{ ...labelStyle, color: 'hsl(var(--cool-gray-secondary))' }}
                >
                  SIGN OUT
                </button>
              </div>
            </div>
          ) : (
            <>
              <p
                className="mb-10"
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: 'hsl(var(--cool-gray-tertiary))',
                }}
              >
                Sign in to keep your conversations with Walter across sessions. No
                password needed.
              </p>

              <button
                onClick={signInGoogle}
                className="w-full py-3.5 px-5 mb-6 transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: 'hsl(var(--background) / 0.06)',
                  color: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--background) / 0.15)',
                  fontSize: '0.9375rem',
                  fontWeight: 400,
                  borderRadius: '9999px',
                }}
              >
                Continue with Google
              </button>

              <div
                className="flex items-center gap-4 my-6"
                style={{ color: 'hsl(var(--cool-gray-secondary))' }}
              >
                <span className="flex-1 h-px" style={{ backgroundColor: '#1C1C1E' }} />
                <span style={{ ...labelStyle, letterSpacing: '0.2em' }}>OR</span>
                <span className="flex-1 h-px" style={{ backgroundColor: '#1C1C1E' }} />
              </div>

              <form onSubmit={sendMagicLink}>
                <label
                  className="block mb-2"
                  style={{ ...labelStyle, color: 'hsl(var(--cool-gray-secondary))' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full py-3 px-4 mb-4 focus:outline-none"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--background) / 0.2)',
                    fontSize: '0.9375rem',
                  }}
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 px-5 disabled:opacity-40 transition-opacity hover:opacity-80"
                  style={{
                    backgroundColor: 'hsl(var(--bronze-soft))',
                    color: 'hsl(var(--ink))',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    borderRadius: '9999px',
                  }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send magic link'}
                </button>
              </form>

              {message && (
                <p
                  className="mt-6"
                  style={{
                    fontSize: '0.8125rem',
                    fontWeight: 300,
                    color:
                      status === 'error'
                        ? 'hsl(var(--bronze-soft))'
                        : 'hsl(var(--cool-gray-tertiary))',
                  }}
                >
                  {message}
                </p>
              )}
            </>
          )}

          <div className="mt-16">
            <Link to="/lab" style={labelStyle} className="hover:opacity-80">
              ← BACK TO THE LAB
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const Auth = () => (
  <LanguageProvider>
    <AuthContent />
  </LanguageProvider>
);

export default Auth;
