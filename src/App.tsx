import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Hero3D } from "./modules/VisualTrust/Hero3D";
import { Dashboard } from "./pages/dashboard";
import { AgentFactory } from "./pages/agents/factory";
import { MarketIntelligence } from "./pages/innovation/MarketIntelligence";
import { OmniscienceGrid } from "./pages/nexus/OmniscienceGrid";
import { CreativeLab } from "./pages/creative-lab";
import { AuthPage } from "./pages/auth";

export default function App() {
  console.log('App Mounted V5.1 - AI Agents Integration');

  return (
    <Router>
      <Routes>
        {/* Rota Pública (Login/Hero) */}
        <Route path="/" element={<Hero3D />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* Rotas Protegidas (Layout Principal) */}
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/agents/factory"
          element={
            <AppLayout>
              <AgentFactory />
            </AppLayout>
          }
        />
        <Route
          path="/innovation/market"
          element={
            <AppLayout>
              <MarketIntelligence />
            </AppLayout>
          }
        />
        <Route
          path="/nexus/omniscience"
          element={
            <AppLayout>
              <OmniscienceGrid />
            </AppLayout>
          }
        />
        <Route
          path="/creative"
          element={
            <AppLayout>
              <CreativeLab />
            </AppLayout>
          }
        />

        {/* Redirecionamento Padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
