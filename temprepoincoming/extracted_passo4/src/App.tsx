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
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
