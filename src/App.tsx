import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Index from "./pages/Index";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminPages from "@/pages/admin/AdminPages";
import AdminPosts from "@/pages/admin/AdminPosts";
import AdminMedia from "@/pages/admin/AdminMedia";
import AdminMenus from "@/pages/admin/AdminMenus";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminLeads from "@/pages/admin/AdminLeads";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath ? <SmoothScroll /> : null}
      {!isAdminPath ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="posts" element={<AdminPosts />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="menus" element={<AdminMenus />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="leads" element={<AdminLeads />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminPath ? <Footer /> : null}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
