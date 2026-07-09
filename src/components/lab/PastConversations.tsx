/**
 * Past Conversations · signed-in only
 * Lists distinct sessions from hit_conversations for the current user.
 * Click a session to load its transcript into the HIT view.
 */
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

export interface HistoryTurn {
  role: 'user' | 'lab';
  text: string;
  message_id?: string | null;
}

interface Session {
  session_id: string;
  first_message: string;
  last_at: string;
  count: number;
}

interface Props {
  onResume: (turns: HistoryTurn[], sessionId: string) => void;
  currentSessionId: string;
}

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.65rem',
  fontWeight: 500,
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
};

const PastConversations = ({ onResume, currentSessionId }: Props) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !open) return;
    let cancel = false;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from('hit_conversations')
        .select('id, session_id, user_message, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(200);
      if (cancel) return;
      const map = new Map<string, Session>();
      for (const row of data ?? []) {
        const sid = row.session_id;
        const existing = map.get(sid);
        if (!existing) {
          map.set(sid, {
            session_id: sid,
            first_message: row.user_message ?? '',
            last_at: row.created_at ?? '',
            count: 1,
          });
        } else {
          existing.count += 1;
          existing.first_message = row.user_message ?? existing.first_message;
        }
      }
      setSessions(Array.from(map.values()));
      setLoading(false);
    })();
    return () => {
      cancel = true;
    };
  }, [user, open]);

  const resume = async (sid: string) => {
    const { data } = await supabase
      .from('hit_conversations')
      .select('id, user_message, ai_response')
      .eq('session_id', sid)
      .order('created_at', { ascending: true });
    const turns: HistoryTurn[] = [];
    for (const row of data ?? []) {
      if (row.user_message) turns.push({ role: 'user', text: row.user_message });
      if (row.ai_response)
        turns.push({ role: 'lab', text: row.ai_response, message_id: row.id });
    }
    onResume(turns, sid);
    setOpen(false);
  };

  if (!user) return null;

  return (
    <div className="mb-6">
      <button
        onClick={() => setOpen((o) => !o)}
        className="transition-opacity hover:opacity-80"
        style={labelStyle}
      >
        {open ? '— HIDE PAST CONVERSATIONS' : '+ PAST CONVERSATIONS'}
      </button>
      {open && (
        <div
          className="mt-4"
          style={{ borderTop: '1px solid hsl(var(--background) / 0.08)' }}
        >
          {loading && (
            <p
              className="py-4"
              style={{
                fontSize: '0.8125rem',
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              Loading…
            </p>
          )}
          {!loading && sessions.length === 0 && (
            <p
              className="py-4"
              style={{
                fontSize: '0.8125rem',
                color: 'hsl(var(--cool-gray-secondary))',
              }}
            >
              No past conversations yet.
            </p>
          )}
          {sessions.map((s) => {
            const active = s.session_id === currentSessionId;
            return (
              <button
                key={s.session_id}
                onClick={() => resume(s.session_id)}
                className="w-full text-left py-3 transition-opacity hover:opacity-80"
                style={{
                  borderBottom: '1px solid hsl(var(--background) / 0.06)',
                  opacity: active ? 0.5 : 1,
                  cursor: active ? 'default' : 'pointer',
                }}
                disabled={active}
              >
                <div
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    color: 'hsl(var(--background))',
                    lineHeight: 1.5,
                  }}
                >
                  {s.first_message.slice(0, 90)}
                  {s.first_message.length > 90 ? '…' : ''}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontSize: '0.7rem',
                    color: 'hsl(var(--cool-gray-secondary))',
                    letterSpacing: '0.08em',
                  }}
                >
                  {new Date(s.last_at).toLocaleString()} · {s.count} messages
                  {active ? ' · current' : ''}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PastConversations;
