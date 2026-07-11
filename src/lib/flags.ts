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
