import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Crosshair, TrendingUp, Brain, Ghost, Activity, Eye, Zap, Search } from "lucide-react";

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

export function OmniscienceGrid() {
  const [poacherLogs, setPoacherLogs] = useState<{ id: number; company: string; intent: string; action: string }[]>([]);

  useEffect(() => {
    const companies = ["Salesforce", "HubSpot", "Pipedrive", "Zendesk", "Apollo"];
    const intents = ["Complaining about price", "Looking for alternatives", "Bug report frustrated", "Poor support review"];
    
    const interval = setInterval(() => {
      setPoacherLogs(prev => {
        const newLog = {
          id: Date.now(),
          company: companies[Math.floor(Math.random() * companies.length)],
          intent: intents[Math.floor(Math.random() * intents.length)],
          action: "Agent dispatched custom DM offer"
        };
        return [newLog, ...prev].slice(0, 4);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Globe className="w-8 h-8 text-[var(--color-neon-gold)]" />
            God-Eye Nexus
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-2 text-sm">
            Total market dominance. See every lead, intercept every competitor, predict every trend.
          </p>
        </div>
        <div className="px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          <Activity className="w-4 h-4 animate-pulse" />
          Omniscience Active
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Feature 1: God-Eye Market Mapper */}
        <motion.div variants={item} className="lg:col-span-2 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-xl p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-amber-500 dark:text-[var(--color-neon-gold)]" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Total Market Mapper (Graph)</h2>
            </div>
            <span className="text-xs text-amber-500 px-2 py-1 rounded-md bg-amber-500/10 font-mono">1.2M NODES</span>
          </div>
          
          <div className="h-64 rounded-xl border border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-black/50 relative overflow-hidden flex items-center justify-center group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_100%)]" />
            
            {/* Simulated 3D nodes */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                animate={{
                  x: [Math.random() * 400 - 200, Math.random() * 400 - 200, Math.random() * 400 - 200],
                  y: [Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
              />
            ))}
            {/* Connecting lines simulation */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <path d="M100,100 Q150,50 200,150 T400,100" stroke="var(--color-neon-gold)" strokeWidth="1" fill="none" />
              <path d="M200,200 Q250,100 350,150" stroke="var(--color-neon-gold)" strokeWidth="1" fill="none" />
            </svg>
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="px-6 py-2 bg-amber-500 text-black font-bold text-sm rounded-lg flex items-center gap-2">
                <Search className="w-4 h-4" /> Scan Industry
              </button>
            </div>
          </div>
        </motion.div>

        {/* Feature 2: Competitor Poacher */}
        <motion.div variants={item} className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <Crosshair className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Competitor Poacher</h2>
          </div>
          <div className="flex-1 space-y-3 overflow-hidden relative">
            {poacherLogs.map((log) => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-sm"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-red-500 dark:text-red-400">@{log.company}</span>
                  <span className="text-[10px] text-zinc-500 font-mono">Just now</span>
                </div>
                <p className="text-slate-600 dark:text-zinc-300 text-xs mb-2">"{log.intent}"</p>
                <p className="text-[10px] text-green-500 font-mono flex items-center gap-1">
                  <Zap className="w-3 h-3" /> {log.action}
                </p>
              </motion.div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-900/40 to-transparent" />
          </div>
        </motion.div>

        {/* Feature 3: Trend Hijacker */}
        <motion.div variants={item} className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500 dark:text-[var(--color-neon-blue)]" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Predictive Trend Hijacker</h2>
            </div>
          </div>
          <div className="space-y-4">
            {["AI Agent Orchestration", "B2B SaaS Pricing", "Cold Email Deliverability"].map((trend, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 dark:text-zinc-300 font-medium">{trend}</span>
                  <span className="text-blue-500">+{Math.floor(Math.random() * 500)}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${60 + Math.random() * 40}%` }}
                    transition={{ duration: 1.5, delay: i * 0.2 }}
                    className="h-full bg-blue-500 dark:bg-[var(--color-neon-blue)] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                </div>
              </div>
            ))}
            <button className="w-full py-2 mt-4 text-xs font-bold border border-blue-500/30 text-blue-500 rounded-lg hover:bg-blue-500/10 transition-colors">
              Auto-Deploy Campaigns
            </button>
          </div>
        </motion.div>

        {/* Feature 4: Neuromarketing */}
        <motion.div variants={item} className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-5 h-5 text-purple-500 dark:text-[var(--color-neon-purple)]" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Neuromarketing Injector</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            AI dynamically injects cognitive biases into copy based on lead psychographics.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Loss Aversion", conv: "14.2%" },
              { name: "Social Proof", conv: "8.7%" },
              { name: "Anchoring", conv: "11.1%" },
              { name: "Scarcity", conv: "16.5%" }
            ].map((bias, i) => (
              <div key={i} className="p-3 border border-black/5 dark:border-white/5 bg-white dark:bg-zinc-900/50 rounded-lg flex flex-col justify-center items-center gap-1 hover:border-purple-500/30 transition-colors cursor-pointer">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider text-center leading-tight">{bias.name}</span>
                <span className="text-lg font-bold text-purple-500 dark:text-[var(--color-neon-purple)]">{bias.conv}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature 5: Ghost Protocol */}
        <motion.div variants={item} className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMzMzMiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSI1NTUiLz48L3N2Zz4=')] opacity-10 mix-blend-overlay" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Ghost className="w-5 h-5 text-zinc-400 dark:text-zinc-100" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ghost-Protocol (Stealth)</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4 relative z-10">
            100% Inbox Placement via dynamic IP cluster rotation and packet header spoofing.
          </p>
          <div className="h-20 bg-black/80 rounded-lg border border-zinc-800 p-3 font-mono text-[10px] text-green-500 overflow-hidden relative z-10">
            <motion.div
              animate={{ y: [-100, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <p>{">"} Routing via Cluster 7A...</p>
              <p>{">"} Bypassing Google Workspace filters...</p>
              <p>{">"} Injecting warmup headers [SUCCESS]</p>
              <p>{">"} Inbox Placement: 99.98%</p>
              <p>{">"} Stealth Mode: ACTIVE</p>
              <p>{">"} Awaiting payload...</p>
              <p>{">"} Routing via Cluster 7A...</p>
              <p>{">"} Bypassing Google Workspace filters...</p>
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}