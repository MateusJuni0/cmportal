import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Wallet, PieChart, Target, Zap } from "lucide-react";
import { cn } from "@/utils/cn";

export function QuantumTreasury() {
  const metrics = [
    { label: "MRR Total", value: "$124,500", change: "+12.5%", trend: "up", color: "text-emerald-500" },
    { label: "CAC Médio", value: "$42.10", change: "-8.2%", trend: "down", color: "text-blue-500" },
    { label: "LTV Agente", value: "$1,840", change: "+24.0%", trend: "up", color: "text-indigo-500" },
    { label: "Burn Rate", value: "$12,400", change: "Estável", trend: "neutral", color: "text-slate-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-white">
            <Wallet className="w-8 h-8 text-indigo-500" />
            Quantum Treasury
          </h1>
          <p className="text-zinc-400 max-w-2xl">
            Gestão financeira de alta frequência. Monitore o ROI gerado pelos seus enxames de agentes e a saúde do seu SaaS.
          </p>
        </div>
        <div className="px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
           <DollarSign className="w-3 h-3" /> Tesouraria Online
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#121212] p-6 border border-white/10 rounded-2xl shadow-xl group hover:border-indigo-500/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{metric.label}</span>
              <div className={cn(
                "p-2 rounded-lg bg-white/5",
                metric.color
              )}>
                {metric.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
            </div>
            <div className="flex items-end gap-2">
              <h2 className="text-2xl font-bold text-white">{metric.value}</h2>
              <span className={cn(
                "text-xs font-bold mb-1",
                metric.trend === "up" ? "text-emerald-500" : metric.trend === "down" ? "text-emerald-500" : "text-slate-500"
              )}>
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart Simulation */}
        <div className="lg:col-span-8 bg-[#121212] p-8 border border-white/10 rounded-3xl min-h-[400px] relative overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Projeção de ROI (Agentes vs Humano)
            </h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" /> Agentes
              </span>
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                <div className="w-2 h-2 rounded-full bg-zinc-700" /> Humano
              </span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-3 px-2">
             {[40, 55, 45, 70, 65, 85, 95, 80, 100].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full relative group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="w-full bg-indigo-600/20 border-t-2 border-indigo-500 rounded-t-sm"
                    />
                    <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-600">M{i+1}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Tactical Allocations */}
        <div className="lg:col-span-4 bg-[#121212] p-8 border border-white/10 rounded-3xl shadow-2xl">
           <h3 className="text-lg font-bold mb-8 flex items-center gap-2 text-white">
            <Target className="w-5 h-5 text-rose-500" />
            Alocação Tática
          </h3>
          <div className="space-y-8">
            {[
              { label: "Enxame de Prospecção", share: 45, color: "bg-indigo-500" },
              { label: "Manutenção de Infra", share: 25, color: "bg-blue-500" },
              { label: "Scraping & Intel", share: 20, color: "bg-emerald-500" },
              { label: "Fundo de Reserva", share: 10, color: "bg-zinc-600" },
            ].map((item, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-zinc-400">{item.label}</span>
                  <span className="text-white">{item.share}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.share}%` }}
                    className={cn("h-full shadow-[0_0_10px_rgba(255,255,255,0.1)]", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-xl flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            Otimizar Fluxo de Caixa
          </button>
        </div>
      </div>
    </div>
  );
}
