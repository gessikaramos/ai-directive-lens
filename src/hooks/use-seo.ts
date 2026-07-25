import { useEffect } from 'react';

/**
 * SEO por página (auditoria 14/jul).
 * Site é SPA client-side sem pre-render/SSR — isso é uma limitação conhecida:
 * bots que NÃO executam JS (a maioria dos unfurlers de link do WhatsApp,
 * iMessage, Slack) ainda vão ver só o HTML estático de index.html. Esse hook
 * resolve a parte que dá pra resolver em runtime: title, description, OG e
 * Twitter tags corretos para qualquer crawler ou navegação client-side que
 * execute JS (inclusive o Googlebot), e restaura os valores certos ao navegar
 * de volta para uma página já visitada (sem isso, tags customizadas de uma
 * página "vazavam" para a próxima via SPA routing).
 */

const SITE_URL = 'https://www.lolalabstudio.com';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.jpg`;
const DEFAULT_IMAGE_WIDTH = '1200';
const DEFAULT_IMAGE_HEIGHT = '630';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  lang?: string;
}

function setMetaContent(selector: string, content: string) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

// Páginas fora do DOP não têm URL própria por idioma (toggle client-side,
// mesma URL) — então não devem herdar os hreflang alternates estáticos do
// index.html (apontam pra homepage) nem os que a página DOP injeta via SPA
// routing. Cada rota é dona do seu próprio conjunto de alternates.
function clearHreflangAlternates() {
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
}

export function useSeo({ title, description, path, image, imageWidth, imageHeight, lang }: SeoOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const ogImage = image ?? DEFAULT_IMAGE;
    // largura/altura têm de acompanhar a imagem — se a página anterior
    // (ex: DOP) definiu uma capa em retrato, essas tags ficam "presas"
    // nesse valor via SPA routing a menos que sejam sempre reafirmadas aqui.
    const ogImageWidth = image ? (imageWidth ?? DEFAULT_IMAGE_WIDTH) : DEFAULT_IMAGE_WIDTH;
    const ogImageHeight = image ? (imageHeight ?? DEFAULT_IMAGE_HEIGHT) : DEFAULT_IMAGE_HEIGHT;

    document.title = title;
    if (lang) document.documentElement.lang = lang;

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[property="og:image"]', ogImage);
    setMetaContent('meta[property="og:image:width"]', ogImageWidth);
    setMetaContent('meta[property="og:image:height"]', ogImageHeight);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:image"]', ogImage);

    setCanonical(url);
    clearHreflangAlternates();
    window.scrollTo(0, 0);
  }, [title, description, path, image, imageWidth, imageHeight, lang]);
}
