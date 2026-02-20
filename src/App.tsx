import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Hero3D } from './modules/VisualTrust/Hero3D';
import { NeroDashboard } from './modules/HunterCore/NeroDashboard';
import { AgentFactory } from './modules/Agents/AgentFactory';
import { LiveLogs } from './modules/Guardian/LiveLogs';
import { CreativeLab } from './modules/VisualTrust/CreativeLab';
import { Box, Home, Users, BarChart2, Settings, LogOut, Terminal, Image as ImageIcon } from 'lucide-react';

// --- SIDEBAR (Inline para simplificar imports e garantir funcionamento imediato) ---
const NavItem = ({ to, icon: Icon, label, active }: any) => (
  <Link to={to} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
    active 
      ? 'bg-gradient-to-r from-[#00ffc8]/10 to-transparent text-[#00ffc8] font-bold border-l-2 border-[#00ffc8]' 
      : 'text-gray-400 hover:text-white hover:bg-white/5'
  }`}>
    <Icon className={`w-5 h-5 ${active ? 'text-[#00ffc8]' : 'text-gray-500 group-hover:text-white'}`} />
    <span className="text-sm tracking-wide">{label}</span>
    {active && (
      <div className="absolute inset-0 bg-[#00ffc8]/5 pointer-events-none animate-pulse" />
    )}
  </Link>
);

const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0c] border-r border-white/5 flex flex-col p-6 z-50">
      <div className="mb-10 pl-2">
        <h1 className="text-2xl font-black text-white tracking-tighter">
          CM<span className="text-[#00ffc8]">TEC</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 mt-1">Sovereign OS</p>
      </div>

      <nav className="flex-1 space-y-1">
        <div className="text-[10px] uppercase font-bold text-gray-600 pl-4 mb-2 mt-6 tracking-widest">Core Modules</div>
        <NavItem to="/dashboard" icon={Home} label="Nero Command" active={path === '/dashboard'} />
        <NavItem to="/agents" icon={Users} label="Agent Factory" active={path === '/agents'} />
        <NavItem to="/logs" icon={Terminal} label="Live Logs" active={path === '/logs'} />
        
        <div className="text-[10px] uppercase font-bold text-gray-600 pl-4 mb-2 mt-8 tracking-widest">Creative Suite</div>
        <NavItem to="/creative" icon={ImageIcon} label="Creative Lab" active={path === '/creative'} />
        <NavItem to="/assets" icon={Box} label="Asset Manager" active={path === '/assets'} />
        <NavItem to="/analytics" icon={BarChart2} label="Analytics" active={path === '/analytics'} />
      </nav>

      <div className="pt-6 border-t border-white/5">
        <NavItem to="/settings" icon={Settings} label="System Settings" active={path === '/settings'} />
        <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all mt-2 group">
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Terminate Session</span>
        </button>
      </div>
    </aside>
  );
};

// --- LAYOUT ---
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen bg-[#020205] text-white font-sans overflow-hidden">
    <Sidebar />
    <main className="flex-1 overflow-y-auto ml-64 bg-[#0a0a0c] relative">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="relative z-10 max-w-7xl mx-auto p-8 animate-fade-in">
        {children}
      </div>
    </main>
  </div>
);

// --- APP ROOT ---
function App() {
  console.log('App Mounted V5 - Sovereign Engine');
  // Simples estado de autenticação (futuro: conectar ao Supabase)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função temporária para simular login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Rota Pública: Login (Hero3D) */}
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : (
            <div onClick={handleLogin}> {/* Clique na tela para entrar (Demo) */}
              <Hero3D />
            </div>
          )
        } />

        {/* Rotas Protegidas (Dashboard) */}
        <Route path="/dashboard" element={
          <DashboardLayout><NeroDashboard /></DashboardLayout>
        } />
        <Route path="/agents" element={
          <DashboardLayout><AgentFactory /></DashboardLayout>
        } />
        <Route path="/logs" element={
          <DashboardLayout><LiveLogs /></DashboardLayout>
        } />
        <Route path="/creative" element={
          <DashboardLayout><CreativeLab /></DashboardLayout>
        } />

        {/* Redirecionamento Padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
