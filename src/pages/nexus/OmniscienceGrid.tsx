import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Crosshair, TrendingUp, Brain, Ghost, Activity, Eye, Zap, Search } from "lucide-react";
import { cn } from "../../utils/cn";

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
    const intents = ["Queixa sobre preço", "Procura alternativas", "Bug crítico reportado", "Avaliação CS negativa"];
    
    const interval = setInterval(() => {
      setPoacherLogs(prev => {
        const newLog = {
          id: Date.now(),
          company: companies[Math.floor(Math.random() * companies.length)],
          intent: intents[Math.floor(Math.random() * intents.length)],
          action: "Agente Alpha disparou oferta customizada"
        };
        return [newLog, ...prev].slice(0, 4);
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-10 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-500/30">
              <Globe className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
              God-Eye <span className="text-amber-500">Nexus</span>
            </h1>
          </div>
          <p className="text-zinc-500 font-medium ml-12">Monitor de omnisciência de mercado e domínio de concorrência.</p>
        </div>
        <div className="px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
           <Activity className="w-3 h-3 animate-pulse" /> Omniscience Active
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* God-Eye Market Mapper */}
        <motion.div variants={item} className="lg:col-span-8 relative">
           <div className="absolute -inset-0.5 bg-amber-500/5 rounded-[2.5rem] blur-xl" />
           <div className="relative bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] min-h-[450px] shadow-2xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-8 relative z-20">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic">Total Market Mapper</h3>
                </div>
                <div className="flex gap-4">
                  <span className="text-[9px] font-black text-amber-500 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 uppercase tracking-[0.2em]">1.2M NODES DETECTADOS</span>
                </div>
              </div>
              
              <div className="flex-1 rounded-3xl bg-[#121212]/50 border border-white/5 relative overflow-hidden flex items-center justify-center group">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.05)_0%,transparent_100%)] opacity-50" />
                 
                 {[...Array(24)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      animate={{
                        x: [Math.random() * 500 - 250, Math.random() * 500 - 250],
                        y: [Math.random() * 300 - 150, Math.random() * 300 - 150],
                        scale: [1, 1.4, 1],
                        opacity: [0.2, 0.8, 0.2]
                      }}
                      transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
                    />
                 ))}

                 <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="px-8 py-4 bg-amber-500 text-black font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl shadow-2xl hover:scale-105 transition-transform flex items-center gap-3">
                       <Search className="w-4 h-4 stroke-[3px]" /> Deep Scan Industry
                    </button>
                 </div>

                 {/* Simulated connection grid */}
                 <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/graphy-dark.png')] opacity-10" />
              </div>
           </div>
        </motion.div>

        {/* Competitor Poacher */}
        <motion.div variants={item} className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-500/5 blur-[60px] rounded-full" />
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <Crosshair className="w-5 h-5 text-rose-500" />
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic">Competitor Poacher</h3>
          </div>

          <div className="flex-1 space-y-4 relative z-10">
            <AnimatePresence mode="popLayout">
              {poacherLogs.map((log) => (
                <motion.div 
                  key={log.id}
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  className="p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 group hover:border-rose-500/40 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-black text-[10px] text-rose-500 uppercase tracking-widest">@{log.company}</span>
                    <span className="text-[8px] font-bold text-zinc-600 uppercase">Just Now</span>
                  </div>
                  <p className="text-sm font-medium text-zinc-300 leading-snug">"{log.intent}"</p>
                  <div className="mt-3 flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-[0.1em]">
                    <Zap className="w-3 h-3 fill-current" /> {log.action}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Trend Hijacker */}
        <motion.div variants={item} className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] shadow-2xl">
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic">Trend Hijacker</h3>
          </div>
          <div className="space-y-8">
            {[
              { name: "AI Agent Orchestration", growth: "+482%" },
              { name: "SaaS Price Sensitivity", growth: "+125%" },
              { name: "Cold Email Deliverability", growth: "+89%" },
            ].map((trend, i) => (
              <div key={i} className="space-y-3 group">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{trend.name}</span>
                  <span className="text-xs font-bold text-blue-500 font-mono">{trend.growth}</span>
                </div>
                <div className="h-2 bg-zinc-900 rounded-full border border-white/5 p-[1px] overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${85 - i * 15}%` }}
                    className="h-full rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:bg-blue-400 transition-colors"
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95">
             Lançar Campanha de Trend
          </button>
        </motion.div>

        {/* Neuromarketing Injector */}
        <motion.div variants={item} className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <Brain className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic">Neuromarketing</h3>
          </div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-8">Injeção de Gatilhos Cognitivos</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Loss Aversion", rate: "14.2%" },
              { name: "Social Proof", rate: "8.7%" },
              { name: "Anchoring", rate: "11.1%" },
              { name: "Scarcity", rate: "16.5%" }
            ].map((bias, i) => (
              <div key={i} className="p-5 border border-white/5 bg-[#121212] rounded-2xl flex flex-col justify-center items-center gap-2 hover:border-purple-500/30 transition-all cursor-pointer group">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tight text-center leading-none group-hover:text-zinc-400 transition-colors">{bias.name}</span>
                <span className="text-2xl font-black text-purple-500 tracking-tighter group-hover:scale-110 transition-transform">{bias.rate}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ghost Protocol */}
        <motion.div variants={item} className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent)]" />
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <Ghost className="w-5 h-5 text-white" />
            <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic">Ghost Protocol</h3>
          </div>
          <p className="text-xs text-zinc-500 font-medium mb-10 relative z-10 leading-relaxed uppercase tracking-widest">Entregabilidade Máxima via Stealth Routing.</p>
          
          <div className="h-32 bg-black rounded-2xl border border-white/5 p-4 font-mono text-[9px] text-emerald-500/80 overflow-hidden relative z-10 group">
            <motion.div
              animate={{ y: [-150, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="space-y-1.5"
            >
              <p className="text-zinc-700">[LOG] Iniciando Cluster Rotation...</p>
              <p>{">"} Mascarando Header: MX_Warmup_07A</p>
              <p>{">"} Bypassing O365 Filters... [OK]</p>
              <p className="text-white font-bold">{">"} Inbox Placement: 99.98%</p>
              <p className="text-indigo-500 font-bold">{">"} Modo Stealth: ATIVO</p>
              <p>{">"} Payload sincronizado via SMTP-v3</p>
              <p className="text-zinc-700">[LOG] IP 192.168.1.1 rotacionado.</p>
              <p>{">"} Mascarando Header: MX_Warmup_07A</p>
            </motion.div>
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
