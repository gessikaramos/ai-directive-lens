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

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
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

export function useSeo({ title, description, path, image, lang }: SeoOptions) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const ogImage = image ?? DEFAULT_IMAGE;

    document.title = title;
    if (lang) document.documentElement.lang = lang;

    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[property="og:image"]', ogImage);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);
    setMetaContent('meta[name="twitter:image"]', ogImage);

    setCanonical(url);
    window.scrollTo(0, 0);
  }, [title, description, path, image, lang]);
}
