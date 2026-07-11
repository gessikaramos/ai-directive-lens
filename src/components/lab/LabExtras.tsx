/**
 * LabExtras · Wave 3.1.2 · canon Mary Editorial Dark Fred+Gé 7/jul
 * CastTeaser · CollectiveForm · SignalReads dark canon Mary.
 * Supabase inserts intactos.
 */
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const EXPERTISE = [
  'Character AI',
  'Scriptwriting',
  'Sound Design',
  'VFX',
  'Unreal',
  'Motion',
  'Branding',
  'Voice',
  'Editorial Photography',
  'Other',
];

const labelStyle = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

const inputStyle = {
  backgroundColor: 'transparent',
  color: '#FFFFFF',
  border: '1px solid #1C1C1E',
  fontSize: '0.9375rem',
  fontWeight: 400,
};

const CastTeaser = () => {
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
    const { error } = await supabase.from('signal_opt_in').insert({ email, source: 'cast' });
    if (error && !/duplicate/i.test(error.message)) {
      setErr('Something went wrong. Try again.');
      return;
    }
    setDone(true);
  };

  return (
    <section
      className="px-6 md:px-12 py-24"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[720px] mx-auto">
        <span className="block mb-6" style={labelStyle}>
          CAST · CONVERSATIONS
        </span>
        <p
          className="mb-4"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'hsl(var(--cool-gray-tertiary))',
          }}
        >
          A slow series of conversations with people who make things beautifully.
          <br />
          Not a podcast about AI. A study of how minds work.
        </p>
        <p
          className="italic mb-8"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          Coming later this year.
        </p>

        {done ? (
          <p style={{ color: '#FFFFFF', fontWeight: 300 }}>Received. Thank you.</p>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Notify me when the first conversation drops"
              className="flex-1 focus:outline-none px-4 py-3"
              style={inputStyle}
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
              Notify Me
            </button>
          </form>
        )}
        {err && (
          <p className="mt-3" style={{ fontSize: '0.875rem', color: 'hsl(var(--cool-gray-secondary))' }}>
            {err}
          </p>
        )}
      </div>
    </section>
  );
};

