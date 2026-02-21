import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Hero3D } from "./modules/VisualTrust/Hero3D";

// Core
import { Dashboard } from "./pages/dashboard/DashboardPage";
import { AgentFactory } from "./pages/agents/factory/AgentFactoryPage";
import { LiveLogTerminalPage } from "./pages/agents/logs/LogsPage";
import { CreativeLab } from "./pages/creative-lab/CreativeLabPage";
import { AuthPage } from "./pages/auth/AuthPage";

// Innovation
import { AgentWarfare } from "./pages/innovation/AgentWarfare";
import { GrowthEngines } from "./pages/innovation/GrowthEngines";
import { MarketIntelligence } from "./pages/innovation/MarketIntelligence";

// Nexus
import { AIBoardroom } from "./pages/nexus/AIBoardroom";
import { OmniscienceGrid } from "./pages/nexus/OmniscienceGrid";
import { QuantumTreasury } from "./pages/nexus/QuantumTreasury";

// Systems
import { VisualSiteEditor } from "./pages/cms/CMSPage";
import { LandingPageBuilder } from "./pages/lp-builder/LPBuilderPage";
import { AiTraining } from "./pages/ai-training/AITrainingPage";
import { SceneCustomizer } from "./pages/settings/3d-customizer/ThreeDPage";
import { GitSyncTool } from "./pages/settings/git-sync/GitSyncPage";

// Data Management
import { LeadsPage } from "./pages/data-management/LeadsPage";
import { ClientsPage } from "./pages/data-management/ClientsPage";
import { FinancialPage } from "./pages/data-management/FinancialPage";
import { WhatsAppPage } from "./pages/data-management/WhatsAppPage";

// Premium (Minimax)
import { LeadsDashboardPremium } from "./pages/dashboard/premium/LeadsDashboardPremium";
import { ClientsDashboardPremium } from "./pages/dashboard/premium/ClientsDashboardPremium";
import { FinancialDashboardPremium } from "./pages/dashboard/premium/FinancialDashboardPremium";
import { WhatsAppDashboardPremium } from "./pages/dashboard/premium/WhatsAppDashboardPremium";
import { AgentsDashboardPremium } from "./pages/dashboard/premium/AgentsDashboardPremium";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero3D />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/agents/factory" element={<AppLayout><AgentFactory /></AppLayout>} />
        <Route path="/agents/logs" element={<AppLayout><LiveLogTerminalPage /></AppLayout>} />
        
        {/* Data Management */}
        <Route path="/data/leads" element={<AppLayout><LeadsPage /></AppLayout>} />
        <Route path="/data/clients" element={<AppLayout><ClientsPage /></AppLayout>} />
        <Route path="/data/financial" element={<AppLayout><FinancialPage /></AppLayout>} />
        <Route path="/data/whatsapp" element={<AppLayout><WhatsAppPage /></AppLayout>} />

        {/* Premium Dashboards */}
        <Route path="/premium/leads" element={<AppLayout><LeadsDashboardPremium /></AppLayout>} />
        <Route path="/premium/clients" element={<AppLayout><ClientsDashboardPremium /></AppLayout>} />
        <Route path="/premium/financial" element={<AppLayout><FinancialDashboardPremium /></AppLayout>} />
        <Route path="/premium/whatsapp" element={<AppLayout><WhatsAppDashboardPremium /></AppLayout>} />
        <Route path="/premium/agents" element={<AppLayout><AgentsDashboardPremium /></AppLayout>} />

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
