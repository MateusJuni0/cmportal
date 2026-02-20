import { Link, useLocation } from "react-router-dom";
import { Bot, Home, Settings, Zap, Users, Terminal, Image as ImageIcon, LayoutTemplate, Box, GitCommit, Brain } from "lucide-react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Agent Factory", path: "/agents/factory", icon: Bot },
  { name: "Live Logs", path: "/agents/logs", icon: Terminal },
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

export function Sidebar() {
  const location = useLocation();

  const renderLink = (item: any) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link
        key={item.path}
        to={item.path}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all relative group",
          isActive
            ? "text-white"
            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
        )}
      >
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute inset-0 bg-[#1A1A1A] border border-white/5 rounded-xl z-0 shadow-inner"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <Icon className={cn("w-4 h-4 relative z-10", isActive ? "text-[var(--color-neon-blue)] drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" : "")} />
        <span className="relative z-10">{item.name}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 border-r border-[#2A2A2A] bg-[#0A0A0A]/40 backdrop-blur-2xl flex flex-col z-20 shadow-2xl shrink-0 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
          <Bot className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white">CMTEC</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Sovereign OS</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto custom-scrollbar">
        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Core</p>
          <div className="space-y-1">{menuItems.map(renderLink)}</div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Innovation</p>
          <div className="space-y-1">{innovationItems.map(renderLink)}</div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Nexus</p>
          <div className="space-y-1">{nexusItems.map(renderLink)}</div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">Creative & Build</p>
          <div className="space-y-1">{toolsItems.map(renderLink)}</div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-2">System</p>
          <div className="space-y-1">{settingsItems.map(renderLink)}</div>
        </div>
      </nav>

      <div className="p-4 border-t border-[#2A2A2A]">
        <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/5 flex flex-col gap-2">
          <span className="text-xs font-semibold text-zinc-300">Status</span>
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
            V5.3 ONLINE
          </div>
        </div>
      </div>
    </aside>
  );
}
