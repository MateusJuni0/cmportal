import { motion } from "framer-motion";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Wallet, PieChart, Target, Zap } from "lucide-react";

export function QuantumTreasury() {
  const metrics = [
    { label: "MRR Total", value: "$124,500", change: "+12.5%", trend: "up", color: "text-emerald-500" },
    { label: "CAC Médio", value: "$42.10", change: "-8.2%", trend: "down", color: "text-blue-500" },
    { label: "LTV Agente", value: "$1,840", change: "+24.0%", trend: "up", color: "text-indigo-500" },
    { label: "Burn Rate", value: "$12,400", change: "Estável", trend: "neutral", color: "text-slate-500" },
  ];

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-slate-900 dark:text-white">
          <Wallet className="w-8 h-8 text-indigo-500" />
          Quantum Treasury
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 max-w-2xl">
          Gestão financeira de alta frequência. Monitore o ROI gerado pelos seus enxames de agentes e a saúde do seu SaaS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-widest">{metric.label}</span>
              <div className={cn(
                "p-2 rounded-lg bg-black/5 dark:bg-white/5",
                metric.color
              )}>
                {metric.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              </div>
            </div>
            <div className="flex items-end gap-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</h2>
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
        <div className="lg:col-span-8 glass-card p-8 border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl min-h-[400px] relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              Projeção de ROI (Agentes vs Humano)
            </h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-indigo-500">
                <div className="w-2 h-2 rounded-full bg-indigo-500" /> Agentes
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <div className="w-2 h-2 rounded-full bg-slate-400" /> Humano
              </span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4">
             {[40, 55, 45, 70, 65, 85, 95, 80, 100].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="w-full bg-indigo-500/20 border-t-2 border-indigo-500 rounded-t-lg relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <span className="text-[10px] text-slate-400">M{i+1}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Tactical Allocations */}
        <div className="lg:col-span-4 glass-card p-6 border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
            <Target className="w-5 h-5 text-rose-500" />
            Alocação Tática
          </h3>
          <div className="space-y-6">
            {[
              { label: "Enxame de Prospecção", share: 45, color: "bg-indigo-500" },
              { label: "Manutenção de Infra", share: 25, color: "bg-blue-500" },
              { label: "Scraping & Intel", share: 20, color: "bg-emerald-500" },
              { label: "Fundo de Reserva", share: 10, color: "bg-slate-400" },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-zinc-300">{item.label}</span>
                  <span className="text-slate-900 dark:text-white">{item.share}%</span>
                </div>
                <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.share}%` }}
                    className={cn("h-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            Otimizar Orçamento
          </button>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
