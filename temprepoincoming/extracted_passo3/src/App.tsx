import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreativeLab } from "@/pages/creative-lab";
import { AgentFactory } from "@/pages/agents/factory";
import { AiTraining } from "@/pages/ai-training";
import { LiveLogTerminalPage } from "@/pages/agents/logs";

export function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/creative-lab" replace />} />
          <Route path="/creative-lab" element={<CreativeLab />} />
          <Route path="/agents/factory" element={<AgentFactory />} />
          <Route path="/agents/logs" element={<LiveLogTerminalPage />} />
          <Route path="/ai-training" element={<AiTraining />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
