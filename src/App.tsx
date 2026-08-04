import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import PoliticaCookies from "./pages/PoliticaCookies";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import MentoriaLogin from "./pages/MentoriaLogin";
import MentoriaDashboard from "./pages/MentoriaDashboard";
import MentoriaAdmin from "./pages/MentoriaAdmin";
import MentoriaSetPassword from "./pages/MentoriaSetPassword";
import QuemSomos from "./pages/QuemSomos";
import Cursos from "./pages/Cursos";
import ServicosPage from "./pages/Servicos";
import DepoimentosPage from "./pages/Depoimentos";
import ContatoPage from "./pages/Contato";
import NotFound from "./pages/NotFound";
import StyleGuide from "./pages/StyleGuide";
import RouteSeo from "./components/RouteSeo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteSeo />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/servicos" element={<ServicosPage />} />
          <Route path="/depoimentos" element={<DepoimentosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/politica-de-cookies" element={<PoliticaCookies />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin/update-password" element={<UpdatePassword />} />
          <Route path="/mentoria/login" element={<MentoriaLogin />} />
          <Route path="/mentoria/admin" element={<MentoriaAdmin />} />
          <Route path="/mentoria/set-password" element={<MentoriaSetPassword />} />
          <Route path="/mentoria" element={<MentoriaDashboard />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
