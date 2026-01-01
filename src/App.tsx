import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { lazy, Suspense } from "react";

// Lazy load pages for better performance
const Universities = lazy(() => import("./pages/Universities").then(m => ({ default: m.Universities })));
const UniversityDetail = lazy(() => import("./pages/UniversityDetail").then(m => ({ default: m.UniversityDetail })));
const Majors = lazy(() => import("./pages/Majors").then(m => ({ default: m.Majors })));
const News = lazy(() => import("./pages/News").then(m => ({ default: m.News })));
const NewsDetail = lazy(() => import("./pages/NewsDetail").then(m => ({ default: m.NewsDetail })));
const Profile = lazy(() => import("./pages/Profile").then(m => ({ default: m.Profile })));
const Auth = lazy(() => import("./pages/Auth").then(m => ({ default: m.Auth })));
const AdminLogin = lazy(() => import("./pages/AdminLogin").then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const AdminNews = lazy(() => import("./pages/AdminNews").then(m => ({ default: m.AdminNews })));
const AIChat = lazy(() => import("./pages/AIChat").then(m => ({ default: m.AIChat })));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">جاري التحميل...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Universities />} />
              <Route path="university/:id" element={<UniversityDetail />} />
              <Route path="majors" element={<Majors />} />
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<NewsDetail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="ai-chat" element={<AIChat />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/news" element={<AdminNews />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;