/**
 * Camada mínima de analytics (Wave DOP CH01).
 * Auditoria 11/jul: index.html tem preconnect ao googletagmanager, mas nenhum
 * container GTM/GA instalado no runtime. Regra da Wave: NÃO instalar plataforma
 * nova sem aprovação. Estratégia: empurrar para window.dataLayer quando existir;
 * caso contrário, buffer local + console.debug (QA-visível, zero rede).
 */
type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    __lolalabEvents?: Array<{ event: string; props?: EventProps; at: string }>;
  }
}

export function track(event: string, props?: EventProps) {
  try {
    const payload = { event, ...props };
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(payload);
    }
    (window.__lolalabEvents ??= []).push({ event, props, at: new Date().toISOString() });
    if (import.meta.env.DEV) console.debug('[track]', event, props ?? {});
  } catch {
    /* analytics nunca quebra a página */
  }
}
