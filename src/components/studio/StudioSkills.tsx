/**
 * StudioSkills · o "What we do" do site antigo, de volta ao Studio (canon Gé 10/jul).
 * As 8 disciplinas com os conteúdos ricos originais (SkillModalContents):
 * Character, Fashion, Costume, Video, UGC, Soundtrack (player), Voice, Atelier.
 * Tiles dark editoriais; o modal abre em cream — inversão A24 proposital.
 */
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkillModal from '@/components/SkillModal';
import { STUDIO_SKILLS as SKILLS } from '@/data/studioSkills';

const StudioSkills = () => {
  const [active, setActive] = useState<string | null>(null);
  const current = SKILLS.find((s) => s.slug === active);

  /**
   * Deep-link support (canon Cláudio 8/ago):
   *   - Ao carregar /studio#skill/<slug>, abrir modal correspondente automaticamente.
   *   - Reagir a hashchange (browser back/forward, links internos, share).
   *   - Slug inválido/vazio ⇒ fecha o modal.
   * O modal já faz pushState('#skill/<slug>') ao abrir e replaceState(limpo) ao
   * fechar; este efeito completa o loop lendo o hash inicial e ouvindo mudanças.
   */
  useEffect(() => {
    const openFromHash = () => {
      const h = window.location.hash;
      if (h.startsWith('#skill/')) {
        const slug = h.slice('#skill/'.length);
        if (SKILLS.some((s) => s.slug === slug)) {
          setActive(slug);
          return;
        }
      }
      setActive(null);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return (
    <section className="px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <span
          className="block mb-10 md:mb-14"
          style={{
            color: 'hsl(var(--bronze-soft))',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
          }}
        >
          What We Make
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: '1px solid #1C1C1E' }}>
          {SKILLS.map((s, i) => (
            <div
              key={s.slug}
              className="relative"
              style={{
                borderBottom: '1px solid #1C1C1E',
                borderRight: i % 2 === 0 ? '1px solid #1C1C1E' : 'none',
              }}
            >
            {/* Link real (sr-only) pra rota dedicada /studio/<slug> — 8/ago,
                pro Google/crawlers acharem a página mesmo com o clique
                principal continuando a abrir o modal, não navegar. */}
            <Link to={`/studio/${s.slug}`} className="sr-only">
              {s.title} — full page
            </Link>
            <button
              type="button"
              onClick={() => setActive(s.slug)}
              className="group text-left relative w-full h-full p-8 md:p-12 min-h-[220px] flex flex-col justify-between transition-colors duration-500 cursor-pointer"
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#121214'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
              aria-label={`Open ${s.title} details`}
            >
              <span
                className="absolute top-6 right-6 opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: 'hsl(var(--bronze-soft))' }}
                aria-hidden="true"
              >
                <ArrowUpRight strokeWidth={1.5} className="w-4 h-4 md:w-5 md:h-5" />
              </span>
              <span
                className="block mb-6"
                style={{
                  color: 'hsl(var(--bronze-soft))',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                {/* Composition Pass: o NOME lidera a leitura por varredura;
                    a descrição apoia em voz mais baixa (taxonomia editorial,
                    não tabela técnica). */}
                <h3
                  className="mb-3"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.4vw, 2.125rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.022em',
                    lineHeight: 1.08,
                    color: '#FFFFFF',
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="max-w-[40ch]"
                  style={{
                    fontSize: '0.875rem',
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: 'hsl(var(--cool-gray-secondary))',
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </button>
            </div>
          ))}
        </div>
      </div>

      <SkillModal open={active !== null} skillSlug={active ?? ''} onClose={() => setActive(null)}>
        {current && (
          <>
            {current.content}
            {/* 8/ago: link pra página dedicada — SkillModal.tsx fica intocado,
                então isso entra aqui via children mesmo. */}
            <div className="mt-8 pt-8 border-t border-border text-right">
              <Link
                to={`/studio/${current.slug}`}
                className="inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 text-sm font-medium"
                style={{ color: 'hsl(28 35% 45%)' }}
              >
                Open full page <span aria-hidden="true">→</span>
              </Link>
            </div>
          </>
        )}
      </SkillModal>
    </section>
  );
};

export default StudioSkills;
