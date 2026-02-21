import { useState } from "react";
import { Zap, Workflow, Video, LineChart, Cpu, RefreshCcw, Camera, PlayCircle, BarChart3 } from "lucide-react";
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
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Zap className="w-8 h-8 text-yellow-500 dark:text-[var(--color-neon-blue)]" />
          Growth Engines
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 max-w-2xl">
          Sistemas de hipercrescimento impulsionados por IA autônoma. Otimização contínua e escalabilidade máxima de funil e ROI.
        </p>
      </div>

      <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-2xl w-fit border border-black/5 dark:border-white/10">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 outline-none",
                isActive ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="growth-engines-tabs"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 shadow-sm border border-black/5 dark:border-white/5 rounded-xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 relative rounded-3xl overflow-hidden glass-card p-6">
        <AnimatePresence mode="wait">
          {activeTab === "funnel" && (
            <motion.div key="funnel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-yellow-500" />
                    Auto-Healing Funnel Optimizer
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Sistemas de IA corrigindo conversão sem humanos.</p>
                </div>
                <button
                  onClick={startOptimization}
                  disabled={optimizing}
                  className="px-4 py-2 bg-yellow-500 text-black font-semibold rounded-xl text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg shadow-yellow-500/20 disabled:opacity-50 disabled:shadow-none"
                >
                  {optimizing ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
                  {optimizing ? "Reparando Funil..." : "Otimização Forçada"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {/* Gargalo */}
                <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center border border-red-200 dark:border-red-800">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-700 dark:text-red-400">Gargalo Detectado</h3>
                    <p className="text-sm text-red-600 dark:text-red-300 mt-2">
                      Conversão da página de preços caiu de 4.2% para 1.8% nas últimas 48h.
                    </p>
                  </div>
                </div>

                {/* Ação */}
                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center border border-yellow-200 dark:border-yellow-800">
                    <RefreshCcw className={cn("w-6 h-6", optimizing && "animate-spin")} />
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-700 dark:text-yellow-400">Ação Autônoma da IA</h3>
                    <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-2">
                      Lançando teste A/B: Substituindo título "Planos de Preços" por "ROI Imediato Garantido".
                    </p>
                  </div>
                </div>

                {/* Resolução */}
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden">
                  <div className={cn("absolute inset-0 bg-green-500/10 dark:bg-green-500/5", optimizing && "animate-pulse")} />
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center border border-green-200 dark:border-green-800 relative z-10">
                    <LineChart className="w-6 h-6" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-green-700 dark:text-green-400">Projeção de Cura</h3>
                    <p className="text-sm text-green-600 dark:text-green-300 mt-2">
                      Estima-se recuperação para 4.5% de conversão em 7 dias com base no histórico do segmento.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "deepfake" && (
            <motion.div key="deepfake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-500 dark:text-[var(--color-neon-purple)]" />
                  Gerador Deep-Fake (Avatar Pitch)
                </h2>
                <p className="text-sm text-slate-500 mt-1">Crie milhares de vídeos hiper-personalizados do fundador (Você) chamando o cliente pelo nome.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="bg-slate-50 dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col gap-4">
                  <h3 className="font-semibold text-sm">Configuração de Lote (Batch)</h3>
                  <textarea
                    placeholder="Cole os nomes dos leads separados por vírgula (ex: Marcos, Ana, Paulo)"
                    className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none"
                  />
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Avatar Base (Sintetizado)</p>
                    <div className="flex items-center gap-4 p-3 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-xl">
                      <div className="w-12 h-12 bg-slate-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                        <Camera className="w-5 h-5 text-slate-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">Avatar_CEO_Terno.mp4</p>
                        <p className="text-xs text-green-500">Modelo treinado (Pronto)</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={startGeneration}
                    disabled={generating}
                    className="mt-auto py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {generating ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <PlayCircle className="w-5 h-5" />}
                    {generating ? "Sintetizando 30 vídeos..." : "Gerar Lote de Vídeos"}
                  </button>
                </div>

                <div className="bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 relative flex flex-col items-center justify-center">
                  {generating ? (
                    <div className="text-center text-white">
                      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="font-mono text-sm">Renderizando lábio-sincronia...</p>
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <Video className="w-16 h-16 text-slate-700 dark:text-zinc-600 opacity-50" />
                      <div className="absolute bottom-4 left-4 right-4">
                         <div className="flex justify-between items-end mb-2">
                           <span className="text-xs font-mono text-purple-400 bg-purple-500/20 px-2 py-1 rounded">Preview: Lead "Roberto"</span>
                         </div>
                         <p className="text-sm text-slate-300 font-medium">"Fala <span className="text-white bg-purple-500/30 px-1 rounded font-bold">Roberto</span>, tudo bem? Vi que a sua empresa está..."</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "roi" && (
            <motion.div key="roi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-emerald-500 dark:text-[var(--color-neon-green)]" />
                  Previsão Quantum ROI (Monte Carlo)
                </h2>
                <p className="text-sm text-slate-500 mt-1">Simulações massivas projetando cenários exatos de lucro com a atual configuração de agentes.</p>
              </div>

              <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row gap-8 items-center h-full">
                <div className="flex-1 w-full space-y-6">
                  <div>
                    <h3 className="text-sm text-slate-500 font-semibold mb-1">Cenário Otimista (90% Confiança)</h3>
                    <p className="text-3xl font-bold text-green-500 dark:text-[var(--color-neon-green)]">+ $1.2M MRR</p>
                    <p className="text-xs text-slate-500 mt-1">Crescimento de 320% se agente Alpha manter 8% de taxa de conversão.</p>
                  </div>
                  <div className="w-full h-[1px] bg-slate-200 dark:bg-white/10" />
                  <div>
                    <h3 className="text-sm text-slate-500 font-semibold mb-1">Cenário Conservador (99% Confiança)</h3>
                    <p className="text-3xl font-bold text-blue-500">+ $450k MRR</p>
                    <p className="text-xs text-slate-500 mt-1">Crescimento de 150% se o mercado retrair em 20% no Q4.</p>
                  </div>
                </div>

                <div className="flex-1 w-full flex items-center justify-center">
                  <div className="w-64 h-64 border-4 border-dashed border-slate-200 dark:border-zinc-800 rounded-full flex flex-col items-center justify-center relative">
                    <div className="absolute inset-0 bg-emerald-500/5 rounded-full animate-pulse" />
                    <LineChart className="w-12 h-12 text-emerald-500 dark:text-[var(--color-neon-green)] mb-2 relative z-10" />
                    <p className="font-bold text-xl relative z-10">Simulação Ativa</p>
                    <p className="text-xs font-mono text-slate-400 relative z-10">Executando 10.000 iterações...</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
