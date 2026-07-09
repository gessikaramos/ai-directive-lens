import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getLabSessionId, resetLabSessionId } from '@/lib/session';
import { useAuth } from '@/hooks/use-auth';
import PastConversations, { HistoryTurn } from './PastConversations';

type Role = 'user' | 'lab';
interface Msg {
  role: Role;
  text: string;
  message_id?: string | null;
  feedback?: 'clear' | 'confused' | 'loved' | 'wrong';
}

const FEEDBACK: Array<{ key: Msg['feedback']; label: string }> = [
  { key: 'clear', label: 'Clear' },
  { key: 'confused', label: 'Confused' },
  { key: 'loved', label: 'Loved' },
  { key: 'wrong', label: 'Wrong' },
];

interface Props {
  initialIntent?: string;
}

const HumanIntentTranslator = ({ initialIntent }: Props) => {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => getLabSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentInitialRef = useRef(false);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('hit_chat', {
        body: { message: text, sessionId },
      });
      if (error) throw error;
      const ai_response =
        data?.ai_response ??
        'The Lab is processing many ideas right now. You can try again in a few minutes, or write directly to LolaLab at hello@lolalabstudio.com.';
      setMessages((m) => [
        ...m,
        { role: 'lab', text: ai_response, message_id: data?.message_id ?? null },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        {
          role: 'lab',
          text:
            'The Lab is processing many ideas right now. You can try again in a few minutes, or write directly to LolaLab at hello@lolalabstudio.com.',
          message_id: null,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sentInitialRef.current && initialIntent && initialIntent.trim()) {
      sentInitialRef.current = true;
      void send(initialIntent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIntent]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const rate = async (idx: number, key: NonNullable<Msg['feedback']>) => {
    const msg = messages[idx];
    if (!msg || msg.feedback || !msg.message_id) return;
    setMessages((m) => m.map((mm, i) => (i === idx ? { ...mm, feedback: key } : mm)));
    try {
      await supabase.from('hit_feedback').insert({
        message_id: msg.message_id,
        feedback_type: key,
        session_id: sessionId,
      });
    } catch {
      /* silent */
    }
  };

  const resumeSession = (turns: HistoryTurn[], sid: string) => {
    setSessionId(sid);
    try {
      sessionStorage.setItem('lab_session_id', sid);
    } catch {
      /* silent */
    }
    setMessages(turns.map((t) => ({ role: t.role, text: t.text, message_id: t.message_id })));
  };

  const startNew = () => {
    const sid = resetLabSessionId();
    setSessionId(sid);
    setMessages([]);
  };

  return (
    <div className="w-full max-w-[720px] mx-auto">
      <div className="mb-6">
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
          HUMAN INTENT TRANSLATOR · OPEN BETA
        </span>
        <p
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'hsl(var(--cool-gray-tertiary))',
          }}
        >
          An investigation into how humans talk to AI.
          <br />
          Free during beta. Your conversations help us translate intention into form.
        </p>

        {/* Auth status line */}
        <div
          className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
          style={{
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {user ? (
            <>
              <span style={{ color: 'hsl(var(--cool-gray-tertiary))' }}>
                Signed in as{' '}
                <span style={{ color: 'hsl(var(--bronze-soft))' }}>{user.email}</span>
              </span>
              <button
                onClick={startNew}
                className="transition-opacity hover:opacity-80"
                style={{ color: 'hsl(var(--bronze-soft))' }}
              >
                + New conversation
              </button>
              <button
                onClick={() => void signOut()}
                className="transition-opacity hover:opacity-80"
                style={{ color: 'hsl(var(--cool-gray-secondary))' }}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="transition-opacity hover:opacity-80"
              style={{ color: 'hsl(var(--bronze-soft))' }}
            >
              Sign in to save your conversations →
            </Link>
          )}
        </div>
      </div>

      {user && (
        <PastConversations onResume={resumeSession} currentSessionId={sessionId} />
      )}

      <div
        ref={scrollRef}
        className="min-h-[240px] max-h-[520px] overflow-y-auto py-6 space-y-5 scrollbar-none"
      >
        {messages.length === 0 && !loading && (
          <p
            className="italic"
            style={{
              fontSize: '0.9375rem',
              fontWeight: 300,
              color: 'hsl(var(--cool-gray-secondary))',
            }}
          >
            Write below to begin.
          </p>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex flex-col items-start'}>
            <div
              className={
                m.role === 'user'
                  ? 'max-w-[80%] px-5 py-3.5'
                  : 'max-w-[88%] px-5 py-3.5'
              }
              style={{
                backgroundColor:
                  m.role === 'user'
                    ? 'hsl(var(--background) / 0.08)'
                    : 'hsl(var(--background) / 0.04)',
                color: 'hsl(var(--background))',
                fontSize: '0.9375rem',
                fontWeight: 300,
                lineHeight: 1.65,
                borderRadius: '2px',
                border: '1px solid hsl(var(--background) / 0.08)',
              }}
            >
              {m.text.split('\n').map((line, j) => (
                <p key={j} className="mb-2 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
            {m.role === 'lab' && m.message_id && (
              <div className="flex gap-5 mt-3 pl-1">
                {FEEDBACK.map((f) => {
                  const chosen = m.feedback === f.key;
                  const anyChosen = !!m.feedback;
                  return (
                    <button
                      key={f.key}
                      onClick={() => rate(i, f.key!)}
                      disabled={anyChosen}
                      className="transition-opacity"
                      style={{
                        color: 'hsl(var(--bronze-soft))',
                        fontSize: '0.65rem',
                        fontWeight: chosen ? 500 : 400,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        opacity: chosen ? 1 : anyChosen ? 0.3 : 0.75,
                        cursor: anyChosen ? 'default' : 'pointer',
                      }}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-1.5 pl-2">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'hsl(var(--background) / 0.5)' }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: 'hsl(var(--background) / 0.5)',
                animationDelay: '150ms',
              }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{
                backgroundColor: 'hsl(var(--background) / 0.5)',
                animationDelay: '300ms',
              }}
            />
          </div>
        )}
      </div>

      <div className="relative mt-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          rows={1}
          placeholder="Write to the Lab."
          className="w-full resize-none focus:outline-none py-3 pl-4 pr-12 transition-colors"
          style={{
            backgroundColor: 'transparent',
            color: 'hsl(var(--background))',
            border: '1px solid hsl(var(--background) / 0.2)',
            fontSize: '0.9375rem',
            fontWeight: 400,
            minHeight: 48,
          }}
        />
        <button
          onClick={() => void send(input)}
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="absolute right-3 top-1/2 -translate-y-1/2 disabled:opacity-30 transition-opacity"
          style={{ color: 'hsl(var(--bronze-soft))' }}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HumanIntentTranslator;
