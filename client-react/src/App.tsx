import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthUserRoute from "./routes/AuthUserRoute";
import { useUserStore } from "./stores/UserStore";
import { Suspense, createContext, lazy } from "react";
import { Spinner } from "./components/ui/shadcn-io/spinner";
import LoadingPage from "./components/loading/LoadingPage";
import Index from "./pages/Index";
import { LastConversationProvider } from "./context/LastUserChat";

const queryClient = new QueryClient();
// const Index = lazy(() => import("./pages/Index"));
const App = () => {
  const userStore = useUserStore();
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LastConversationProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <AuthUserRoute>
                    {/* <Suspense fallback={<LoadingPage />}> */}
                    <Index />
                    {/* </Suspense> */}
                  </AuthUserRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LastConversationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
