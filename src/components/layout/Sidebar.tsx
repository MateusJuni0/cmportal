import React from 'react';
import { Home, Users, BarChart2, Box, Settings, LogOut, Terminal, Image as ImageIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0c] border-r border-white/5 flex flex-col p-6 z-50">
      
      {/* Brand */}
      <div className="mb-10 pl-2">
        <h1 className="text-2xl font-black text-white tracking-tighter">
          CM<span className="text-[#00ffc8]">TEC</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 mt-1">Sovereign OS</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <div className="text-[10px] uppercase font-bold text-gray-600 pl-4 mb-2 mt-6 tracking-widest">
          Core Modules
        </div>
        <NavItem to="/dashboard" icon={Home} label="Nero Command" active={path === '/dashboard'} />
        <NavItem to="/agents" icon={Users} label="Agent Factory" active={path === '/agents'} />
        <NavItem to="/logs" icon={Terminal} label="Live Logs" active={path === '/logs'} />
        
        <div className="text-[10px] uppercase font-bold text-gray-600 pl-4 mb-2 mt-8 tracking-widest">
          Creative Suite
        </div>
        <NavItem to="/creative" icon={ImageIcon} label="Creative Lab" active={path === '/creative'} />
        <NavItem to="/analytics" icon={BarChart2} label="Analytics" active={path === '/analytics'} />
        <NavItem to="/assets" icon={Box} label="Asset Manager" active={path === '/assets'} />
      </nav>

      {/* Footer / User */}
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
