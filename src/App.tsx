import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { AuthProvider } from "./hooks/use-auth";

// Code-split por rota (24/jul, achado do QA em browser: bundle único de
// 834KB sem divisão nenhuma — toda visita, mesmo em /legal, baixava o JS de
// todas as páginas). Cada import() vira seu próprio chunk carregado sob
// demanda; as 6 rotas DOP compartilham um chunk só (mesmo módulo de origem).
const Index = lazy(() => import("./pages/Index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const HunterRedirect = lazy(() => import("./pages/HunterRedirect.tsx"));
const Lab = lazy(() => import("./pages/Lab.tsx"));
const Library = lazy(() => import("./pages/Library.tsx"));
const LibraryAccess = lazy(() => import("./pages/LibraryAccess.tsx"));
const LibraryThankYou = lazy(() => import("./pages/LibraryThankYou.tsx"));
const Studio = lazy(() => import("./pages/Studio.tsx"));
const StudioSkill = lazy(() => import("./pages/StudioSkill.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Legal = lazy(() => import("./pages/Legal.tsx"));
const Auth = lazy(() => import("./pages/Auth.tsx"));
const Collective = lazy(() => import("./pages/Collective.tsx"));
const DopNeutral = lazy(() =>
  import("./pages/dop/DirectionOverPrompt.tsx").then((m) => ({ default: m.DopNeutral })),
);
const DopLanding = lazy(() =>
  import("./pages/dop/DirectionOverPrompt.tsx").then((m) => ({ default: m.DopLanding })),
);
const DopRead = lazy(() =>
  import("./pages/dop/DirectionOverPrompt.tsx").then((m) => ({ default: m.DopRead })),
);
const DopConfirmed = lazy(() =>
  import("./pages/dop/DirectionOverPrompt.tsx").then((m) => ({ default: m.DopConfirmed })),
);
const DopSpanish = lazy(() =>
  import("./pages/dop/DirectionOverPrompt.tsx").then((m) => ({ default: m.DopSpanish })),
);
const DopUnsubscribe = lazy(() =>
  import("./pages/dop/DirectionOverPrompt.tsx").then((m) => ({ default: m.DopUnsubscribe })),
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/collective" element={<Collective />} />
            {/* Legacy: página se chamava "Signal" antes de 13/jul, alias pra não quebrar links antigos */}
            <Route path="/signal" element={<Collective />} />
            {/* Direction Over Prompt · Wave DOP CH01 */}
            {/* 24/jul: página neutra removida do funil (redirect direto pra
                /library, que já tem os botões PT/EN inline desde 1e36fb5).
                DopNeutral fica importado sem rota, pra rollback fácil. */}
            <Route path="/library/direction-over-prompt" element={<Navigate to="/library" replace />} />
            <Route path="/pt-br/library/direction-over-prompt" element={<DopLanding loc="pt-BR" />} />
            <Route path="/en/library/direction-over-prompt" element={<DopLanding loc="en" />} />
            <Route path="/pt-br/library/direction-over-prompt/read" element={<DopRead loc="pt-BR" />} />
            <Route path="/en/library/direction-over-prompt/read" element={<DopRead loc="en" />} />
            <Route path="/pt-br/library/direction-over-prompt/confirmed" element={<DopConfirmed loc="pt-BR" />} />
            <Route path="/en/library/direction-over-prompt/confirmed" element={<DopConfirmed loc="en" />} />
            <Route path="/es/library/direction-over-prompt" element={<DopSpanish />} />
            <Route path="/pt-br/library/direction-over-prompt/unsubscribe" element={<DopUnsubscribe loc="pt-BR" />} />
            <Route path="/en/library/direction-over-prompt/unsubscribe" element={<DopUnsubscribe loc="en" />} />
            {/* Wave 1 Foundations · canon Fred v1 · 4 rotas novas */}
            <Route path="/library" element={<Library />} />
            <Route path="/library/access" element={<LibraryAccess />} />
            <Route path="/library/thank-you" element={<LibraryThankYou />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/studio/:slug" element={<StudioSkill />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            {/* Legacy redirect · invisível no menu · não remover sem confirmação Fred/Gé */}
            <Route path="/lolalab_hunter" element={<HunterRedirect />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
