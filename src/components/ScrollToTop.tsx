/**
 * ScrollToTop · Wave 3.2 Batch 2 · fix Gé QA 8/jul
 * React Router SPA não scrolla ao topo na navegação entre rotas.
 * Este componente escuta pathname e força scroll(0,0) instantâneo.
 * Só afeta mudança de rota — hash anchors continuam funcionando.
 */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return; // preserva anchor jumps
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}
