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
import Studio from "./pages/Studio.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lab" element={<Lab />} />
          {/* Wave 1 Foundations · canon Fred v1 · 4 rotas novas */}
          <Route path="/library" element={<Library />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Legacy redirect · invisível no menu · não remover sem confirmação Fred/Gé */}
          <Route path="/lolalab_hunter" element={<HunterRedirect />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
