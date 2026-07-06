/**
 * StatementSection · Wave 1.1 · canon Fred+Gé 6/jul
 *
 * Escolha Q2 = C: statement pequeno integrado, sem protagonismo.
 * Reforça a tese sem competir com o Hero.
 *
 * Regras:
 *   - Sem parallax gigante (data-anim removido)
 *   - Sem section dominante · py reduzido
 *   - Texto em uma linha editorial única, não 2 blocos grandes
 *   - Sem animação nova
 *   - Serve de ponte suave entre Hero e Choose your path
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

export default function StatementSection() {
  const { lang } = useLanguage();

  return (
    <section className="px-6 md:px-12 py-16 md:py-20 bg-background border-b border-ink/5">
      <div className="max-w-[820px] mx-auto text-center">
        <p
          className="text-base md:text-lg leading-relaxed"
          style={{ fontWeight: 400, color: 'hsl(30 25% 10%)' }}
        >
          {t('statement.line1', lang)} {t('statement.line2', lang)}
        </p>
      </div>
    </section>
  );
}
