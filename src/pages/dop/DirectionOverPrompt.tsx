/**
 * Direction Over Prompt · Capítulo 01 (Wave DOP CH01 · 11/jul/2026)
 * Rotas: neutra (escolha de edição), landings PT-BR/EN, leitura integral,
 * confirmação (double opt-in) e interesse ES. Página editorial: sem navbar
 * completa — header mínimo LolaLab. / Library + seletor PT · EN.
 */
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CH01_PT } from '@/content/dop/ch01-pt';
import { CH01_EN } from '@/content/dop/ch01-en';
import { track } from '@/lib/analytics';
import { WALTER_WAITLIST_ENABLED } from '@/lib/flags';

type Loc = 'pt-BR' | 'en';

const ink = 'hsl(30 14% 15%)';
const inkSoft = 'hsl(30 10% 38%)';
const bronze = 'hsl(28 35% 45%)';
const label = {
  color: bronze,
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};
const serif = "'Newsreader', Georgia, serif";

const COPY = {
  'pt-BR': {
    eyebrow: 'DIRECTION OVER PROMPT · CAPÍTULO 01',
    title: 'Quando tudo pode ser feito',
    subtitle: 'O que se torna escasso quando criar se torna abundante?',
    description:
      'Um ensaio de Gessika Olivieri sobre direção, julgamento e autoria na era das mídias sintéticas.',
    cta: 'LER O CAPÍTULO 01',
    note: 'Leitura gratuita · edição em português brasileiro',
    thesis: ['As ferramentas geram possibilidades.', 'A direção escolhe significado.'],
    formTitle: 'Abra a edição de leitura',
    consentEditorial:
      'Concordo em receber o Capítulo 01 e comunicações editoriais relacionadas a Direction Over Prompt. Posso cancelar a qualquer momento.',
    consentGeneral:
      'Também quero receber novos ensaios, ferramentas e lançamentos da LolaLab Library.',
    formCta: 'ABRIR MEU CAPÍTULO',
    micro: 'Sem spam. Sem venda de dados. Cancelamento disponível em todos os e-mails.',
    firstName: 'Primeiro nome (opcional)',
    checkEmail:
      'Quase lá. Enviamos um link para o seu e-mail — confirme e o capítulo se abre.',
    content: CH01_PT,
    readPath: '/pt-br/library/direction-over-prompt/read',
    landingPath: '/pt-br/library/direction-over-prompt',
  },
  en: {
    eyebrow: 'DIRECTION OVER PROMPT · CHAPTER 01',
    title: 'When Everything Can Be Made',
    subtitle: 'What becomes scarce when making becomes abundant?',
    description:
      'An essay by Gessika Olivieri on direction, judgment and authorship in the age of synthetic media.',
    cta: 'READ CHAPTER 01',
    note: 'Complimentary reading · English edition',
    thesis: ['Tools generate possibilities.', 'Direction chooses meaning.'],
    formTitle: 'Open the reader edition',
    consentEditorial:
      'I agree to receive Chapter 01 and editorial communications related to Direction Over Prompt. I can unsubscribe at any time.',
    consentGeneral:
      'I would also like to receive new essays, tools and releases from the LolaLab Library.',
    formCta: 'OPEN MY CHAPTER',
    micro: 'No spam. No data sales. Unsubscribe at any time.',
    firstName: 'First name (optional)',
    checkEmail:
      'Almost there. We sent a link to your email — confirm it and your chapter opens.',
    content: CH01_EN,
    readPath: '/en/library/direction-over-prompt/read',
    landingPath: '/en/library/direction-over-prompt',
  },
} as const;

function useSeo(title: string, description: string, path: string, loc?: Loc | 'neutral') {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    document.documentElement.lang = loc === 'pt-BR' ? 'pt-BR' : 'en';
    // canonical + hreflang (runtime · SPA — pré-render é pendência registrada)
    document.querySelectorAll('link[data-dop-seo]').forEach((n) => n.remove());
    const base = window.location.origin;
    const add = (rel: string, href: string, hreflang?: string) => {
      const l = document.createElement('link');
      l.rel = rel;
      l.href = href;
      if (hreflang) l.setAttribute('hreflang', hreflang);
      l.setAttribute('data-dop-seo', '1');
      document.head.appendChild(l);
    };
    add('canonical', `${base}${path}`);
    add('alternate', `${base}/pt-br/library/direction-over-prompt`, 'pt-BR');
    add('alternate', `${base}/en/library/direction-over-prompt`, 'en');
    add('alternate', `${base}/library/direction-over-prompt`, 'x-default');
    window.scrollTo(0, 0);
  }, [title, description, path, loc]);
}

