import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LiveGamePage from "./pages/LiveGamePage";
import LearnPage from "./pages/LearnPage";
import NotFound from "./pages/NotFound";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ChatbotPage from "./pages/ChatbotPage";
import GameAnalysisPage from "./pages/GameAnalysisPage";
import GameCommentaryPage from "./pages/GameCommentaryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/play" element={<LiveGamePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/game-analysis" element={<GameAnalysisPage />} />
          <Route path="/game-commentary" element={<GameCommentaryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
