import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout.tsx";
import { Hero3D } from "./modules/VisualTrust/Hero3D.tsx";

// Pages
import { Dashboard } from "./pages/dashboard/index.tsx";
import { AgentFactory } from "./pages/agents/factory/index.tsx";
import { LiveLogTerminalPage } from "./pages/agents/logs/LogsPage.tsx";
import { CreativeLab } from "./pages/creative-lab/index.tsx";
import { AuthPage } from "./pages/auth/index.tsx";

// Innovation
import { AgentWarfare } from "./pages/innovation/AgentWarfare.tsx";
import { GrowthEngines } from "./pages/innovation/GrowthEngines.tsx";
import { MarketIntelligence } from "./pages/innovation/MarketIntelligence.tsx";

// Nexus
import { AIBoardroom } from "./pages/nexus/AIBoardroom.tsx";
import { OmniscienceGrid } from "./pages/nexus/OmniscienceGrid.tsx";
import { QuantumTreasury } from "./pages/nexus/QuantumTreasury.tsx";

// Systems
import { VisualSiteEditor } from "./pages/cms/index.tsx";
import { LPBuilder } from "./pages/lp-builder/index.tsx";
import { AITraining } from "./pages/ai-training/index.tsx";
import { SceneCustomizer } from "./pages/settings/3d-customizer/index.tsx";
import { GitSyncTool } from "./pages/settings/git-sync/index.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero3D />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/agents/factory" element={<AppLayout><AgentFactory /></AppLayout>} />
        <Route path="/agents/logs" element={<AppLayout><LiveLogTerminalPage /></AppLayout>} />
        <Route path="/innovation/warfare" element={<AppLayout><AgentWarfare /></AppLayout>} />
        <Route path="/innovation/growth" element={<AppLayout><GrowthEngines /></AppLayout>} />
        <Route path="/innovation/market" element={<AppLayout><MarketIntelligence /></AppLayout>} />
        <Route path="/nexus/boardroom" element={<AppLayout><AIBoardroom /></AppLayout>} />
        <Route path="/nexus/omniscience" element={<AppLayout><OmniscienceGrid /></AppLayout>} />
        <Route path="/nexus/treasury" element={<AppLayout><QuantumTreasury /></AppLayout>} />
        <Route path="/creative" element={<AppLayout><CreativeLab /></AppLayout>} />
        <Route path="/cms" element={<AppLayout><VisualSiteEditor /></AppLayout>} />
        <Route path="/lp-builder" element={<AppLayout><LPBuilder /></AppLayout>} />
        <Route path="/ai-training" element={<AppLayout><AITraining /></AppLayout>} />
        <Route path="/settings/3d-customizer" element={<AppLayout><SceneCustomizer /></AppLayout>} />
        <Route path="/settings/git-sync" element={<AppLayout><GitSyncTool /></AppLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
