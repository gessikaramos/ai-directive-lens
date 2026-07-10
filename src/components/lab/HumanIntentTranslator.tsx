import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { ArrowRight, Mic, Paperclip, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getLabSessionId, resetLabSessionId } from '@/lib/session';
import { useAuth } from '@/hooks/use-auth';
import PastConversations, { HistoryTurn } from './PastConversations';
import CreativeDirectionPack from './CreativeDirectionPack';

type Role = 'user' | 'lab';
interface Msg {
  role: Role;
  text: string;
  message_id?: string | null;
  feedback?: 'clear' | 'confused' | 'loved' | 'wrong';
  is_pack?: boolean;
  entitled?: boolean;
  tech_locked?: boolean;
  /** miniatura da imagem de referência enviada junto (data URL) */
  image?: string;
}

const FEEDBACK: Array<{ key: Msg['feedback']; label: string }> = [
  { key: 'clear', label: 'Clear' },
  { key: 'confused', label: 'Confused' },
  { key: 'loved', label: 'Loved' },
  { key: 'wrong', label: 'Wrong' },
];

interface Props {
  initialIntent?: string;
  /** Notifica a página quando a conversa está ativa (modo imersivo). */
  onConversationChange?: (active: boolean) => void;
}

const HumanIntentTranslator = ({ initialIntent, onConversationChange }: Props) => {
  const { user, signOut } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [shared, setShared] = useState(false);
  // Voz (ditado nativo do navegador) e imagem de referência
  const [listening, setListening] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert('Voice input is not supported in this browser yet. Try Chrome or Safari.');
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = navigator.language || 'en-US';
    rec.interimResults = false;
    rec.continuous = true;
    rec.onresult = (e: any) => {
      let chunk = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) chunk += e.results[i][0].transcript;
      }
      if (chunk) setInput((prev) => (prev ? prev + ' ' : '') + chunk.trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  };

  const attachImage = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5_000_000) {
      alert('Image too large — 5MB max.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAttachedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const shareWalter = async () => {
    const url = 'https://www.lolalabstudio.com/lab';
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Walter · Human Intent Translator — LolaLab',
          text: 'Direction over prompt. Talk to Walter.',
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    } catch {
      /* usuário cancelou o share sheet — silêncio */
    }
  };
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>(() => getLabSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentInitialRef = useRef(false);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;
    const image = attachedImage ?? undefined;
    setInput('');
    setAttachedImage(null);
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
    }
    setMessages((m) => [...m, { role: 'user', text, image }]);
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('hit_chat', {
        body: { message: text, sessionId, imageDataUrl: image },
      });
      if (error) throw error;
      const ai_response =
        data?.ai_response ??
        'The Lab is processing many ideas right now. You can try again in a few minutes, or write directly to LolaLab at hello@lolalabstudio.com.';
      setMessages((m) => [
        ...m,
        {
          role: 'lab',
          text: ai_response,
          message_id: data?.message_id ?? null,
          is_pack: data?.is_pack === true,
          entitled: data?.entitled === true,
          tech_locked: data?.tech_locked === true,
        },
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

  useEffect(() => {
    onConversationChange?.(messages.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

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
          WALTER · HUMAN INTENT TRANSLATOR · REFINEMENT PHASE
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
          The tasting is open during the Refinement Phase. Your conversations help us
          translate intention into form.
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
          <button
            onClick={() => void shareWalter()}
            className="transition-opacity hover:opacity-80"
            style={{ color: 'hsl(var(--cool-gray-secondary))' }}
          >
            {shared ? 'Link copied ✓' : 'Share Walter ↗'}
          </button>
        </div>
      </div>

      {user && (
        <PastConversations onResume={resumeSession} currentSessionId={sessionId} />
      )}

      <div
        ref={scrollRef}
        className="min-h-[240px] max-h-[62vh] overflow-y-auto py-8 space-y-9 scrollbar-none"
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

        {/* Minimalismo Imersivo (canon Mary): fluxo editorial contínuo, sem bolhas.
            Voz do usuário em sans discreta; voz do Translator em serif editorial. */}
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'lab' ? 'lab-fade-in' : undefined}>
            {m.role === 'user' ? (
              <div className="pt-1">
                <span
                  className="block mb-1.5"
                  style={{
                    color: 'hsl(var(--background) / 0.35)',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                  }}
                >
                  You
                </span>
                {m.image && (
                  <img
                    src={m.image}
                    alt="Reference"
                    className="mb-3 max-h-[180px] w-auto"
                    style={{ borderRadius: '4px', border: '1px solid hsl(var(--background) / 0.15)' }}
                  />
                )}
                <p
                  style={{
                    color: 'hsl(var(--background) / 0.6)',
                    fontSize: '0.9375rem',
                    fontWeight: 300,
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {m.text}
                </p>
              </div>
            ) : m.is_pack ? (
              <CreativeDirectionPack
                text={m.text}
                entitled={m.entitled === true}
                techLocked={m.tech_locked === true}
              />
            ) : (
              <div className="pt-1">
                <span
                  className="block mb-2"
                  style={{
                    color: 'hsl(var(--bronze-soft))',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                  }}
                >
                  Walter
                </span>
                <div
                  style={{
                    fontFamily: "'Newsreader', Georgia, serif",
                    color: 'hsl(var(--background) / 0.94)',
                    fontSize: '1.1875rem',
                    fontWeight: 300,
                    lineHeight: 1.8,
                  }}
                >
                  {m.text.split('\n').map((line, j) => (
                    <p key={j} className="mb-3 last:mb-0">
                      {line}
                    </p>
                  ))}
                </div>
                {m.message_id && (
                  <div className="flex gap-5 mt-4">
                    {FEEDBACK.map((f) => {
                      const chosen = m.feedback === f.key;
                      const anyChosen = !!m.feedback;
                      return (
                        <button
                          key={f.key}
                          onClick={() => rate(i, f.key!)}
                          disabled={anyChosen}
                          className="transition-opacity hover:opacity-100"
                          style={{
                            color: 'hsl(var(--bronze-soft))',
                            fontSize: '0.6rem',
                            fontWeight: chosen ? 500 : 400,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            opacity: chosen ? 1 : anyChosen ? 0.25 : 0.45,
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

      <div className="relative mt-8">
        {/* Imagem de referência anexada · chip de preview */}
        {attachedImage && (
          <div className="mb-3 inline-flex items-center gap-3">
            <img
              src={attachedImage}
              alt="Reference to send"
              className="h-14 w-auto"
              style={{ borderRadius: '4px', border: '1px solid hsl(var(--background) / 0.2)' }}
            />
            <button
              onClick={() => setAttachedImage(null)}
              aria-label="Remove image"
              className="transition-opacity hover:opacity-80"
              style={{ color: 'hsl(var(--cool-gray-secondary))' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // expansão orgânica: o campo cresce com o pensamento
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 220) + 'px';
          }}
          onKeyDown={onKey}
          rows={2}
          placeholder={listening ? 'Listening… speak your intention.' : 'What are you trying to put into the world?'}
          className="w-full resize-none focus:outline-none py-4 pl-5 pr-14 pb-12 transition-colors"
          style={{
            backgroundColor: 'hsl(var(--background) / 0.03)',
            color: 'hsl(var(--background))',
            border: listening
              ? '1px solid hsl(var(--bronze-soft) / 0.6)'
              : '1px solid hsl(var(--background) / 0.14)',
            borderRadius: '2px',
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.6,
            minHeight: 96,
          }}
        />

        {/* Voz + imagem · canto inferior esquerdo */}
        <div className="absolute left-4 bottom-4 flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) attachImage(f);
              e.target.value = '';
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach a reference image"
            className="transition-opacity hover:opacity-100"
            style={{ color: 'hsl(var(--background) / 0.45)' }}
          >
            <Paperclip className="w-[18px] h-[18px]" />
          </button>
          <button
            onClick={toggleMic}
            aria-label={listening ? 'Stop voice input' : 'Speak your intention'}
            className={listening ? 'animate-pulse' : 'transition-opacity hover:opacity-100'}
            style={{
              color: listening ? 'hsl(var(--bronze-soft))' : 'hsl(var(--background) / 0.45)',
            }}
          >
            <Mic className="w-[18px] h-[18px]" />
          </button>
        </div>

        <button
          onClick={() => void send(input)}
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="absolute right-4 bottom-4 disabled:opacity-30 transition-opacity"
          style={{ color: 'hsl(var(--bronze-soft))' }}
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HumanIntentTranslator;
