import { useState } from "react";
import { Zap, Workflow, Video, LineChart, Cpu, RefreshCcw, Camera, PlayCircle, BarChart3, TrendingUp } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "funnel", label: "Auto-Healing Funnel", icon: Workflow },
  { id: "deepfake", label: "Vídeo Pitch Deep-Fake", icon: Video },
  { id: "roi", label: "Previsão Quantum ROI", icon: LineChart },
];

export function GrowthEngines() {
  const [activeTab, setActiveTab] = useState("funnel");
  const [optimizing, setOptimizing] = useState(false);
  const [generating, setGenerating] = useState(false);

  const startOptimization = () => {
    setOptimizing(true);
    setTimeout(() => setOptimizing(false), 2500);
  };

  const startGeneration = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
              Growth <span className="text-blue-500">Engines</span>
            </h1>
          </div>
          <p className="text-zinc-500 font-medium ml-12">Sistemas de hipercrescimento impulsionados por IA autônoma.</p>
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-[#1A1A1A] rounded-2xl w-fit border border-white/5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 outline-none",
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="growth-engines-tabs"
                  className="absolute inset-0 bg-zinc-800 rounded-xl z-0 border border-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-[500px] relative rounded-[2.5rem] overflow-hidden bg-[#0A0A0A] border border-white/5 p-8 shadow-2xl">
        <AnimatePresence mode="wait">
          {activeTab === "funnel" && (
            <motion.div key="funnel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tight">
                    <Workflow className="w-5 h-5 text-blue-500" />
                    Auto-Healing Optimizer
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">Correção de conversão em tempo real</p>
                </div>
                <button
                  onClick={startOptimization}
                  disabled={optimizing}
                  className="px-6 py-3 bg-blue-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  {optimizing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
                  {optimizing ? "Reparando..." : "Otimização Forçada"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                {/* Gargalo */}
                <div className="bg-[#121212] border border-rose-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 relative group">
                  <div className="absolute inset-0 bg-rose-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center border border-rose-500/20">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-black text-rose-500 uppercase tracking-widest text-xs">Gargalo Detectado</h3>
                    <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-medium">
                      Conversão da página de preços caiu <span className="text-rose-500 font-bold">60%</span> nas últimas 48h.
                    </p>
                  </div>
                </div>

                {/* Ação */}
                <div className="bg-[#121212] border border-blue-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 relative group">
                  <div className="absolute inset-0 bg-blue-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center border border-blue-500/20">
                    <RefreshCcw className={cn("w-8 h-8", optimizing && "animate-spin")} />
                  </div>
                  <div>
                    <h3 className="font-black text-blue-500 uppercase tracking-widest text-xs">Ação Autônoma</h3>
                    <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-medium">
                      Lançando teste A/B: Substituindo título por <span className="text-blue-400 italic">"ROI Imediato Garantido"</span>.
                    </p>
                  </div>
                </div>

                {/* Resolução */}
                <div className="bg-[#121212] border border-emerald-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-6 relative group">
                   <div className="absolute inset-0 bg-emerald-500/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-500/20">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-black text-emerald-500 uppercase tracking-widest text-xs">Projeção de Cura</h3>
                    <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-medium">
                      Recuperação estimada para <span className="text-emerald-500 font-bold">4.5%</span> em 7 dias úteis.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "deepfake" && (
            <motion.div key="deepfake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-10">
              <div className="border-b border-white/5 pb-6">
                <h2 className="text-xl font-bold flex items-center gap-3 text-white uppercase tracking-tight">
                  <Video className="w-5 h-5 text-indigo-500" />
                  Gerador de Vídeo Pitch
                </h2>
                <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-medium">Sintetização de avatares para prospecção em massa</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-[#121212] p-8 rounded-3xl border border-white/5 flex flex-col gap-8 shadow-xl">
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Configuração de Lote</h3>
                    <textarea
                      placeholder="Cole os nomes dos leads separados por vírgula..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-indigo-500 outline-none h-32 resize-none transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Avatar Base</h3>
                    <div className="flex items-center gap-5 p-4 bg-black/40 border border-white/10 rounded-2xl group hover:border-indigo-500/30 transition-all">
                      <div className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center border border-white/5">
                        <Camera className="w-6 h-6 text-zinc-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white tracking-tight">Avatar_Sovereign_CEO.mp4</p>
                        <p className="text-[10px] text-emerald-500 font-bold uppercase mt-0.5">Modelo Renderizado</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={startGeneration}
                    disabled={generating}
                    className="mt-4 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-500/10 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                  >
                    {generating ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <PlayCircle className="w-5 h-5" />}
                    {generating ? "Sintetizando..." : "Gerar Lote de Vídeos"}
                  </button>
                </div>

                <div className="bg-black rounded-3xl overflow-hidden border border-white/10 relative flex flex-col items-center justify-center min-h-[350px] shadow-2xl">
                  {generating ? (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 border-[6px] border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_20px_rgba(99,102,241,0.4)]" />
                      <p className="font-mono text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] animate-pulse">Deep-Sync active...</p>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />
                      <Video className="w-16 h-16 text-zinc-800" />
                      <div className="absolute bottom-8 left-8 right-8 z-20">
                         <div className="mb-3">
                           <span className="text-[9px] font-black text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 uppercase tracking-widest">Preview: Lead "Roberto"</span>
                         </div>
                         <p className="text-sm text-zinc-300 font-medium leading-relaxed italic">
                           "Fala <span className="text-white font-black underline decoration-indigo-500">Roberto</span>, tudo bem? Vi que a sua empresa está enfrentando desafios com..."
                         </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "roi" && (
            <motion.div key="roi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-10 text-center items-center justify-center">
              <div className="space-y-4 max-w-xl">
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Previsão Quantum ROI</h2>
                <p className="text-zinc-500 text-sm font-medium">Simulações de Monte Carlo projetando rentabilidade com 99% de confiança.</p>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
                 <div className="bg-[#121212] p-10 rounded-[2rem] border border-white/5 space-y-4 group hover:border-emerald-500/30 transition-all">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Cenário Otimista</p>
                    <p className="text-5xl font-black text-emerald-500 tracking-tighter group-hover:scale-110 transition-transform">+ $1.2M</p>
                    <p className="text-xs text-zinc-500 font-medium uppercase mt-4">MRR Projetado p/ Q4</p>
                 </div>
                 <div className="bg-[#121212] p-10 rounded-[2rem] border border-white/5 space-y-4 group hover:border-blue-500/30 transition-all">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Cenário Base</p>
                    <p className="text-5xl font-black text-blue-500 tracking-tighter group-hover:scale-110 transition-transform">+ $450K</p>
                    <p className="text-xs text-zinc-500 font-medium uppercase mt-4">Conservador (99% Confiança)</p>
                 </div>
              </div>

              <div className="mt-6 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full">
                   <Activity className="w-3 h-3 text-emerald-500" />
                   <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Executando 10,000 Iterações em Tempo Real</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
