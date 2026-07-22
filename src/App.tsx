import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import HunterRedirect from "./pages/HunterRedirect.tsx";
import Lab from "./pages/Lab.tsx";
import Library from "./pages/Library.tsx";
import LibraryAccess from "./pages/LibraryAccess.tsx";
import LibraryThankYou from "./pages/LibraryThankYou.tsx";
import Studio from "./pages/Studio.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Legal from "./pages/Legal.tsx";
import Auth from "./pages/Auth.tsx";
import Collective from "./pages/Collective.tsx";
import {
  DopNeutral,
  DopLanding,
  DopRead,
  DopConfirmed,
  DopSpanish,
  DopUnsubscribe,
} from "./pages/dop/DirectionOverPrompt.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { AuthProvider } from "./hooks/use-auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/collective" element={<Collective />} />
            {/* Legacy: página se chamava "Signal" antes de 13/jul, alias pra não quebrar links antigos */}
            <Route path="/signal" element={<Collective />} />
            {/* Direction Over Prompt · Wave DOP CH01 */}
            <Route path="/library/direction-over-prompt" element={<DopNeutral />} />
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
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            {/* Legacy redirect · invisível no menu · não remover sem confirmação Fred/Gé */}
            <Route path="/lolalab_hunter" element={<HunterRedirect />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
