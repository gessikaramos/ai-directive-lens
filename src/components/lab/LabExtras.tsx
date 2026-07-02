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
    <section className="px-6 md:px-12 py-24 bg-background">
      <div className="max-w-[720px] mx-auto">
        <span className="label-style block mb-6" style={{ color: 'hsl(var(--bronze))' }}>
          CAST · CONVERSATIONS
        </span>
        <p className="text-ink-soft leading-relaxed mb-4" style={{ fontWeight: 300 }}>
          A slow series of conversations with people who make things beautifully.
          <br />
          Not a podcast about AI. A study of how minds work.
        </p>
        <p className="text-ink-soft italic mb-8" style={{ fontWeight: 300 }}>
          Coming later this year.
        </p>

        {done ? (
          <p className="text-ink" style={{ fontWeight: 300 }}>
            Received. Thank you.
          </p>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Notify me when the first conversation drops"
              className="flex-1 bg-background text-ink border border-ink-soft/40 focus:border-bronze focus:outline-none px-4 py-3"
              style={{ fontWeight: 400 }}
            />
            <button
              type="submit"
              className="label-style border px-5 py-3 transition-colors"
              style={{ borderColor: 'hsl(var(--bronze))', color: 'hsl(var(--bronze))' }}
            >
              NOTIFY ME
            </button>
          </form>
        )}
        {err && <p className="mt-3 text-sm text-ink-soft">{err}</p>}
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

  const inputCls =
    'w-full bg-background text-ink border border-ink-soft/40 focus:border-bronze focus:outline-none px-4 py-3';

  return (
    <section className="px-6 md:px-12 py-24 md:py-32 bg-background">
      <div className="max-w-[720px] mx-auto">
        <span className="label-style block mb-6" style={{ color: 'hsl(var(--bronze))' }}>
          COLLECTIVE
        </span>
        <p className="text-ink leading-relaxed mb-4" style={{ fontWeight: 300 }}>
          We occasionally assemble small teams for ambitious AI-native creative projects.
          <br />
          If your work is exceptional, we would love to know you before we need you.
        </p>
        <p className="text-ink-soft italic mb-10" style={{ fontWeight: 300 }}>
          Not a job application. Not an agency roster.
          <br />
          A quiet network of collaborators.
        </p>

        {done ? (
          <div className="text-ink" style={{ fontWeight: 300 }}>
            <p>Received. Thank you.</p>
            <p className="text-ink-soft mt-2">We reply only when the work moves us forward.</p>
            <p className="text-ink-soft">This can take weeks. Sometimes months.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <input
              className={inputCls}
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className={inputCls}
              placeholder="Where you're based"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
            <input
              className={inputCls}
              type="url"
              placeholder="Portfolio URL"
              value={form.portfolio_url}
              onChange={(e) => setForm({ ...form, portfolio_url: e.target.value })}
              required
            />
            <div>
              <span className="label-style block mb-3">YOUR EXPERTISE</span>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE.map((x) => {
                  const on = form.expertise.includes(x);
                  return (
                    <button
                      type="button"
                      key={x}
                      onClick={() => toggle(x)}
                      className="label-style border px-3 py-1.5 transition-colors"
                      style={{
                        borderColor: on ? 'hsl(var(--bronze))' : 'hsl(var(--border))',
                        color: on ? 'hsl(var(--bronze))' : undefined,
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
              rows={3}
              maxLength={300}
              placeholder="Favorite project (max 300 chars)"
              value={form.favorite_project}
              onChange={(e) => setForm({ ...form, favorite_project: e.target.value })}
              required
            />
            <input
              className={inputCls}
              type="url"
              placeholder="LinkedIn URL (optional)"
              value={form.linkedin_url}
              onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
            />
            <input
              className={inputCls}
              type="url"
              placeholder="Website (optional)"
              value={form.website_url}
              onChange={(e) => setForm({ ...form, website_url: e.target.value })}
            />
            <textarea
              className={inputCls}
              rows={4}
              maxLength={500}
              placeholder="Why LolaLab? (max 500 chars)"
              value={form.why_lolalab}
              onChange={(e) => setForm({ ...form, why_lolalab: e.target.value })}
              required
            />
            {err && <p className="text-sm text-ink-soft">{err}</p>}
            <button
              type="submit"
              disabled={busy}
              className="label-style px-6 py-3 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: 'hsl(var(--bronze))', color: 'hsl(var(--primary-foreground))' }}
            >
              SEND
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
    <section className="px-6 md:px-12 py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <span className="label-style block mb-6" style={{ color: 'hsl(var(--bronze))' }}>
          SIGNAL · READS FROM THE STUDIO
        </span>
        <p className="text-ink-soft mb-10 max-w-2xl" style={{ fontWeight: 300 }}>
          Notes on what the AI industry is doing, missing, or getting wrong.
          <br />
          Editorial takes. Not hot takes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mb-16">
          {posts.map((p, i) => (
            <article key={i} className="bg-card p-8 min-h-[240px] flex flex-col justify-between">
              <div>
                {p.date && <span className="label-style block mb-4">{p.date}</span>}
                <h3 className="text-lg text-ink mb-3" style={{ fontWeight: 500 }}>
                  {p.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed" style={{ fontWeight: 300 }}>
                  {p.preview}
                </p>
              </div>
              {i === 0 && (
                <span
                  className="label-style mt-6 self-start"
                  style={{ color: 'hsl(var(--bronze))' }}
                >
                  READ →
                </span>
              )}
            </article>
          ))}
        </div>

        <div className="max-w-[520px]">
          {done ? (
            <p className="text-ink" style={{ fontWeight: 300 }}>
              Received. Thank you.
            </p>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Get new reads by email"
                className="flex-1 bg-background text-ink border border-ink-soft/40 focus:border-bronze focus:outline-none px-4 py-3"
              />
              <button
                type="submit"
                className="label-style border px-5 py-3"
                style={{ borderColor: 'hsl(var(--bronze))', color: 'hsl(var(--bronze))' }}
              >
                SUBSCRIBE
              </button>
            </form>
          )}
          {err && <p className="mt-3 text-sm text-ink-soft">{err}</p>}
        </div>
      </div>
    </section>
  );
};

export { CastTeaser, CollectiveForm, SignalReads };
