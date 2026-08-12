/**
 * StudioSkills · o "What we do" do site antigo, de volta ao Studio (canon Gé 10/jul).
 * As 8 disciplinas com os conteúdos ricos originais (SkillModalContents):
 * Character, Fashion, Costume, Video, UGC, Soundtrack (player), Voice, Atelier.
 * Tiles dark editoriais; cada uma abre a página dedicada /studio/:slug.
 *
 * 8/ago (v2): os tiles paravam de abrir modal em overlay e passam a navegar
 * de verdade pra /studio/:slug — precisava dar pra compartilhar a URL de uma
 * disciplina específica (LinkedIn etc.) e cair direto no conteúdo certo, sem
 * depender do JS montar um modal depois do hash carregar. SkillModal saiu
 * do fluxo daqui (segue vivo em SkillsSection.tsx, na home, intocado). O
 * redirect de links antigos #skill/<slug> → /studio/<slug> mora em
 * Studio.tsx, fora deste arquivo.
 */
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STUDIO_SKILLS as SKILLS } from '@/data/studioSkills';

const StudioSkills = () => {
  return (
    <section className="px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
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
          What We Make
        </span>

        <p
          className="mb-10 md:mb-14 italic"
          style={{
            color: 'hsl(var(--cool-gray-secondary))',
            fontSize: '0.875rem',
            fontWeight: 300,
          }}
        >
          Each discipline opens into work, capabilities and gallery. Click to explore.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ borderTop: '1px solid #1C1C1E' }}>
          {SKILLS.map((s, i) => (
            <Link
              key={s.slug}
              to={`/studio/${s.slug}`}
              className="group text-left relative block w-full h-full p-8 md:p-12 min-h-[220px] flex flex-col justify-between transition-transform duration-300 ease-out hover:-translate-y-0.5"
              style={{
                borderBottom: '1px solid #1C1C1E',
                borderRight: i % 2 === 0 ? '1px solid #1C1C1E' : 'none',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#1C1C1E'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
              aria-label={`Open ${s.title} details`}
            >
              <span
                className="absolute top-6 right-6 opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: '#FFFFFF' }}
                aria-hidden="true"
              >
                <ArrowUpRight strokeWidth={1.5} className="w-5 h-5" />
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
                  className="mb-3 group-hover:underline"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.4vw, 2.125rem)',
                    fontWeight: 400,
                    letterSpacing: '-0.022em',
                    lineHeight: 1.08,
                    color: '#FFFFFF',
                    textUnderlineOffset: '4px',
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
              <span
                className="absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  color: 'hsl(var(--bronze-soft))',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
                aria-hidden="true"
              >
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudioSkills;