const DopHeader = ({ current, minimal }: { current?: Loc; minimal?: boolean }) => (
  <header
    className="px-6 md:px-12 py-6 flex items-center justify-between"
    style={{ borderBottom: '1px solid hsl(30 14% 15% / 0.1)' }}
  >
    <Link to="/" className="flex items-baseline gap-3" style={{ color: ink }}>
      <span style={{ fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
        LolaLab.
      </span>
      <span style={{ ...label, fontSize: '0.6rem' }}>Library</span>
    </Link>
    {/* Composition Pass: na rota neutra a ESCOLHA é a página — sem PT/EN
        duplicado no topo (uma decisão por momento). */}
    {minimal ? null : (
    <nav className="flex items-center gap-4" aria-label="Reading edition">
      <Link
        to="/pt-br/library/direction-over-prompt"
        style={{
          ...label,
          fontSize: '0.65rem',
          color: current === 'pt-BR' ? ink : bronze,
          borderBottom: current === 'pt-BR' ? `1px solid ${ink}` : 'none',
        }}
      >
        PT
      </Link>
      <span style={{ color: inkSoft }}>·</span>
      <Link
        to="/en/library/direction-over-prompt"
        style={{
          ...label,
          fontSize: '0.65rem',
          color: current === 'en' ? ink : bronze,
          borderBottom: current === 'en' ? `1px solid ${ink}` : 'none',
        }}
      >
        EN
      </Link>
    </nav>
    )}
  </header>
);

/* ───────────────────────── Rota neutra ───────────────────────── */
export const DopNeutral = () => {
  useSeo(
    'Direction Over Prompt · Chapter 01 · LolaLab Library',
    'Choose your reading edition — Português or English.',
    '/library/direction-over-prompt',
    'neutral',
  );
  useEffect(() => track('dop_landing_view', { route: 'neutral' }), []);
  const suggestPt = (navigator.language || '').toLowerCase().startsWith('pt');

  // Composition Pass (canon Gé+Fred 11/jul): o seletor é o primeiro LIMIAR da
  // publicação — objeto editorial de um lado, decisão do outro. A sensação:
  // "estou entrando numa edição", não "configurando uma preferência".
  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))', color: ink }}>
      <DopHeader minimal />
      <section className="px-6 md:px-12 pt-20 md:pt-32 pb-24">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-16 items-center">
          {/* LADO A · o objeto: a capa da edição (mesma peça da Library) */}
          <div className="md:col-span-5 flex justify-center md:justify-end lolab-stage" style={{ animationDelay: '0.1s' }}>
            <div
              className="w-[240px] h-[340px] md:w-[264px] md:h-[374px] px-8 py-10 flex flex-col justify-between"
              style={{
                backgroundColor: 'hsl(var(--ink))',
                boxShadow: '18px 24px 55px rgba(42,37,32,0.3)',
                transform: 'rotate(-0.5deg)',
              }}
            >
              <span style={{ ...label, fontSize: '0.55rem' }}>CHAPTER 01</span>
              <div>
                <p
                  style={{
                    fontFamily: serif,
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    lineHeight: 1.12,
                    letterSpacing: '-0.01em',
                    color: '#FFFFFF',
                  }}
                >
                  Direction Over Prompt
                </p>
                <p
                  className="mt-3"
                  style={{
                    fontFamily: serif,
                    fontStyle: 'italic',
                    fontSize: '0.9375rem',
                    color: 'hsl(var(--background) / 0.6)',
                  }}
                >
                  When Everything Can Be Made
                </p>
              </div>
              <span
                style={{
                  fontSize: '0.55rem',
                  fontWeight: 500,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase',
                  color: 'hsl(var(--background) / 0.45)',
                }}
              >
                Gessika Olivieri · LolaLab
              </span>
            </div>
          </div>

          {/* LADO B · a decisão */}
          <div className="md:col-span-7 text-center md:text-left lolab-stage" style={{ animationDelay: '0.4s' }}>
            <span className="block mb-6" style={label}>
              DIRECTION OVER PROMPT · CHAPTER 01
            </span>
            <h1
              className="mb-10"
              style={{
                fontFamily: serif,
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: ink,
              }}
            >
              Choose your reading edition.
            </h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {(
                [
                  ['pt-BR', 'Português', '/pt-br/library/direction-over-prompt', suggestPt],
                  ['en', 'English', '/en/library/direction-over-prompt', !suggestPt],
                ] as const
              ).map(([loc, name, path, suggested]) => (
                <Link
                  key={loc}
                  to={path}
                  onClick={() => track('dop_language_selected', { locale: loc })}
                  className="px-10 py-4 transition-all duration-300 hover:opacity-85"
                  style={{
                    backgroundColor: suggested ? ink : 'transparent',
                    color: suggested ? 'hsl(var(--background))' : ink,
                    border: `1px solid ${ink}`,
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  {name}
                </Link>
              ))}
            </div>
            {suggestPt !== undefined && (
              <p className="mt-6" style={{ fontSize: '0.8125rem', fontWeight: 300, color: inkSoft }}>
                {suggestPt
                  ? 'Seu navegador sugere português — a escolha é sua.'
                  : 'Your browser suggests English — the choice is yours.'}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

/* ───────────────────────── Landing por idioma ───────────────────────── */
export const DopLanding = ({ loc }: { loc: Loc }) => {
  const c = COPY[loc];
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consentEd, setConsentEd] = useState(false);
  const [consentGen, setConsentGen] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [devConfirm, setDevConfirm] = useState<string | null>(null);

  useSeo(`${c.title} · Direction Over Prompt · LolaLab`, c.description, c.landingPath, loc);
  useEffect(() => track('dop_landing_view', { locale: loc }), [loc]);

  // já confirmado neste navegador? oferecer leitura direta
  const alreadyConfirmed = useMemo(
    () => localStorage.getItem('dop_confirmed') === 'true',
    [],
  );

  const preview = c.content.sections[0];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!consentEd) return;
    setStatus('sending');
    try {
      const { data, error } = await supabase.functions.invoke('dop', {
        body: {
          action: 'subscribe',
          email,
          first_name: firstName || undefined,
          locale: loc,
          source: 'dop_landing',
          utm_source: params.get('utm_source') ?? undefined,
          utm_medium: params.get('utm_medium') ?? undefined,
          utm_campaign: params.get('utm_campaign') ?? undefined,
          utm_content: params.get('utm_content') ?? undefined,
          referrer: document.referrer || undefined,
          consent_editorial: consentEd,
          consent_general: consentGen,
          website, // honeypot
        },
      });
      if (error) throw error;
      setStatus('sent');
      track('dop_form_submitted', { locale: loc });
      if (data?.confirm_url) setDevConfirm(data.confirm_url); // DOP_DEV_MODE (staging QA)
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))', color: ink }}>
      <DopHeader current={loc} />

      {/* Abertura editorial */}
      <section className="px-6 md:px-12 pt-24 md:pt-36 pb-16 text-center">
        <span className="block mb-6" style={label}>
          {c.eyebrow}
        </span>
        <h1
          className="mb-5 mx-auto max-w-[16ch]"
          style={{
            fontFamily: serif,
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
            color: ink,
          }}
        >
          {c.title}
        </h1>
        <p
          className="mb-6 mx-auto max-w-[46ch]"
          style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '1.25rem', color: inkSoft }}
        >
          {c.subtitle}
        </p>
        <p
          className="mb-10 mx-auto max-w-[52ch]"
          style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, color: inkSoft }}
        >
          {c.description}
        </p>
        <a
          href="#preview"
          onClick={() => track('dop_preview_started', { locale: loc })}
          className="inline-block px-10 py-4 transition-all duration-300 hover:opacity-85"
          style={{
            backgroundColor: ink,
            color: 'hsl(var(--background))',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          {c.cta}
        </a>
        <p className="mt-4" style={{ fontSize: '0.8125rem', fontWeight: 300, color: inkSoft }}>
          {c.note}
        </p>
      </section>

      {/* Preview · primeira seção integral (corte narrativo natural) */}
      <section id="preview" className="px-6 md:px-12 py-16 md:py-24">
        <article
          className="mx-auto max-w-[680px]"
          style={{ fontFamily: serif, fontSize: '1.1875rem', fontWeight: 400, lineHeight: 1.85 }}
        >
          <p className="mb-10 text-center" style={{ ...label, fontSize: '0.6rem' }}>
            {c.content.edition}
          </p>
          <h2 className="mb-8" style={{ ...label, fontSize: '0.75rem', color: ink }}>
            {preview.heading}
          </h2>
          {preview.paragraphs.map((p, i) => (
            <p key={i} className="mb-6">
              {p}
            </p>
          ))}
        </article>
      </section>

      {/* Tese em grande escala */}
      <section
        className="px-6 md:px-12 py-24 md:py-36 text-center"
        style={{ backgroundColor: 'hsl(var(--ink))' }}
      >
        <p
          style={{
            fontFamily: serif,
            fontSize: 'clamp(1.75rem, 4.2vw, 3.25rem)',
            fontWeight: 300,
            lineHeight: 1.3,
            letterSpacing: '-0.015em',
            color: '#FFFFFF',
          }}
        >
          {c.thesis[0]}
          <br />
          <span style={{ color: 'hsl(var(--bronze-soft))' }}>{c.thesis[1]}</span>
        </p>
      </section>

      {/* Formulário de leitores */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[560px]">
          {alreadyConfirmed ? (
            <div className="text-center">
              <p className="mb-6" style={{ fontFamily: serif, fontSize: '1.25rem', color: ink }}>
                {loc === 'pt-BR' ? 'Seu capítulo está pronto.' : 'Your chapter is ready.'}
              </p>
              <Link
                to={c.readPath}
                className="inline-block px-10 py-4 transition-all duration-300 hover:opacity-85"
                style={{
                  backgroundColor: ink,
                  color: 'hsl(var(--background))',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {loc === 'pt-BR' ? 'CONTINUAR LENDO' : 'CONTINUE READING'}
              </Link>
            </div>
          ) : status === 'sent' ? (
            <div className="text-center">
              <p className="mb-4" style={{ fontFamily: serif, fontSize: '1.25rem', lineHeight: 1.6, color: ink }}>
                {c.checkEmail}
              </p>
              {devConfirm && (
                <a
                  href={devConfirm}
                  className="inline-block mt-2"
                  style={{ ...label, fontSize: '0.65rem', textDecoration: 'underline' }}
                >
                  [staging] open confirmation link
                </a>
              )}
            </div>
          ) : (
            <form onSubmit={submit}>
              <p className="mb-8 text-center" style={{ ...label, color: ink }}>
                {c.formTitle}
              </p>
              {/* honeypot — invisível para humanos */}
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-5000px', height: 0, width: 0, opacity: 0 }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full py-3.5 px-5 mb-3 focus:outline-none"
                style={{
                  backgroundColor: 'transparent',
                  color: ink,
                  border: '1px solid hsl(30 14% 15% / 0.25)',
                  borderRadius: '9999px',
                  fontSize: '0.9375rem',
                  fontWeight: 300,
                }}
              />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={c.firstName}
                className="w-full py-3.5 px-5 mb-5 focus:outline-none"
                style={{
                  backgroundColor: 'transparent',
                  color: ink,
                  border: '1px solid hsl(30 14% 15% / 0.18)',
                  borderRadius: '9999px',
                  fontSize: '0.9375rem',
                  fontWeight: 300,
                }}
              />
              <label
                className="flex items-start gap-3 mb-3 cursor-pointer"
                style={{ fontSize: '0.8125rem', fontWeight: 300, lineHeight: 1.55, color: inkSoft }}
              >
                <input
                  type="checkbox"
                  checked={consentEd}
                  onChange={(e) => setConsentEd(e.target.checked)}
                  className="mt-1"
                  required
                />
                <span>{c.consentEditorial}</span>
              </label>
              <label
                className="flex items-start gap-3 mb-7 cursor-pointer"
                style={{ fontSize: '0.8125rem', fontWeight: 300, lineHeight: 1.55, color: inkSoft }}
              >
                <input
                  type="checkbox"
                  checked={consentGen}
                  onChange={(e) => setConsentGen(e.target.checked)}
                  className="mt-1"
                />
                <span>{c.consentGeneral}</span>
              </label>
              <button
                type="submit"
                disabled={status === 'sending' || !consentEd}
                className="w-full py-4 transition-all duration-300 hover:opacity-85 disabled:opacity-40"
                style={{
                  backgroundColor: ink,
                  color: 'hsl(var(--background))',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {c.formCta}
              </button>
              <p className="mt-4 text-center" style={{ fontSize: '0.75rem', fontWeight: 300, color: inkSoft }}>
                {c.micro}
              </p>
              {status === 'error' && (
                <p className="mt-3 text-center" style={{ fontSize: '0.8125rem', color: bronze }}>
                  {loc === 'pt-BR' ? 'Algo falhou — tente de novo.' : 'Something slipped — try again.'}
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

/* ───────────────────────── Confirmação ───────────────────────── */
export const DopConfirmed = ({ loc }: { loc: Loc }) => {
  const c = COPY[loc];
  const [params] = useSearchParams();
  const [state, setState] = useState<'working' | 'ok' | 'already' | 'expired' | 'invalid'>('working');
  useSeo(`Confirmed · Direction Over Prompt · LolaLab`, c.description, c.landingPath, loc);

  useEffect(() => {
    const token = params.get('token') ?? '';
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('dop', {
          body: { action: 'confirm', token },
        });
        if (error) throw error;
        if (data?.ok) {
          // refresh/voltar/reabrir/segundo clique caem em already_confirmed —
          // mesma página estável de sucesso, nunca "Link inválido" (QA item 3)
          localStorage.setItem('dop_confirmed', 'true');
          setState(data.state === 'already_confirmed' ? 'already' : 'ok');
          if (data.state !== 'already_confirmed') track('dop_email_confirmed', { locale: loc });
        } else setState('invalid');
      } catch (e: any) {
        setState(/410|expired/i.test(String(e?.message)) ? 'expired' : 'invalid');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))', color: ink }}>
      <DopHeader current={loc} />
      <section className="px-6 md:px-12 pt-32 pb-24 text-center">
        {state === 'working' && (
          <p style={{ fontFamily: serif, fontSize: '1.25rem', color: inkSoft }}>…</p>
        )}
        {(state === 'ok' || state === 'already') && (
          <>
            {state === 'already' && (
              <p className="mb-3" style={{ fontSize: '0.9375rem', fontWeight: 300, color: inkSoft }}>
                {loc === 'pt-BR'
                  ? 'Seu e-mail já foi confirmado.'
                  : 'Your email has already been confirmed.'}
              </p>
            )}
            <p className="mb-8" style={{ fontFamily: serif, fontSize: '1.5rem', color: ink }}>
              {loc === 'pt-BR' ? 'Seu capítulo está pronto.' : 'Your chapter is ready.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={c.readPath}
                onClick={() => track('dop_reader_opened', { locale: loc, via: 'confirmed' })}
                className="px-10 py-4 transition-all duration-300 hover:opacity-85"
                style={{
                  backgroundColor: ink,
                  color: 'hsl(var(--background))',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {loc === 'pt-BR' ? 'LER NO NAVEGADOR' : 'READ ONLINE'}
              </Link>
              <a
                href={
                  loc === 'pt-BR'
                    ? '/downloads/Direction_Over_Prompt_CH01_PT-BR_Reader_Edition_v1.pdf'
                    : '/downloads/Direction_Over_Prompt_CH01_EN_Reader_Edition_v1.pdf'
                }
                onClick={() => track('dop_pdf_downloaded', { locale: loc })}
                className="px-10 py-4 transition-all duration-300 hover:opacity-85"
                style={{
                  backgroundColor: 'transparent',
                  color: ink,
                  border: `1px solid ${ink}`,
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                {loc === 'pt-BR' ? 'BAIXAR O PDF' : 'DOWNLOAD THE PDF'}
              </a>
            </div>
          </>
        )}
        {(state === 'expired' || state === 'invalid') && (
          <>
            <p className="mb-6" style={{ fontFamily: serif, fontSize: '1.25rem', color: ink }}>
              {state === 'expired'
                ? loc === 'pt-BR'
                  ? 'Este link expirou.'
                  : 'This link has expired.'
                : loc === 'pt-BR'
                  ? 'Link inválido.'
                  : 'Invalid link.'}
            </p>
            <Link to={c.landingPath} style={{ ...label, textDecoration: 'underline' }}>
              {loc === 'pt-BR' ? 'Pedir um novo link' : 'Request a new link'}
            </Link>
          </>
        )}
      </section>
    </main>
  );
};

/* ───────────────────────── Leitura integral ───────────────────────── */
export const DopRead = ({ loc }: { loc: Loc }) => {
  const c = COPY[loc];
  const navigate = useNavigate();
  const confirmed = localStorage.getItem('dop_confirmed') === 'true';
  useSeo(`${c.title} · Reader · LolaLab`, c.description, c.readPath, loc);

  useEffect(() => {
    if (!confirmed) navigate(c.landingPath, { replace: true });
    else track('dop_reader_opened', { locale: loc });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!confirmed) return null;
  const ch = c.content;

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))', color: ink }}>
      <DopHeader current={loc} />
      <article className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[680px]">
          <p className="mb-3 text-center" style={{ ...label, fontSize: '0.6rem' }}>
            {ch.edition}
          </p>
          <h1
            className="mb-3 text-center"
            style={{
              fontFamily: serif,
              fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
            }}
          >
            {ch.title}
          </h1>
          <p className="mb-2 text-center" style={{ ...label, fontSize: '0.65rem', color: inkSoft }}>
            {ch.chapter}
          </p>
          <p
            className="mb-16 text-center"
            style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '1.125rem', color: inkSoft }}
          >
            {ch.question}
          </p>

          <div style={{ fontFamily: serif, fontSize: '1.1875rem', lineHeight: 1.85 }}>
            {ch.sections.map((s, i) => (
              <section key={i} className="mb-14">
                {s.heading && (
                  <h2 className="mb-6" style={{ ...label, fontSize: '0.75rem', color: ink }}>
                    {s.heading}
                  </h2>
                )}
                {s.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="mb-6"
                    style={
                      s.heading === 'NOTAS' || s.heading === 'NOTES'
                        ? { fontSize: '0.9375rem', color: inkSoft, fontFamily: 'Inter, sans-serif', fontWeight: 300, lineHeight: 1.6 }
                        : undefined
                    }
                  >
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {/* Página final canônica */}
          <div
            className="mt-20 pt-12 text-center"
            style={{ borderTop: '1px solid hsl(30 14% 15% / 0.15)' }}
          >
            <p
              className="mx-auto mb-8 max-w-[52ch]"
              style={{ fontFamily: serif, fontSize: '1.125rem', lineHeight: 1.7, color: inkSoft }}
            >
              {ch.closing}
            </p>
            <p style={{ ...label, fontSize: '0.65rem' }}>
              Gessika Olivieri · LolaLab
            </p>
            <p className="mt-2" style={{ fontSize: '0.7rem', fontWeight: 300, color: inkSoft }}>
              © 2026 LolaLab · Direction Over Prompt
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <a
                href={
                  loc === 'pt-BR'
                    ? '/downloads/Direction_Over_Prompt_CH01_PT-BR_Reader_Edition_v1.pdf'
                    : '/downloads/Direction_Over_Prompt_CH01_EN_Reader_Edition_v1.pdf'
                }
                onClick={() => track('dop_pdf_downloaded', { locale: loc, via: 'reader' })}
                style={{ ...label, textDecoration: 'underline' }}
              >
                {loc === 'pt-BR' ? 'Baixar o PDF' : 'Download the PDF'}
              </a>
              <button
                onClick={async () => {
                  const url = window.location.origin + c.landingPath;
                  try {
                    if (navigator.share) await navigator.share({ title: 'Direction Over Prompt', url });
                    else await navigator.clipboard.writeText(url);
                    track('dop_shared', { locale: loc });
                  } catch {
                    /* cancelado */
                  }
                }}
                style={{ ...label, textDecoration: 'underline', background: 'none' }}
              >
                {loc === 'pt-BR' ? 'Compartilhar' : 'Share'}
              </button>
              <Link
                to={loc === 'pt-BR' ? '/en/library/direction-over-prompt/read' : '/pt-br/library/direction-over-prompt/read'}
                style={{ ...label, textDecoration: 'underline' }}
              >
                {loc === 'pt-BR' ? 'Read in English' : 'Ler em português'}
              </Link>
            </div>
          </div>

          {/* Conversion Patch (canon Gé 11/jul): CTA secundário para a lista
              do Walter — desligado até WALTER_WAITLIST_ENABLED=true. */}
          {WALTER_WAITLIST_ENABLED && (
            <div className="mt-16 pt-12 text-center" style={{ borderTop: '1px solid hsl(30 14% 15% / 0.15)' }}>
              <p
                className="mx-auto mb-5 max-w-[36ch]"
                style={{ fontFamily: serif, fontSize: '1.0625rem', lineHeight: 1.5, color: inkSoft }}
              >
                Walter is the system born from this method.
              </p>
              <Link to="/lab" style={{ ...label, textDecoration: 'underline' }}>
                Join the opening list →
              </Link>
            </div>
          )}
        </div>
      </article>
    </main>
  );
};

/* ───────────────────────── Unsubscribe ─────────────────────────
   Sem login, sem redigitar e-mail, sem dark pattern, sem e-mail de
   confirmação do cancelamento. Token assinado vem do link do e-mail. */
export const DopUnsubscribe = ({ loc }: { loc: Loc }) => {
  const pt = loc === 'pt-BR';
  const [params] = useSearchParams();
  const token = params.get('u') ?? '';
  const [state, setState] = useState<'loading' | 'ready' | 'working' | 'done' | 'invalid'>('loading');
  const [info, setInfo] = useState<{ email_masked: string; has_general_consent: boolean } | null>(null);
  const [doneScope, setDoneScope] = useState<'dop' | 'all'>('dop');
  useSeo(
    pt ? 'Cancelar inscrição · LolaLab Library' : 'Unsubscribe · LolaLab Library',
    pt ? 'Gerencie suas comunicações editoriais.' : 'Manage your editorial communications.',
    `/${pt ? 'pt-br' : 'en'}/library/direction-over-prompt/unsubscribe`,
    loc,
  );

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke('dop', {
          body: { action: 'unsub_info', token },
        });
        if (error || !data?.ok) throw new Error('invalid');
        if (data.already_unsubscribed) {
          setState('done');
        } else {
          setInfo({ email_masked: data.email_masked, has_general_consent: data.has_general_consent });
          setState('ready');
        }
      } catch {
        setState('invalid');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unsubscribe = async (scope: 'dop' | 'all') => {
    if (state === 'working') return;
    setState('working');
    try {
      const { data, error } = await supabase.functions.invoke('dop', {
        body: { action: 'unsubscribe_link', token, scope },
      });
      if (error || !data?.ok) throw new Error('failed');
      setDoneScope(scope);
      setState('done');
      track('dop_unsubscribed', { locale: loc, scope });
    } catch {
      setState('invalid');
    }
  };

  const pill = (solid: boolean) => ({
    backgroundColor: solid ? ink : 'transparent',
    color: solid ? 'hsl(var(--background))' : ink,
    border: `1px solid ${ink}`,
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
  });

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))', color: ink }}>
      <DopHeader current={loc} />
      <section className="px-6 md:px-12 pt-32 pb-24 text-center">
        {state === 'loading' && (
          <p style={{ fontFamily: serif, fontSize: '1.25rem', color: inkSoft }}>…</p>
        )}
        {(state === 'ready' || state === 'working') && info && (
          <>
            <p className="mb-3" style={{ fontFamily: serif, fontSize: '1.375rem', lineHeight: 1.5, color: ink }}>
              {pt
                ? 'Não quer mais receber comunicações sobre Direction Over Prompt?'
                : 'No longer want to receive updates about Direction Over Prompt?'}
            </p>
            <p className="mb-10" style={{ fontSize: '0.875rem', fontWeight: 300, color: inkSoft }}>
              {info.email_masked}
            </p>
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => unsubscribe('dop')}
                disabled={state === 'working'}
                className="px-10 py-4 transition-all duration-300 hover:opacity-85 disabled:opacity-40"
                style={pill(true)}
              >
                {pt ? 'Cancelar inscrição' : 'Unsubscribe'}
              </button>
              {info.has_general_consent && (
                <button
                  onClick={() => unsubscribe('all')}
                  disabled={state === 'working'}
                  className="px-10 py-4 transition-all duration-300 hover:opacity-85 disabled:opacity-40"
                  style={pill(false)}
                >
                  {pt
                    ? 'Cancelar todas as comunicações da LolaLab'
                    : 'Unsubscribe from all LolaLab communications'}
                </button>
              )}
            </div>
          </>
        )}
        {state === 'done' && (
          <>
            <p className="mb-4" style={{ fontFamily: serif, fontSize: '1.5rem', color: ink }}>
              {pt ? 'Sua inscrição foi cancelada.' : 'You have been unsubscribed.'}
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, color: inkSoft }}>
              {pt
                ? 'Você não receberá novas comunicações editoriais desta lista.'
                : 'You will no longer receive editorial messages from this list.'}
              {doneScope === 'all' && (
                <>
                  <br />
                  {pt
                    ? 'As comunicações gerais da LolaLab também foram canceladas.'
                    : 'General LolaLab communications were cancelled as well.'}
                </>
              )}
            </p>
          </>
        )}
        {state === 'invalid' && (
          <>
            <p className="mb-6" style={{ fontFamily: serif, fontSize: '1.25rem', color: ink }}>
              {pt ? 'Link inválido.' : 'Invalid link.'}
            </p>
            <p style={{ fontSize: '0.9375rem', fontWeight: 300, color: inkSoft }}>
              {pt
                ? 'Se quiser cancelar, responda qualquer e-mail nosso com o assunto UNSUBSCRIBE.'
                : 'To unsubscribe, reply to any of our emails with the subject UNSUBSCRIBE.'}
            </p>
          </>
        )}
      </section>
    </main>
  );
};

/* ───────────────────────── Interesse ES ───────────────────────── */
export const DopSpanish = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  useSeo(
    'Direction Over Prompt · Edición en español · LolaLab',
    'La edición en español todavía está en preparación.',
    '/es/library/direction-over-prompt',
  );
  useEffect(() => track('dop_spanish_interest', { stage: 'view' }), []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || status === 'sending') return;
    setStatus('sending');
    try {
      const { error } = await supabase.functions.invoke('dop', {
        body: {
          action: 'subscribe',
          email,
          first_name: firstName || undefined,
          locale: 'es',
          locale_interest: 'es',
          source: 'dop_es_interest',
          consent_editorial: consent,
          website,
        },
      });
      if (error) throw error;
      setStatus('sent');
      track('dop_spanish_interest', { stage: 'submitted' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'hsl(var(--background))', color: ink }}>
      <DopHeader />
      <section className="px-6 md:px-12 pt-28 md:pt-40 pb-24 text-center">
        <span className="block mb-6" style={label}>
          DIRECTION OVER PROMPT
        </span>
        <h1
          className="mb-6"
          style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)', fontWeight: 400, color: ink }}
        >
          ¿Prefieres leerlo en español?
        </h1>
        <p className="mb-10" style={{ fontSize: '1rem', fontWeight: 300, color: inkSoft }}>
          La edición en español todavía está en preparación.
        </p>
        {status === 'sent' ? (
          <p style={{ fontFamily: serif, fontSize: '1.125rem', color: ink }}>
            Gracias. Te avisaremos cuando la edición esté lista.
          </p>
        ) : (
          <form onSubmit={submit} className="mx-auto max-w-[480px]">
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              aria-hidden="true"
              style={{ position: 'absolute', left: '-5000px', height: 0, width: 0, opacity: 0 }}
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@dominio.com"
              className="w-full py-3.5 px-5 mb-3 focus:outline-none"
              style={{
                backgroundColor: 'transparent',
                color: ink,
                border: '1px solid hsl(30 14% 15% / 0.25)',
                borderRadius: '9999px',
                fontSize: '0.9375rem',
                fontWeight: 300,
              }}
            />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Nombre (opcional)"
              className="w-full py-3.5 px-5 mb-5 focus:outline-none"
              style={{
                backgroundColor: 'transparent',
                color: ink,
                border: '1px solid hsl(30 14% 15% / 0.18)',
                borderRadius: '9999px',
                fontSize: '0.9375rem',
                fontWeight: 300,
              }}
            />
            <label
              className="flex items-start gap-3 mb-7 cursor-pointer text-left"
              style={{ fontSize: '0.8125rem', fontWeight: 300, lineHeight: 1.55, color: inkSoft }}
            >
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1"
                required
              />
              <span>
                Acepto recibir el aviso de disponibilidad y comunicaciones editoriales de
                Direction Over Prompt. Puedo cancelar en cualquier momento.
              </span>
            </label>
            <button
              type="submit"
              disabled={status === 'sending' || !consent}
              className="w-full py-4 transition-all duration-300 hover:opacity-85 disabled:opacity-40"
              style={{
                backgroundColor: ink,
                color: 'hsl(var(--background))',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              AVÍSAME CUANDO ESTÉ DISPONIBLE
            </button>
            {status === 'error' && (
              <p className="mt-3" style={{ fontSize: '0.8125rem', color: bronze }}>
                Algo falló — inténtalo de nuevo.
              </p>
            )}
          </form>
        )}
      </section>
    </main>
  );
};
