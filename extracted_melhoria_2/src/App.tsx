import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { CreativeLab } from "@/pages/creative-lab";
import { AgentFactory } from "@/pages/agents/factory";
import { AiTraining } from "@/pages/ai-training";
import { LiveLogTerminalPage } from "@/pages/agents/logs";
import { VisualSiteEditor } from "@/pages/cms";
import { LandingPageBuilder } from "@/pages/lp-builder";
import { SceneCustomizer } from "@/pages/settings/3d-customizer";
import { GitSyncTool } from "@/pages/settings/git-sync";
import { MarketIntelligence } from "@/pages/innovation/MarketIntelligence";
import { AgentWarfare } from "@/pages/innovation/AgentWarfare";
import { GrowthEngines } from "@/pages/innovation/GrowthEngines";
import { OmniscienceGrid } from "@/pages/nexus/OmniscienceGrid";
import { AIBoardroom } from "@/pages/nexus/AIBoardroom";
import { QuantumTreasury } from "@/pages/nexus/QuantumTreasury";

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
          <Route path="/cms" element={<VisualSiteEditor />} />
          <Route path="/lp-builder" element={<LandingPageBuilder />} />
          <Route path="/settings/3d-customizer" element={<SceneCustomizer />} />
          <Route path="/settings/git-sync" element={<GitSyncTool />} />
          <Route path="/innovation/market" element={<MarketIntelligence />} />
          <Route path="/innovation/warfare" element={<AgentWarfare />} />
          <Route path="/innovation/growth" element={<GrowthEngines />} />
          <Route path="/nexus/omniscience" element={<OmniscienceGrid />} />
          <Route path="/nexus/boardroom" element={<AIBoardroom />} />
          <Route path="/nexus/treasury" element={<QuantumTreasury />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
