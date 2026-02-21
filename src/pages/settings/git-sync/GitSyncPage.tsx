import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, RefreshCw, Github, Clock, ArrowUpRight, CheckCircle2, Cloud } from "lucide-react";
import { cn } from "@/utils/cn";

export function GitSyncTool() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-10 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
              <GitBranch className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
              Git-Sync <span className="text-indigo-500">Engine</span>
            </h1>
          </div>
          <p className="text-zinc-500 font-medium ml-12">Sincronização de código e controlo de versão autônomo.</p>
        </div>
        
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className={cn(
            "flex items-center gap-3 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl active:scale-[0.98]",
            isSyncing 
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
              : "bg-white text-black hover:bg-zinc-200"
          )}
        >
          <RefreshCw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
          {isSyncing ? "Sincronizando..." : "Sincronizar Agora"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Repositories Section */}
        <div className="lg:col-span-8 relative">
           <div className="absolute -inset-0.5 bg-indigo-500/5 rounded-[2.5rem] blur-xl" />
           <div className="relative bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] shadow-2xl">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic">Repositórios Ativos</h3>
                </div>
                <div className="px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 rounded-full flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Git Provider: GitHub</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: "cm-portal-main", branch: "main", status: "In Sync", commit: "v7.6-stable", time: "Há 5 min", health: 100 },
                  { name: "agent-swarm-core", branch: "dev", status: "Out of Sync", commit: "feat/scoring-v2", time: "Há 15 min", health: 65 },
                  { name: "visual-assets-3d", branch: "main", status: "In Sync", commit: "fix/spline-load", time: "Há 1 dia", health: 100 },
                ].map((repo, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-between p-5 bg-[#121212] border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center border border-white/5 group-hover:border-indigo-500/20 transition-colors">
                          <GitBranch className="w-6 h-6 text-zinc-600 group-hover:text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{repo.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-zinc-500 bg-black/40 px-2 py-0.5 rounded border border-white/5">{repo.branch}</span>
                            <span className="text-[10px] text-zinc-600 italic">ID: {repo.commit}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-right hidden sm:block">
                          <p className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            repo.status === "In Sync" ? "text-emerald-500" : "text-amber-500"
                          )}>{repo.status}</p>
                          <p className="text-[9px] text-zinc-600 mt-0.5 font-medium">{repo.time}</p>
                        </div>
                        <button className="p-2.5 bg-white/5 rounded-lg border border-white/5 hover:bg-white hover:text-black transition-all">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
        </div>

        {/* Deployment Pipeline Section */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] shadow-2xl flex-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full" />
              <h3 className="text-lg font-bold mb-10 flex items-center gap-3 text-white uppercase tracking-tighter italic">
                <Clock className="w-5 h-5 text-rose-500" />
                Pipeline Logs
              </h3>
              
              <div className="space-y-10 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-zinc-800" />
                {[
                  { event: "Auto-Deploy: V8.0", status: "Success", time: "Há 10 min", color: "bg-emerald-500" },
                  { event: "Merge: feat/treasury", status: "Success", time: "Há 40 min", color: "bg-emerald-500" },
                  { event: "Git Hook: Push main", status: "Success", time: "Ontem", color: "bg-emerald-500" },
                  { event: "API Sync: Evol. v2", status: "Pending", time: "Ontem", color: "bg-amber-500" },
                ].map((log, i) => (
                  <div key={i} className="relative pl-8">
                    <div className={cn(
                      "absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-4 border-[#0A0A0A] shadow-lg",
                      log.color
                    )} />
                    <h5 className="text-[11px] font-black text-white uppercase tracking-wider">{log.event}</h5>
                    <div className="flex items-center gap-2 mt-1.5">
                       <span className="text-[9px] font-bold text-zinc-500">{log.time}</span>
                       <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                       <span className={cn("text-[9px] font-black uppercase tracking-widest", log.status === "Success" ? "text-emerald-500" : "text-amber-500")}>
                         {log.status}
                       </span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-12 py-4 bg-zinc-900 border border-white/5 text-zinc-400 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-800 hover:text-white transition-all">
                Ver Logs Completos
              </button>
           </div>

           {/* Cloud Health Mini Card */}
           <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Vercel Status</p>
                  <h4 className="text-white text-xl font-bold">Cloud Operational</h4>
                </div>
                <Cloud className="w-10 h-10 text-white animate-bounce" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
