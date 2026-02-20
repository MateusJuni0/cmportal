import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Hero3D } from "@/modules/VisualTrust/Hero3D";

// Core
import { Dashboard } from "@/pages/dashboard/DashboardPage";
import { AgentFactory } from "@/pages/agents/factory/AgentFactoryPage";
import { LiveLogTerminalPage } from "@/pages/agents/logs/LogsPage";
import { CreativeLab } from "@/pages/creative-lab/CreativeLabPage";
import { AuthPage } from "@/pages/auth/AuthPage";

// Innovation
import { AgentWarfare } from "@/pages/innovation/AgentWarfare";
import { GrowthEngines } from "@/pages/innovation/GrowthEngines";
import { MarketIntelligence } from "@/pages/innovation/MarketIntelligence";

// Nexus
import { AIBoardroom } from "@/pages/nexus/AIBoardroom";
import { OmniscienceGrid } from "@/pages/nexus/OmniscienceGrid";
import { QuantumTreasury } from "@/pages/nexus/QuantumTreasury";

// Systems
import { VisualSiteEditor } from "@/pages/cms/CMSPage";
import { LandingPageBuilder } from "@/pages/lp-builder/LPBuilderPage";
import { AiTraining } from "@/pages/ai-training/AITrainingPage";
import { SceneCustomizer } from "@/pages/settings/3d-customizer/ThreeDPage";
import { GitSyncTool } from "@/pages/settings/git-sync/GitSyncPage";

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
        <Route path="/lp-builder" element={<AppLayout><LandingPageBuilder /></AppLayout>} />
        <Route path="/ai-training" element={<AppLayout><AiTraining /></AppLayout>} />
        <Route path="/settings/3d-customizer" element={<AppLayout><SceneCustomizer /></AppLayout>} />
        <Route path="/settings/git-sync" element={<AppLayout><GitSyncTool /></AppLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
