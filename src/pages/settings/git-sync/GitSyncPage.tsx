import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, RefreshCw, Github, CheckCircle2, AlertCircle, Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

export function GitSyncTool() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-slate-900 dark:text-white">
            <GitBranch className="w-8 h-8 text-indigo-500" />
            Git-Sync Engine
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 max-w-2xl">
            Sincronização bidirecional entre o código dos seus agentes e repositórios oficiais. 
            Controle de versão autônomo.
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg",
            isSyncing 
              ? "bg-slate-100 dark:bg-zinc-800 text-slate-400 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20"
          )}
        >
          <RefreshCw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
          {isSyncing ? "Sincronizando..." : "Sincronizar Agora"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Repo Status */}
        <div className="lg:col-span-2 glass-card p-6 border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <Github className="w-5 h-5" />
              Repositórios Ativos
            </h2>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-widest">
              Conectado: GitHub
            </span>
          </div>

          <div className="space-y-4">
            {[
              { name: "cm-portal-main", branch: "main", status: "In Sync", commit: "v6.1-stable", time: "Há 2 horas" },
              { name: "agent-swarm-core", branch: "dev", status: "Pending", commit: "feat/scoring-v2", time: "Há 15 min" },
              { name: "visual-assets-3d", branch: "main", status: "In Sync", commit: "fix/spline-load", time: "Há 1 dia" },
            ].map((repo, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900/50 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-indigo-500/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-slate-100 dark:border-white/5">
                    <GitBranch className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{repo.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <span className="font-mono">{repo.branch}</span> • {repo.commit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      repo.status === "In Sync" ? "text-emerald-500" : "text-amber-500"
                    )}>
                      {repo.status}
                    </span>
                    <p className="text-[10px] text-slate-400">{repo.time}</p>
                  </div>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Logs */}
        <div className="glass-card p-6 border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
            <Clock className="w-5 h-5 text-indigo-500" />
            Logs de Deploy
          </h2>
          <div className="space-y-6 relative">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />
            {[
              { event: "Auto-Deploy: V6.1", status: "Success", time: "00:08 GMT" },
              { event: "Git Hook: Push to main", status: "Success", time: "Ontem" },
              { event: "Manual Sync: Agent Factory", status: "Success", time: "Ontem" },
            ].map((log, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute left-[3px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-200">{log.event}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{log.time} • Status: {log.status}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-500/20 transition-colors">
            Ver Todos os Logs
          </button>
        </div>
      </div>
    </div>
  );
}
