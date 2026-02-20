import { Link, useLocation } from "react-router-dom";
import { Bot, Home, Settings, Zap, Users } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Agentes Autônomos", path: "/agents/factory", icon: Bot },
  { name: "Leads", path: "/innovation/market", icon: Users },
  { name: "Nexus", path: "/nexus/omniscience", icon: Zap },
  { name: "Configurações", path: "/settings/3d-customizer", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-[#2A2A2A] bg-[#0A0A0A]/40 backdrop-blur-2xl flex flex-col z-20 shadow-2xl shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
          <Bot className="w-5 h-5 text-[var(--color-neon-blue)]" />
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-tight text-white">Sovereign Sales</h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Engine</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-3 mb-4">Menu Principal</p>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group",
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
        })}
      </nav>

      <div className="p-4 border-t border-[#2A2A2A]">
        <div className="p-4 rounded-xl bg-[#1A1A1A] border border-white/5 flex flex-col gap-2">
          <span className="text-xs font-semibold text-zinc-300">Status do Sistema</span>
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-[var(--color-neon-green)] shadow-[0_0_8px_var(--color-neon-green)] animate-pulse" />
            Operação Normal
          </div>
        </div>
      </div>
    </aside>
  );
}
