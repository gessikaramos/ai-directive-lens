/**
 * Camada mínima de analytics (Wave DOP CH01).
 * Auditoria 14/jul: GA4 (gtag.js, G-PYNR9F0L5L) está instalado em index.html.
 * gtag.js só processa eventos disparados via window.gtag('event', ...) — pushes
 * genéricos de {event, ...} no dataLayer são convenção do Google Tag Manager,
 * que não está instalado aqui, então ficavam mudos. Envia pelo gtag quando
 * existe; sempre mantém o buffer local + console.debug (QA-visível).
 */
type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    __lolalabEvents?: Array<{ event: string; props?: EventProps; at: string }>;
  }
}

export function track(event: string, props?: EventProps) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, props ?? {});
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props });
    }
    (window.__lolalabEvents ??= []).push({ event, props, at: new Date().toISOString() });
    if (import.meta.env.DEV) console.debug('[track]', event, props ?? {});
  } catch {
    /* analytics nunca quebra a página */
  }
}
