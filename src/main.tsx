import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 24/jul: achado em produção — deploy trocou os hashes dos chunks de rota
// (code-splitting) enquanto uma aba já tinha o index.html antigo em cache,
// e o lazy import da página quebrou com "Failed to fetch dynamically
// imported module" (tela em branco).
//
// 8/ago: fortalecido — o guard sessionStorage antigo só permitia 1 reload
// por sessão. Se o primeiro reload não resolvia (deploy ainda em progresso
// ou edge cache atrasado), o usuário ficava com tela branca para sempre.
// Agora: (1) permite até 3 tentativas com back-off, (2) se todas falharem,
// mostra UI de fallback simples com botão "Try again" em vez de branco.

const RELOAD_KEY = 'lolalab_chunk_reload_count';
const MAX_RELOADS = 3;
const isChunkError = (msg?: string) =>
  !!msg && /Failed to fetch dynamically imported module|error loading dynamically imported module|Loading chunk .* failed/i.test(msg);

function attemptRecoveryOrShowFallback() {
  const count = Number(sessionStorage.getItem(RELOAD_KEY) || '0');
  if (count < MAX_RELOADS) {
    sessionStorage.setItem(RELOAD_KEY, String(count + 1));
    // small back-off gives Cloudflare edge / deploy a chance to settle
    setTimeout(() => window.location.reload(), 400 * (count + 1));
    return;
  }
  // All retries exhausted — show a minimal fallback so the page is not blank.
  const root = document.getElementById('root');
  if (root && root.innerHTML.trim().length < 50) {
    root.innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:Georgia,serif;background:hsl(30 30% 96%);color:hsl(30 14% 15%);text-align:center">
        <div style="max-width:420px">
          <p style="font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:hsl(28 35% 45%);margin:0 0 16px">LolaLab</p>
          <h1 style="font-size:24px;font-weight:400;margin:0 0 12px;line-height:1.2">Something didn't load.</h1>
          <p style="font-size:14px;line-height:1.6;color:hsl(30 10% 38%);margin:0 0 24px">This can happen right after a site update. Please refresh — the newer version usually loads on the next try.</p>
          <button onclick="sessionStorage.removeItem('${RELOAD_KEY}');location.reload()" style="padding:12px 24px;border-radius:9999px;background:hsl(30 14% 15%);color:hsl(30 30% 96%);border:none;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;cursor:pointer">Try again</button>
        </div>
      </div>`;
  }
}

window.addEventListener('vite:preloadError', attemptRecoveryOrShowFallback);
window.addEventListener('error', (e) => {
  if (isChunkError(e.message)) attemptRecoveryOrShowFallback();
});
window.addEventListener('unhandledrejection', (e) => {
  const msg = e.reason?.message || String(e.reason || '');
  if (isChunkError(msg)) attemptRecoveryOrShowFallback();
});

// Successful navigation resets the reload counter so a legit user session
// isn't penalized by an old count from days ago.
window.addEventListener('load', () => {
  setTimeout(() => sessionStorage.removeItem(RELOAD_KEY), 2000);
});

createRoot(document.getElementById("root")!).render(<App />);
