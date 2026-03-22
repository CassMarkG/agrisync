import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/AppLayout";
import ConsumerLayout from "./components/ConsumerLayout";
import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import CropDetail from "./pages/CropDetail";
import Recommendations from "./pages/Recommendations";
import Forecasts from "./pages/Forecasts";
import SettingsPage from "./pages/SettingsPage";
import Marketplace from "./pages/Marketplace";
import MarketplaceCropDetail from "./pages/MarketplaceCropDetail";
import PriceTrends from "./pages/PriceTrends";
import MyInterests from "./pages/MyInterests";
import Register from "./pages/Register";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Platform routes with sidebar layout */}
          <Route element={<AppLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/crops/:cropName" element={<CropDetail />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/forecasts" element={<Forecasts />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          {/* Consumer marketplace routes */}
          <Route element={<ConsumerLayout />}>
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:cropName" element={<MarketplaceCropDetail />} />
            <Route path="/marketplace/trends" element={<PriceTrends />} />
            <Route path="/marketplace/my-interests" element={<MyInterests />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
