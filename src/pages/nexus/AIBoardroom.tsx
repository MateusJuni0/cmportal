import { motion } from "framer-motion";
import { Users, ShieldAlert, Cpu, GitMerge, Fingerprint, MessageSquareWarning, Zap, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function AIBoardroom() {
  const [boardLog, setBoardLog] = useState<string[]>([]);
  const personas = ["CFO AI", "CMO AI", "CTO AI", "Risk AI", "Visionary AI"];
  
  useEffect(() => {
    const messages = [
      "CMO AI: I propose shifting $10k to LinkedIn Swarm for Enterprise SaaS targets.",
      "CFO AI: Objection. CAC on LinkedIn is up 12% this week. Re-allocate to SEO PLG.",
      "Visionary AI: We are thinking too small. Let's mutate the top performing agent and target Series A startups instead.",
      "CTO AI: I can deploy the Self-Replicating Agent Factory for that segment in 2 minutes.",
      "Risk AI: Validating compliance for automated outreach... Approved.",
      "CFO AI: Budget approved for the mutated agent swarm. Monitoring ROI."
    ];
    let i = 0;
    const interval = setInterval(() => {
      setBoardLog(prev => {
        const newLog = messages[i % messages.length];
        i++;
        return [...prev, newLog].slice(-5);
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-[var(--color-neon-purple)]" />
            AI Boardroom
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-2 text-sm">
            Orchestration layer. Let your specialized AI personas debate strategy and execute swarms.
          </p>
        </div>
        <div className="px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          <Zap className="w-4 h-4 animate-pulse" />
          Board in Session
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Feature 6: AI Board of Directors */}
        <motion.div variants={item} className="lg:col-span-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-xl p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <Cpu className="w-5 h-5 text-purple-500 dark:text-[var(--color-neon-purple)]" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Autonomous Strategy Debate (The Board)</h2>
          </div>
          
          <div className="flex justify-around mb-8 relative z-10">
            {personas.map((persona, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <motion.div 
                  className="w-12 h-12 rounded-full border-2 border-purple-500/50 flex items-center justify-center bg-black shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  animate={{ boxShadow: ["0 0 10px rgba(168,85,247,0.2)", "0 0 20px rgba(168,85,247,0.6)", "0 0 10px rgba(168,85,247,0.2)"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                >
                  <BotIcon className="w-6 h-6 text-purple-400" />
                </motion.div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest">{persona}</span>
              </div>
            ))}
          </div>

          <div className="bg-zinc-100 dark:bg-black/50 border border-black/5 dark:border-white/5 rounded-xl p-4 h-48 overflow-y-auto font-mono text-sm relative z-10">
            {boardLog.map((log, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className={`mb-3 ${log.includes("CFO") ? "text-green-500" : log.includes("CMO") ? "text-blue-500" : log.includes("Risk") ? "text-red-500" : log.includes("Visionary") ? "text-amber-500" : "text-purple-500"}`}
              >
                {">"} {log}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feature 7: Swarm Intelligence */}
        <motion.div variants={item} className="lg:col-span-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Swarm Attack</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            Multi-agent coordinated encirclement on target accounts.
          </p>
          <div className="flex-1 space-y-3">
            {[
              { channel: "LinkedIn Engager", status: "Active (20 req/h)" },
              { channel: "Blog Commenter", status: "Active (5 posts/h)" },
              { channel: "Video DM Bot", status: "Queueing..." }
            ].map((swarm, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 rounded-lg">
                <span className="text-xs font-medium text-slate-700 dark:text-zinc-300">{swarm.channel}</span>
                <span className={`text-[10px] ${swarm.status.includes('Active') ? 'text-green-500' : 'text-amber-500'}`}>{swarm.status}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors border border-indigo-500/30">
            Deploy New Swarm
          </button>
        </motion.div>

        {/* Feature 8: Automated PLG Engineer */}
        <motion.div variants={item} className="lg:col-span-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <GitMerge className="w-5 h-5 text-blue-500 dark:text-[var(--color-neon-blue)]" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Auto-PLG Engineer</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            AI detects app drop-offs and automatically writes/deploys micro-fixes or Jira tickets.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-blue-500 font-bold tracking-widest">TICKET-082</span>
                <span className="text-[10px] text-zinc-500">Auto-Generated</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-zinc-300">"Add tooltip to 'Export' button. Drop-off detected at 14%."</p>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-green-500">
                <CheckCircle2 className="w-3 h-3" /> Fix Deployed to Prod
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature 9: Self-Replicating Agent Factory */}
        <motion.div variants={item} className="lg:col-span-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <Fingerprint className="w-5 h-5 text-teal-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Self-Replication Tree</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">
            Agents that exceed 80% win-rate are automatically cloned and mutated.
          </p>
          <div className="flex justify-center items-center h-24">
            <div className="w-full max-w-[200px] h-full relative flex items-center justify-center border-t-2 border-l-2 border-teal-500/30 rounded-tl-xl p-4">
               <motion.div 
                 className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]"
                 animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
               />
               <motion.div 
                 className="absolute top-8 right-0 w-4 h-4 rounded-full bg-teal-500/50"
               />
               <motion.div 
                 className="absolute bottom-0 left-8 w-4 h-4 rounded-full bg-teal-500/50"
               />
               <span className="text-[10px] text-teal-500 font-mono tracking-widest absolute -top-8 -left-8">V1 (84% WIN)</span>
               <span className="text-[10px] text-zinc-500 font-mono tracking-widest absolute top-6 -right-6">V2.1 (MUTATED)</span>
               <span className="text-[10px] text-zinc-500 font-mono tracking-widest absolute -bottom-6 left-4">V2.2 (MUTATED)</span>
            </div>
          </div>
        </motion.div>

        {/* Feature 10: Zero-Day Churn Reversal */}
        <motion.div variants={item} className="lg:col-span-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquareWarning className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Zero-Day Churn Reversal</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            Live AI interception when users click 'Cancel'.
          </p>
          <div className="space-y-2 relative h-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent z-10" />
            <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
              <span className="text-[10px] font-bold text-red-500 block mb-1">INTERCEPT: user@acme.com</span>
              <span className="text-xs text-slate-700 dark:text-zinc-300">"It's too expensive right now."</span>
              <div className="mt-2 text-[10px] text-green-500 font-mono">
                {">"} AI offered 50% off for 3 months. <br/>
                {">"} Saved $499 MRR.
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

function BotIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}