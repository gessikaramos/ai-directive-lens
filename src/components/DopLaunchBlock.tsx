/**
 * DopLaunchBlock · lançamento editorial do Capítulo 01 na Home (Wave DOP CH01).
 * Deve parecer um lançamento de publicação, não banner: fragmento REAL do
 * manuscrito em grande escala como prova material, tese, e um único CTA.
 */
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';
import { track } from '@/lib/analytics';

const label = {
  color: 'hsl(var(--bronze-soft))',
  fontSize: '0.7rem',
  fontWeight: 500,
  letterSpacing: '0.24em',
  textTransform: 'uppercase' as const,
};

export default function DopLaunchBlock() {
  const { lang } = useLanguage();
  const pt = lang === 'pt';

  return (
    <section
      className="px-6 md:px-12 py-24 md:py-36"
      style={{ backgroundColor: 'hsl(var(--ink))', borderTop: '1px solid #1C1C1E' }}
    >
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        {/* Coluna texto */}
        <div className="md:col-span-6">
          <span className="block mb-5" style={label}>
            {pt ? 'NOVO NA LOLALAB LIBRARY' : 'NEW FROM LOLALAB LIBRARY'}
          </span>
          <h2
            className="mb-2"
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              color: '#FFFFFF',
            }}
          >
            Direction Over Prompt
          </h2>
          <p className="mb-6" style={{ ...label, letterSpacing: '0.16em' }}>
            {pt
              ? 'Capítulo 01 · Quando tudo pode ser feito'
              : 'Chapter 01 · When Everything Can Be Made'}
          </p>
          <p
            className="mb-9 max-w-[46ch]"
            style={{
              fontFamily: "'Newsreader', Georgia, serif",
              fontSize: '1.25rem',
              fontWeight: 300,
              lineHeight: 1.55,
              color: 'hsl(var(--cool-gray-tertiary))',
            }}
          >
            {pt
              ? 'Quando criar se torna abundante, o julgamento se torna escasso.'
              : 'When creating becomes abundant, judgment becomes scarce.'}
          </p>
          <Link
            to="/library/direction-over-prompt"
            onClick={() => track('dop_home_block_click')}
            className="inline-block px-9 py-3.5 transition-all duration-300 hover:opacity-85 hover:scale-[1.02]"
            style={{
              backgroundColor: 'hsl(var(--bronze-soft))',
              color: 'hsl(var(--ink))',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {pt ? 'Ler o Capítulo 01 →' : 'Read Chapter 01 →'}
          </Link>
        </div>

        {/* Coluna prova material: página do manuscrito em fragmento tipográfico */}
        <div className="md:col-span-6">
          <div
            className="px-8 md:px-10 py-10 md:py-12"
            style={{
              backgroundColor: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              boxShadow: '18px 24px 60px rgba(0,0,0,0.5)',
              transform: 'rotate(0.4deg)',
            }}
          >
            <p
              className="mb-6"
              style={{
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'hsl(var(--foreground) / 0.45)',
              }}
            >
              {pt ? 'EDIÇÃO DE LEITURA · JULHO DE 2026' : 'READER EDITION · JULY 2026'}
            </p>
            <div
              style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontSize: '1.0625rem',
                fontWeight: 400,
                lineHeight: 1.8,
              }}
            >
              {pt ? (
                <>
                  <p className="mb-4">Ela aparece de novo.</p>
                  <p className="mb-4">
                    Uma mulher que nunca existiu, fotografada em um lugar que talvez
                    também não exista.
                  </p>
                  <p style={{ color: 'hsl(var(--foreground) / 0.55)' }}>
                    Nada está errado. É exatamente por isso que alguma coisa está
                    profundamente errada.
                  </p>
                </>
              ) : (
                <>
                  <p className="mb-4">She appears again.</p>
                  <p className="mb-4">
                    A woman who never existed, photographed in a place that may not exist
                    either.
                  </p>
                  <p style={{ color: 'hsl(var(--foreground) / 0.55)' }}>
                    Nothing is wrong. That is precisely why something is deeply wrong.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
