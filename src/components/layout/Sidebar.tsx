import { Link, useLocation } from "react-router-dom";
import { 
  Bot, Home, Settings, Zap, Users, Terminal, 
  Image as ImageIcon, LayoutTemplate, Box, GitCommit, 
  Brain, Target, DollarSign, MessageSquare, X, Menu
} from "lucide-react";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "../../store";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Agent Factory", path: "/agents/factory", icon: Bot },
  { name: "Live Logs", path: "/agents/logs", icon: Terminal },
];

const dataItems = [
  { name: "Leads Sniper", path: "/data/leads", icon: Target },
  { name: "Clients", path: "/data/clients", icon: Users },
  { name: "Financial", path: "/data/financial", icon: DollarSign },
  { name: "WhatsApp", path: "/data/whatsapp", icon: MessageSquare },
];

const innovationItems = [
  { name: "Market Intel", path: "/innovation/market", icon: Users },
  { name: "Agent Warfare", path: "/innovation/warfare", icon: Bot },
  { name: "Growth Engines", path: "/innovation/growth", icon: Zap },
];

const nexusItems = [
  { name: "Omniscience", path: "/nexus/omniscience", icon: Zap },
  { name: "AIBoardroom", path: "/nexus/boardroom", icon: Users },
  { name: "Treasury", path: "/nexus/treasury", icon: Box },
];

const toolsItems = [
  { name: "Creative Lab", path: "/creative", icon: ImageIcon },
  { name: "Visual CMS", path: "/cms", icon: LayoutTemplate },
  { name: "LP Builder", path: "/lp-builder", icon: LayoutTemplate },
  { name: "AI Training", path: "/ai-training", icon: Brain },
];

const settingsItems = [
  { name: "3D Scene", path: "/settings/3d-customizer", icon: Box },
  { name: "Git Sync", path: "/settings/git-sync", icon: GitCommit },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

    const { setClientFilters, setLeadFilters } = useAppStore();

  const renderLink = (item: any) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    const handleClick = () => {
      onClose();
      // Reset filters when navigating to a list
      if (item.path === '/data/clients') setClientFilters({ search: '', status: null });
      if (item.path === '/data/leads') setLeadFilters({ search: '', status: null, source: null });
    };

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group",
          isActive
            ? "text-white bg-gradient-to-r from-white/[0.08] to-transparent border border-white/5"
            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
        )}
      >
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 bg-white/[0.02] border-l-2 border-[var(--color-neon-blue)] rounded-r-xl z-0"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Icon className={cn(
          "w-4 h-4 relative z-10 transition-all duration-300", 
          isActive ? "text-[var(--color-neon-blue)] drop-shadow-[0_0_8px_rgba(0,243,255,0.6)] scale-110" : "group-hover:scale-110"
        )} />
        <span className="relative z-10">{item.name}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 h-screen w-64 border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col z-50 transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-tighter text-white uppercase italic">CM<span className="text-cyan-500">TEC</span></h1>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black opacity-60">Sovereign OS</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-zinc-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-6 overflow-y-auto scrollbar-none pb-20">
          <div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-3">Core Engine</p>
            <div className="space-y-1">{menuItems.map(renderLink)}</div>
          </div>

          <div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-3">Data Matrix</p>
            <div className="space-y-1">{dataItems.map(renderLink)}</div>
          </div>

          <div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-3">Innovation</p>
            <div className="space-y-1">{innovationItems.map(renderLink)}</div>
          </div>

          <div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-3">Nexus Grid</p>
            <div className="space-y-1">{nexusItems.map(renderLink)}</div>
          </div>

          <div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-3">Creative Lab</p>
            <div className="space-y-1">{toolsItems.map(renderLink)}</div>
          </div>

          <div>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-3">Systems</p>
            <div className="space-y-1">{settingsItems.map(renderLink)}</div>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5 bg-white/[0.01]">
          <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/5 flex flex-col gap-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 blur-xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Protocol Status</span>
            <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 tracking-tighter">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              V8.1 ELITE // SECURE
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

