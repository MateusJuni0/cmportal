import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain, Sparkles, Bot, Terminal, Moon, Sun, LayoutTemplate, PanelsTopLeft, Box, GitCommit, Search } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { GlobalSearch } from "@/components/common/GlobalSearch";
import { DeployButton } from "@/components/common/DeployButton";

const navItems = [
  { name: "Creative Lab", path: "/creative-lab", icon: Sparkles },
  { name: "Agent Factory", path: "/agents/factory", icon: Bot },
  { name: "Live Logs", path: "/agents/logs", icon: Terminal },
  { name: "AI Training", path: "/ai-training", icon: Brain },
];

const sysItems = [
  { name: "Visual CMS", path: "/cms", icon: LayoutTemplate },
  { name: "LP Builder", path: "/lp-builder", icon: PanelsTopLeft },
  { name: "3D Setup", path: "/settings/3d-customizer", icon: Box },
  { name: "Git Sync", path: "/settings/git-sync", icon: GitCommit },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true); // Default to Dark Mode Luxo

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="flex h-screen w-full bg-zinc-50 dark:bg-black text-slate-900 dark:text-zinc-50 overflow-hidden font-sans transition-colors duration-300">
      {/* Sidebar - Glassmorphism style */}
      <aside className="w-64 border-r border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl flex flex-col z-20 shadow-lg">
        <div className="p-6">
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-[var(--color-neon-blue)] dark:to-[var(--color-neon-purple)]">
            Sovereign Sales
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 uppercase tracking-widest font-semibold">
            Engine
          </p>
        </div>

        <div className="px-4 mt-4 mb-2">
          <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-3">Sales Engine</p>
        </div>
        <nav className="px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname === '/' && item.path === '/creative-lab');
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden group",
                  isActive
                    ? "text-brand-600 dark:text-white bg-white dark:bg-zinc-900/50 shadow-sm border border-black/5 dark:border-white/5"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-transparent dark:from-[var(--color-neon-blue)]/10 dark:to-transparent border-l-2 border-brand-500 dark:border-[var(--color-neon-blue)] z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <Icon className={cn("w-5 h-5 relative z-10", isActive ? "text-brand-500 dark:text-[var(--color-neon-blue)]" : "")} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-6 mb-2">
          <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest px-3">System</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {sysItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden group",
                  isActive
                    ? "text-brand-600 dark:text-white bg-white dark:bg-zinc-900/50 shadow-sm border border-black/5 dark:border-white/5"
                    : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-sys"
                    className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-transparent dark:from-[var(--color-neon-blue)]/10 dark:to-transparent border-l-2 border-brand-500 dark:border-[var(--color-neon-blue)] z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <Icon className={cn("w-5 h-5 relative z-10", isActive ? "text-brand-500 dark:text-[var(--color-neon-blue)]" : "")} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5 dark:border-white/10 flex flex-col gap-2">
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="flex items-center justify-between px-3 py-2 w-full rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent dark:border-white/5"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </div>
            <div className="flex items-center gap-0.5 text-[10px] opacity-60">
              <span className="font-mono">⌘</span>
              <span className="font-mono">K</span>
            </div>
          </button>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 px-3 py-2 w-full rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {isDark ? "Light Mode" : "Dark Mode Luxo"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-gradient-to-br from-slate-50 to-zinc-100 dark:from-zinc-950 dark:to-black">
        {/* Top Header Navigation for Global Actions */}
        <header className="h-16 border-b border-black/5 dark:border-white/5 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md flex items-center justify-end px-8 z-20 gap-4">
          <DeployButton />
        </header>

        {/* Subtle background glow effect for dark mode */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/20 dark:bg-[var(--color-neon-purple)]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 dark:bg-[var(--color-neon-blue)]/10 blur-[120px] pointer-events-none" />
        
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 p-8">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>

      <GlobalSearch />
    </div>
  );
}
