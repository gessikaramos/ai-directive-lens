/**
 * SelectedWorkSection · Wave 2.1 · canon Fred+Gé 7/jul
 *
 * Upgrade sobre Wave 1.1:
 *   - MasterChef ganha reveal cinematográfico do bloco (case-reveal · fade + translateY canon)
 *   - Tipografia agrandada · title editorial + spacing mais respiração
 *   - Pietra ganha FOTÃO editorial (campaign-bottega.jpg) acima do texto
 *   - Pietra hero parallax leve (data-anim="pietra-hero" já implementado no hook)
 *   - Disclaimer canon Fred mantido
 *
 * Regras respeitadas:
 *   - MasterChef iframe YouTube canon Wave 1.1 · NÃO trocado por poster frame
 *   - Confidential · retail tech client · Retailgrid Oy nunca aparece publicamente
 *   - Pietra usa asset existente · sem gerar novo · sem editar imagem · sem renomear
 *   - Sem bounce, sem glow, sem scroll hijacking · canon respeitado
 */
import { useLanguage } from '@/hooks/use-language';
import { t } from '@/lib/i18n';

const SelectedWorkSection = () => {
  const { lang } = useLanguage();

  return (
    <section id="selected" className="section-spacing px-6 md:px-12 lg:px-20 bg-background">
      <div className="max-w-[1200px] mx-auto">
        <span className="label-style block mb-16 md:mb-20">{t('selected.label', lang)}</span>

        {/* MasterChef · Wave 2.1 · reveal cinematográfico do bloco */}
        <article data-anim="case-reveal" className="mb-32 md:mb-40">
          <div className="aspect-video w-full bg-card mb-10 md:mb-12 overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/MlNSjBN3xbc?rel=0"
              title="MasterChef — LolaLab"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="max-w-[860px]">
            <span className="label-style block mb-5" style={{ color: 'hsl(var(--bronze))' }}>
              {t('selected.masterchef.tag', lang)}
            </span>
            <h3
              className="text-3xl md:text-5xl lg:text-6xl text-ink mb-4 tracking-tight leading-[1.05]"
              style={{ fontWeight: 500 }}
            >
              {t('selected.masterchef.title', lang)}
            </h3>
            <p className="label-style mb-6">{t('selected.masterchef.client', lang)}</p>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed mb-10">
              {t('selected.masterchef.desc', lang)}
            </p>
            {/* Ponte comercial · canon Fred */}
            <p className="text-base md:text-lg text-ink leading-relaxed border-t border-ink-soft/20 pt-8 italic" style={{ fontWeight: 300 }}>
              {t('selected.masterchef.bridge', lang)}
            </p>
          </div>
        </article>

        {/* PIETRA · Wave 2.1 · fotão editorial acima do texto */}
        <article data-anim="case-reveal">
          <div
            data-anim="pietra-hero"
            className="w-full mb-10 md:mb-12 overflow-hidden bg-card"
            style={{ aspectRatio: '16 / 9' }}
          >
            <div className="w-full h-full">
              <img
                src="/images/hollis/campaign/campaign-bottega.jpg"
                alt="PIETRA — editorial fashion collection · speculative luxury system"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-[860px]">
            <span className="label-style block mb-5" style={{ color: 'hsl(var(--bronze))' }}>
              {t('selected.pietra.tag', lang)}
            </span>
            <h3
              className="text-3xl md:text-5xl lg:text-6xl text-ink mb-6 tracking-tight leading-[1.05]"
              style={{ fontWeight: 500 }}
            >
              {t('selected.pietra.title', lang)}
            </h3>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed mb-8">
              {t('selected.pietra.desc', lang)}
            </p>
            <p className="text-xs text-ink-soft/70 italic leading-relaxed">
              {t('selected.pietra.legal', lang)}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default SelectedWorkSection;
