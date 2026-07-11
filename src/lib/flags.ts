/**
 * Feature flags · DOP CH01 Launch Wave.
 * PUBLIC_WALTER_ENABLED: quando false (default nesta branch), NENHUMA interface
 * pública abre chat, chama hit_chat, oferece login à sala ou promete créditos.
 * Produção (main) não contém este código até o merge autorizado.
 */
export const PUBLIC_WALTER_ENABLED =
  import.meta.env.VITE_PUBLIC_WALTER_ENABLED === 'true';
