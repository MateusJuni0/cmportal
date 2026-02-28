import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, RefreshCw, Github, Clock, ArrowUpRight, CheckCircle2, Cloud, Zap, Shield, GitCommit, GitPullRequest } from "lucide-react";
import { cn } from "@/utils/cn";
import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";

export function GitSyncTool() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto h-full flex flex-col gap-10 pb-24 px-2 md:px-0"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">
            <GitCommit className="w-3 h-3" />
            Version Control Matrix
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Git <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Sync</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium max-w-md">Sincronização implacável entre o desenvolvimento local e a infraestrutura Cloud.</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSync}
          disabled={isSyncing}
          className={cn(
            "w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-2xl",
            isSyncing 
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-white/5" 
              : "bg-white text-black hover:bg-zinc-200"
          )}
        >
          <RefreshCw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
          {isSyncing ? "PROCESSANDO..." : "SINCRONIZAR AGORA"}
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Repositories Section */}
        <motion.div variants={itemVariants} className="lg:col-span-8">
           <GlassmorphismCard className="p-8 md:p-10 border border-white/5 bg-white/[0.01]">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                    <Github className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Repositórios Ativos</h3>
                    <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mt-0.5">Git Provider: GitHub Official</p>
                  </div>
                </div>
                <div className="hidden md:flex px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl items-center gap-3">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Webhooks Secured</span>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { name: "cm-portal-main", branch: "main", status: "In Sync", commit: "v8.1-elite", time: "5m atrás", health: 100, icon: Zap },
                  { name: "agent-swarm-core", branch: "dev", status: "Update Needed", commit: "feat/scoring-v3", time: "15m atrás", health: 65, icon: GitPullRequest },
                  { name: "visual-assets-3d", branch: "main", status: "In Sync", commit: "fix/spline-load", time: "1 dia atrás", health: 100, icon: CheckCircle2 },
                ].map((repo, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.03] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex flex-col md:flex-row items-center justify-between p-6 bg-black/40 border border-white/5 rounded-[2rem] hover:border-indigo-500/20 transition-all shadow-inner">
                      <div className="flex items-center gap-6 w-full md:w-auto">
                        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500">
                          <repo.icon className={cn("w-6 h-6 transition-all duration-500", repo.status === "In Sync" ? "text-indigo-400" : "text-amber-400 group-hover:scale-110")} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight">{repo.name}</h4>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/20 uppercase tracking-widest">{repo.branch}</span>
                            <span className="text-[10px] text-zinc-600 font-mono tracking-tighter opacity-60">HASH: {repo.commit}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8 mt-6 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                        <div className="text-left md:text-right">
                          <p className={cn(
                            "text-[10px] font-black uppercase tracking-[0.2em]",
                            repo.status === "In Sync" ? "text-emerald-500" : "text-amber-400"
                          )}>{repo.status}</p>
                          <p className="text-[9px] text-zinc-600 mt-1 font-bold uppercase">{repo.time}</p>
                        </div>
                        <button className="p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white hover:text-black transition-all shadow-xl">
                          <ArrowUpRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
           </GlassmorphismCard>
        </motion.div>

        {/* Pipeline & Status Section */}
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-8">
           <GlassmorphismCard className="p-8 md:p-10 border border-white/5 bg-white/[0.01] flex-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-[60px] rounded-full" />
              <h3 className="text-xl font-black mb-10 flex items-center gap-4 text-white uppercase tracking-tighter italic">
                <Clock className="w-6 h-6 text-rose-500" />
                Pipeline History
              </h3>
              
              <div className="space-y-12 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/5" />
                {[
                  { event: "Auto-Deploy: V8.1", status: "Success", time: "10m atrás", color: "bg-emerald-500" },
                  { event: "Merge: feat/leads-v2", status: "Success", time: "45m atrás", color: "bg-emerald-500" },
                  { event: "Git Hook: Push main", status: "Success", time: "Ontem", color: "bg-emerald-500" },
                  { event: "API Sync: Evol. v3", status: "Failure", time: "Ontem", color: "bg-rose-500" },
                ].map((log, i) => (
                  <div key={i} className="relative pl-10 group cursor-default">
                    <div className={cn(
                      "absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-4 border-[#0A0A0A] shadow-lg group-hover:scale-125 transition-transform",
                      log.color
                    )} />
                    <h5 className="text-[12px] font-black text-white uppercase tracking-wider group-hover:text-indigo-400 transition-colors">{log.event}</h5>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-[10px] font-bold text-zinc-600 uppercase">{log.time}</span>
                       <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                       <span className={cn(
                         "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg", 
                         log.status === "Success" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                       )}>
                         {log.status}
                       </span>
                    </div>
                  </div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                className="w-full mt-12 py-5 bg-white/5 border border-white/10 text-zinc-400 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all shadow-inner"
              >
                Auditar Logs Completos
              </motion.button>
           </GlassmorphismCard>

           {/* Cloud Health Card */}
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(79,70,229,0.3)] relative overflow-hidden group"
           >
              <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-white/20 blur-[50px] rounded-full group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-white/60" />
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Deployment Status</p>
                  </div>
                  <h4 className="text-white text-2xl font-black tracking-tight italic">Cloud Operational</h4>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Region: Vercel-Main-Node</div>
                </div>
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                  <Cloud className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>
           </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
