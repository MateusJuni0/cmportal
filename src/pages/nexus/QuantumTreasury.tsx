import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Wallet, Target, Zap, Activity } from "lucide-react";
import { cn } from "@/utils/cn";

export function QuantumTreasury() {
  const metrics = [
    { label: "MRR Total", value: "$124,500", change: "+12.5%", trend: "up", color: "text-emerald-400" },
    { label: "CAC Médio", value: "$42.10", change: "-8.2%", trend: "down", color: "text-blue-400" },
    { label: "LTV Agente", value: "$1,840", change: "+24.0%", trend: "up", color: "text-indigo-400" },
    { label: "Burn Rate", value: "$12,400", change: "Estável", trend: "neutral", color: "text-zinc-400" },
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-10 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
              <Wallet className="w-6 h-6 text-indigo-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
              Quantum <span className="text-indigo-500">Treasury</span>
            </h1>
          </div>
          <p className="text-zinc-500 font-medium ml-12">Monitor de ROI de Enxames de IA em Tempo Real.</p>
        </div>
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">Fluxo de Caixa Otimizado</span>
        </div>
      </div>

      {/* Metrics Grid - ELITE GLASS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative group cursor-pointer"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <div className="relative bg-[#0A0A0A] border border-white/5 p-6 rounded-2xl flex flex-col gap-4 overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{metric.label}</span>
                <div className={cn("p-1.5 rounded-md bg-white/5", metric.color)}>
                  {metric.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">{metric.value}</h2>
                <span className={cn("text-[10px] font-bold", metric.trend === "up" ? "text-emerald-400" : "text-rose-400")}>
                  {metric.change}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Chart Section - NEON POWER */}
        <div className="lg:col-span-8 relative">
           <div className="absolute -inset-0.5 bg-indigo-500/10 rounded-[2.5rem] blur-xl" />
           <div className="relative bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] min-h-[450px] shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-tighter italic">Projeção de Performance</h3>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Enxame IA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-zinc-800" />
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Equipa Humana</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 flex items-end justify-between gap-4 px-4">
                 {[35, 50, 42, 68, 60, 85, 92, 78, 100].map((h, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                      <div className="w-full relative h-full flex items-end">
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          className="w-full bg-gradient-to-t from-indigo-600/10 via-indigo-500/40 to-indigo-400 rounded-t-lg shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all"
                        />
                        {/* Human comparison line */}
                        <div className="absolute bottom-0 w-full h-[30%] bg-zinc-800/40 border-t border-zinc-700/50 rounded-t-sm" />
                      </div>
                      <span className="text-[9px] font-black text-zinc-600 uppercase">M{i+1}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Tactical Allocations - CYBER INDICATORS */}
        <div className="lg:col-span-4 bg-[#0A0A0A] border border-white/5 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full" />
          <h3 className="text-lg font-bold mb-10 flex items-center gap-3 text-white uppercase tracking-tighter italic">
            <Target className="w-5 h-5 text-rose-500" />
            Alocação Tática
          </h3>
          <div className="space-y-10">
            {[
              { label: "Enxame Prospecção", share: 45, color: "from-indigo-500 to-blue-500", glow: "shadow-indigo-500/20" },
              { label: "Infraestrutura", share: 25, color: "from-blue-500 to-cyan-500", glow: "shadow-blue-500/20" },
              { label: "Scraping & Intel", share: 20, color: "from-emerald-500 to-teal-500", glow: "shadow-emerald-500/20" },
              { label: "Reserva Capital", share: 10, color: "from-zinc-500 to-zinc-700", glow: "shadow-zinc-500/20" },
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.label}</span>
                  <span className="text-xs font-bold text-white font-mono">{item.share}%</span>
                </div>
                <div className="h-3 bg-zinc-900 rounded-full border border-white/5 p-[2px] overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.share}%` }}
                    className={cn("h-full rounded-full bg-gradient-to-r", item.color, item.glow)}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-12 py-5 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3 active:scale-[0.98]">
            <Zap className="w-4 h-4 fill-current" />
            Otimizar Fluxo
          </button>
        </div>
      </div>
    </div>
  );
}
