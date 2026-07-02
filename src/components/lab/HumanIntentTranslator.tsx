import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { getLabSessionId } from '@/lib/session';

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
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentInitialRef = useRef(false);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);
    try {
      const sessionId = getLabSessionId();
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
        session_id: getLabSessionId(),
      });
    } catch {
      /* silent */
    }
  };

  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div className="mb-4">
        <span className="label-style block mb-3" style={{ color: 'hsl(var(--bronze))' }}>
          HUMAN INTENT TRANSLATOR · OPEN BETA
        </span>
        <p className="text-ink-soft leading-relaxed" style={{ fontWeight: 300 }}>
          An investigation into how humans talk to AI.
          <br />
          Free during beta. Your conversations help us translate intention into form.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="min-h-[280px] max-h-[520px] overflow-y-auto py-8 space-y-6 scrollbar-none"
      >
        {messages.length === 0 && !loading && (
          <p className="text-ink-soft/60 italic text-sm" style={{ fontWeight: 300 }}>
            Write below to begin.
          </p>
        )}

        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex flex-col items-start'}>
            <div
              className={
                m.role === 'user'
                  ? 'max-w-[80%] px-5 py-3 text-ink'
                  : 'max-w-[85%] px-5 py-3 text-ink'
              }
              style={{
                backgroundColor:
                  m.role === 'user' ? 'hsl(38, 33%, 93%)' : 'hsl(40, 43%, 97%)',
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              {m.text.split('\n').map((line, j) => (
                <p key={j} className="mb-2 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
            {m.role === 'lab' && m.message_id && (
              <div className="flex gap-4 mt-2 pl-1">
                {FEEDBACK.map((f) => {
                  const chosen = m.feedback === f.key;
                  const anyChosen = !!m.feedback;
                  return (
                    <button
                      key={f.key}
                      onClick={() => rate(i, f.key!)}
                      disabled={anyChosen}
                      className="text-[11px] tracking-wider transition-opacity"
                      style={{
                        color: 'hsl(var(--bronze))',
                        opacity: chosen ? 1 : anyChosen ? 0.35 : 0.85,
                        fontWeight: chosen ? 500 : 400,
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
            <span className="w-1.5 h-1.5 rounded-full bg-ink-soft/60 animate-pulse" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-ink-soft/60 animate-pulse"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-ink-soft/60 animate-pulse"
              style={{ animationDelay: '300ms' }}
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
          className="w-full resize-none bg-background text-ink placeholder:text-ink-soft/50 border border-ink-soft/40 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze/40 py-3 pl-4 pr-12 text-base transition-colors"
          style={{ fontWeight: 400, minHeight: 48 }}
        />
        <button
          onClick={() => void send(input)}
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="absolute right-3 top-1/2 -translate-y-1/2 disabled:opacity-30 transition-opacity"
          style={{ color: 'hsl(var(--bronze))' }}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HumanIntentTranslator;
