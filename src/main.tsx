import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 24/jul: achado em produção — deploy trocou os hashes dos chunks de rota
// (code-splitting) enquanto uma aba já tinha o index.html antigo em cache,
// e o lazy import da página quebrou com "Failed to fetch dynamically
// imported module" (tela em branco). Isso vai acontecer de novo a cada
// deploy pra quem já estava com o site aberto — a correção é recarregar
// uma vez pra pegar o index.html novo. Guarda por sessionStorage pra não
// entrar em loop se o erro for outra coisa (chunk genuinamente quebrado).
const RELOAD_FLAG = 'lolalab_chunk_reload';
function reloadOnceForStaleChunk() {
  if (sessionStorage.getItem(RELOAD_FLAG)) return;
  sessionStorage.setItem(RELOAD_FLAG, '1');
  window.location.reload();
}
window.addEventListener('vite:preloadError', reloadOnceForStaleChunk);
window.addEventListener('error', (e) => {
  if (/Failed to fetch dynamically imported module/i.test(e.message || '')) {
    reloadOnceForStaleChunk();
  }
});
window.addEventListener('unhandledrejection', (e) => {
  const msg = e.reason?.message || String(e.reason || '');
  if (/Failed to fetch dynamically imported module|error loading dynamically imported module/i.test(msg)) {
    reloadOnceForStaleChunk();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
