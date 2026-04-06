import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import StudioLayout from "@/components/studio/StudioLayout";
import StudioHome from "@/pages/StudioHome";
import AIToolkit from "@/pages/AIToolkit";
import StockCatalog from "@/pages/StockCatalog";
import LolaPage from "@/pages/LolaPage";
import Gallery from "@/pages/Gallery";
import HunterRedirect from "@/pages/HunterRedirect";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<StudioLayout />}>
            <Route path="/" element={<StudioHome />} />
            <Route path="/toolkit" element={<AIToolkit />} />
            <Route path="/stock" element={<StockCatalog />} />
            <Route path="/lola" element={<LolaPage />} />
            <Route path="/gallery" element={<Gallery />} />
          </Route>
          <Route path="/lolalab_hunter" element={<HunterRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
