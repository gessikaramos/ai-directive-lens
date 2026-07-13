/**
 * Feature flags · DOP CH01 Launch Wave.
 * PUBLIC_WALTER_ENABLED: quando false (default nesta branch), NENHUMA interface
 * pública abre chat, chama hit_chat, oferece login à sala ou promete créditos.
 * Produção (main) não contém este código até o merge autorizado.
 */
export const PUBLIC_WALTER_ENABLED =
  import.meta.env.VITE_PUBLIC_WALTER_ENABLED === 'true';

/**
 * WALTER_WAITLIST_ENABLED: lista de abertura específica do Walter (consentimento
 * próprio, separado do editorial de Direction Over Prompt). Default false —
 * só ativa após live QA do Resend + prova de persistência no banco (canon Gé
 * 11/jul "FINAL CONTENT + CONVERSION PATCH"). Componente existe no código,
 * mas fica invisível até a flag virar true.
 */
export const WALTER_WAITLIST_ENABLED =
  import.meta.env.VITE_WALTER_WAITLIST_ENABLED === 'true';

/**
 * DOP_PDF_DOWNLOAD_ENABLED: o PDF atual foi reprovado visualmente pela Gé
 * (CANDIDATE ONLY). Default false — enquanto false, nenhuma interface pública
 * oferece ou menciona o download; READ ONLINE continua disponível. Ativa
 * apenas quando ela entregar e aprovar o arquivo final (canon 11/jul
 * "COMPLETE ALL REMAINING RELEASE WORK").
 */
export const DOP_PDF_DOWNLOAD_ENABLED =
  import.meta.env.VITE_DOP_PDF_DOWNLOAD_ENABLED === 'true';

/**
 * LIBRARY_CHECKOUT_ENABLED: checkout real (Stripe) para os Compendiums.
 * Default false — Library.tsx documenta a spec desta wave como "SEM loja,
 * SEM preços, SEM pré-venda" (DOP CH01 é o único lançamento ativo). Esta
 * flag existe pra quando a Gé decidir abrir a venda dos livros como uma
 * wave própria; até lá, Compendiums.tsx continua no modo reserva por e-mail
 * mesmo com o backend de checkout já pronto.
 */
export const LIBRARY_CHECKOUT_ENABLED =
  import.meta.env.VITE_LIBRARY_CHECKOUT_ENABLED === 'true';
