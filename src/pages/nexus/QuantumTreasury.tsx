import { motion } from "framer-motion";
import { Vault, LineChart, Target, Coins, LayoutDashboard, Layers, Orbit } from "lucide-react";
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

export function QuantumTreasury() {
  const [mrr, setMrr] = useState(142500);

  useEffect(() => {
    const interval = setInterval(() => {
      setMrr(prev => prev + Math.floor(Math.random() * 500));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <Vault className="w-8 h-8 text-amber-500" />
            Quantum Treasury
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 mt-2 text-sm">
            Financial & Operational Mastery. Dynamic pricing, M&A scouting, and spatial computing tools.
          </p>
        </div>
        <div className="px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
          MRR: ${mrr.toLocaleString()}
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Feature 11: Dynamic Pricing Oracle */}
        <motion.div variants={item} className="lg:col-span-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl overflow-hidden shadow-xl p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <LineChart className="w-5 h-5 text-green-500 dark:text-[var(--color-neon-green)]" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Dynamic Pricing Oracle</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
             <div className="p-4 rounded-xl bg-white dark:bg-black/50 border border-black/5 dark:border-white/5 flex flex-col items-center">
               <span className="text-[10px] uppercase text-zinc-500 font-bold mb-2 tracking-widest">Base Plan</span>
               <span className="text-2xl font-bold text-slate-900 dark:text-white">$49</span>
               <span className="text-[10px] text-green-500 mt-1">Static</span>
             </div>
             <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex flex-col items-center shadow-[0_0_15px_rgba(34,197,94,0.1)]">
               <span className="text-[10px] uppercase text-green-500 font-bold mb-2 tracking-widest flex items-center gap-1"><Orbit className="w-3 h-3"/> Yield (Pro)</span>
               <span className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                 <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>$199</motion.span>
               </span>
               <span className="text-[10px] text-zinc-500 mt-1">Adjusted +15% based on demand</span>
             </div>
             <div className="p-4 rounded-xl bg-white dark:bg-black/50 border border-black/5 dark:border-white/5 flex flex-col items-center">
               <span className="text-[10px] uppercase text-zinc-500 font-bold mb-2 tracking-widest">Enterprise</span>
               <span className="text-2xl font-bold text-slate-900 dark:text-white">Custom</span>
               <span className="text-[10px] text-amber-500 mt-1">AI Negotiated</span>
             </div>
          </div>

          <div className="h-32 bg-zinc-100 dark:bg-zinc-950 rounded-xl border border-black/5 dark:border-white/5 p-4 relative overflow-hidden flex items-end">
            {/* Simulated Yield Curve */}
            <svg className="w-full h-full absolute inset-0 preserve-aspect-ratio-none opacity-50" viewBox="0 0 100 50">
               <motion.path 
                 d="M0,50 Q25,20 50,30 T100,10" 
                 fill="none" 
                 stroke="var(--color-neon-green)" 
                 strokeWidth="2"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 2, ease: "easeInOut" }}
               />
               <path d="M0,50 Q25,20 50,30 T100,10 L100,50 L0,50 Z" fill="url(#grad)" opacity="0.2"/>
               <defs>
                 <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="0%" stopColor="var(--color-neon-green)"/>
                   <stop offset="100%" stopColor="transparent"/>
                 </linearGradient>
               </defs>
            </svg>
            <div className="relative z-10 text-[10px] font-mono text-zinc-500 bg-black/50 px-2 py-1 rounded">
               Yield Optimization Engine: Generating +$14k MRR this month via smart pricing.
            </div>
          </div>
        </motion.div>

        {/* Feature 12: M&A Scout */}
        <motion.div variants={item} className="lg:col-span-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Autonomous M&A Scout</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            AI identifies startups for acquisition based on tech stack synergy and audience overlap.
          </p>
          <div className="flex-1 space-y-3">
            {[
              { name: "Acme Analytics", overlap: "84%", price: "$1.2M", action: "Drafting LOI" },
              { name: "Z-Forms", overlap: "71%", price: "$400k", action: "Evaluating" }
            ].map((target, i) => (
              <div key={i} className="flex flex-col p-3 bg-white dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-white">{target.name}</span>
                  <span className="text-[10px] text-amber-500">{target.price}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-zinc-500">Synergy: {target.overlap}</span>
                  <span className="text-red-500 font-mono">{target.action}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feature 13: Crypto Escrow */}
        <motion.div variants={item} className="lg:col-span-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Coins className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Web3 Escrow Closer</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            Automated milestone-based smart contracts for high-ticket B2B deals.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-yellow-500 font-mono tracking-widest break-all">0x7F...3B92</span>
                <span className="text-[10px] text-zinc-500">Milestone 2/3</span>
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-white">$45,000 USDC Locked</p>
              <div className="mt-3 w-full h-1 bg-yellow-500/20 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 w-[66%]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature 14: Cognitive Load Optimizer */}
        <motion.div variants={item} className="lg:col-span-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <LayoutDashboard className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Cognitive UI Optimizer</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6">
            Dashboard tracks mouse movements and dynamically rearranges its layout to maximize your workflow speed.
          </p>
          <div className="flex justify-center items-center h-24">
            <div className="w-full h-full relative flex flex-col gap-2 p-2 bg-black/20 rounded-lg">
               <motion.div layout className="h-6 w-full bg-indigo-500/20 rounded border border-indigo-500/30 flex items-center px-2 text-[8px] text-indigo-400">Layout adapting...</motion.div>
               <div className="flex gap-2 h-full">
                 <motion.div layout className="flex-1 bg-white/5 rounded border border-white/10" />
                 <motion.div layout className="w-1/3 bg-white/5 rounded border border-white/10" />
               </div>
            </div>
          </div>
        </motion.div>

        {/* Feature 15: Holographic Pitch Deck */}
        <motion.div variants={item} className="lg:col-span-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-5 h-5 text-cyan-500 dark:text-[var(--color-neon-blue)]" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Holographic Decks (WebGL)</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
            Replaces PDFs with hyper-personalized 3D spatial experiences trackable to the millisecond.
          </p>
          <div className="relative h-32 rounded-xl border border-cyan-500/30 bg-black/50 overflow-hidden flex items-center justify-center group cursor-pointer">
            <motion.div 
              className="absolute w-16 h-16 border-2 border-cyan-500 rounded-xl"
              animate={{ rotateX: 360, rotateY: 180 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            />
            <div className="absolute inset-0 bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/20 transition-colors" />
            <span className="relative z-10 text-xs font-bold text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
              Generate 3D Deck
            </span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}