const CollectiveForm = () => {
  const [form, setForm] = useState({
    name: '',
    location: '',
    portfolio_url: '',
    expertise: [] as string[],
    favorite_project: '',
    linkedin_url: '',
    website_url: '',
    why_lolalab: '',
  });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const toggle = (v: string) => {
    setForm((f) => ({
      ...f,
      expertise: f.expertise.includes(v)
        ? f.expertise.filter((x) => x !== v)
        : [...f.expertise, v],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (
      !form.name.trim() ||
      !form.location.trim() ||
      !form.portfolio_url.trim() ||
      form.expertise.length === 0 ||
      !form.favorite_project.trim() ||
      !form.why_lolalab.trim()
    ) {
      setErr('Please complete all required fields.');
      return;
    }
    setBusy(true);
    const { error } = await supabase.from('collective_applications').insert({
      name: form.name.trim(),
      location: form.location.trim(),
      portfolio_url: form.portfolio_url.trim(),
      expertise: form.expertise,
      favorite_project: form.favorite_project.trim().slice(0, 300),
      linkedin_url: form.linkedin_url.trim() || null,
      website_url: form.website_url.trim() || null,
      why_lolalab: form.why_lolalab.trim().slice(0, 500),
    });
    setBusy(false);
    if (error) {
      setErr('Something went wrong. Try again.');
      return;
    }
    setDone(true);
  };

  const inputCls = 'w-full focus:outline-none px-4 py-3';

  return (
    <section
      className="px-6 md:px-12 py-24 md:py-32"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[720px] mx-auto">
        <span className="block mb-6" style={labelStyle}>
          COLLECTIVE
        </span>
        <p
          className="mb-4"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            lineHeight: 1.65,
            color: '#FFFFFF',
          }}
        >
          We occasionally assemble small teams for ambitious AI-native creative projects.
          <br />
          If your work is exceptional, we would love to know you before we need you.
        </p>
        <p
          className="italic mb-10"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          Not a job application. Not an agency roster.
          <br />
          A quiet network of collaborators.
        </p>

        {done ? (
          <div style={{ fontWeight: 300 }}>
            <p style={{ color: '#FFFFFF' }}>Received. Thank you.</p>
            <p style={{ color: 'hsl(var(--cool-gray-secondary))', marginTop: 8 }}>
              We reply only when the work moves us forward.
            </p>
            <p style={{ color: 'hsl(var(--cool-gray-secondary))' }}>
              This can take weeks. Sometimes months.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <input
              className={inputCls}
              style={inputStyle}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className={inputCls}
              style={inputStyle}
              placeholder="Where you're based"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
            <input
              className={inputCls}
              style={inputStyle}
              type="url"
              placeholder="Portfolio URL"
              value={form.portfolio_url}
              onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })}
              required
            />
            <div>
              <span className="block mb-3" style={labelStyle}>
                Your Expertise
              </span>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE.map((x) => {
                  const on = form.expertise.includes(x);
                  return (
                    <button
                      type="button"
                      key={x}
                      onClick={() => toggle(x)}
                      className="border px-3 py-1.5 transition-colors duration-300"
                      style={{
                        borderColor: on ? 'hsl(var(--bronze-soft))' : '#1C1C1E',
                        color: on ? 'hsl(var(--bronze-soft))' : 'hsl(var(--cool-gray-secondary))',
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {x}
                    </button>
                  );
                })}
              </div>
            </div>
            <textarea
              className={inputCls}
              style={inputStyle}
              rows={3}
              maxLength={300}
              placeholder="Favorite project (max 300 chars)"
              value={form.favorite_project}
              onChange={(e) => setForm({ ...form, favorite_project: e.target.value })}
              required
            />
            <input
              className={inputCls}
              style={inputStyle}
              type="url"
              placeholder="LinkedIn URL (optional)"
              value={form.linkedin_url}
              onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
            />
            <input
              className={inputCls}
              style={inputStyle}
              type="url"
              placeholder="Website (optional)"
              value={form.website_url}
              onChange={(e) => setForm({ ...form, website_url: e.target.value })}
            />
            <textarea
              className={inputCls}
              style={inputStyle}
              rows={4}
              maxLength={500}
              placeholder="Why LolaLab? (max 500 chars)"
              value={form.why_lolalab}
              onChange={(e) => setForm({ ...form, why_lolalab: e.target.value })}
              required
            />
            {err && (
              <p style={{ fontSize: '0.875rem', color: 'hsl(var(--cool-gray-secondary))' }}>
                {err}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="px-6 py-3 transition-opacity disabled:opacity-50 hover:opacity-70"
              style={{
                border: '1px solid #FFFFFF',
                color: '#FFFFFF',
                backgroundColor: 'transparent',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const SignalReads = () => {
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
    const { error } = await supabase.from('signal_opt_in').insert({ email, source: 'signal' });
    if (error && !/duplicate/i.test(error.message)) {
      setErr('Something went wrong. Try again.');
      return;
    }
    setDone(true);
  };

  const posts = [
    {
      date: 'JUN 2026',
      title: 'Ben Affleck on AI Infrastructure',
      preview:
        'Reading the Sam Altman forum speech. Where cinema keeps misreading the moment — and what an AI-native studio actually looks like.',
    },
    {
      date: '',
      title: 'More soon',
      preview: 'The next reads are being written.',
    },
    {
      date: '',
      title: 'More soon',
      preview: 'The next reads are being written.',
    },
  ];

  return (
    <section
      className="px-6 md:px-12 py-24 md:py-32"
      style={{ backgroundColor: 'hsl(var(--ink))' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <span className="block mb-6" style={labelStyle}>
          SIGNAL · READS FROM THE STUDIO
        </span>
        <p
          className="mb-10 max-w-2xl"
          style={{
            fontSize: '0.9375rem',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'hsl(var(--cool-gray-secondary))',
          }}
        >
          Notes on what the AI industry is doing, missing, or getting wrong.
          <br />
          Editorial takes. Not hot takes.
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-3 mb-16"
          style={{ borderTop: '1px solid #1C1C1E' }}
        >
          {posts.filter((p) => p.title !== 'More soon').map((p, i) => (
            <article
              key={i}
              className="p-8 min-h-[240px] flex flex-col justify-between"
              style={{
                borderBottom: '1px solid #1C1C1E',
                borderRight: '1px solid #1C1C1E',
              }}
            >
              <div>
                {p.date && (
                  <span className="block mb-4" style={labelStyle}>
                    {p.date}
                  </span>
                )}
                <h3
                  className="mb-3"
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    letterSpacing: '-0.015em',
                    color: p.date ? '#FFFFFF' : 'hsl(var(--cool-gray-secondary))',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    lineHeight: 1.65,
                    color: 'hsl(var(--cool-gray-secondary))',
                  }}
                >
                  {p.preview}
                </p>
              </div>
              {i === 0 && (
                <span
                  className="mt-6 self-start"
                  style={{
                    color: 'hsl(var(--bronze-soft))',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  Read →
                </span>
              )}
            </article>
          ))}
        </div>

        <div className="max-w-[520px]">
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
                style={inputStyle}
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
    </section>
  );
};

export { CastTeaser, CollectiveForm, SignalReads };
