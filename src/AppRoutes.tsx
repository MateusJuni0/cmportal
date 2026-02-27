import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/DashboardPage';
import { AgentFactory } from './pages/agents/factory/AgentFactoryPage'; // Corrigido de AgentFactoryPage para AgentFactory
import { LeadsPage } from './pages/data-management/LeadsPage';
import { AppLayout } from './components/layout/AppLayout';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/agents" element={<AgentFactory />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
