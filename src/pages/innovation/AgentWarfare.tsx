import { useState } from "react";
import { ShieldAlert, Mic, MessageSquareCode, BrainCircuit, Play, Cpu, Zap, Activity } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "clone", label: "Clonagem de Tom (Rival)", icon: Mic },
  { id: "warroom", label: "War Room Multi-Agente", icon: BrainCircuit },
  { id: "nlp", label: "Tracker de Sentimento (NLP)", icon: Activity },
];

export function AgentWarfare() {
  const [activeTab, setActiveTab] = useState("clone");
  const [cloningState, setCloningState] = useState<"idle" | "cloning" | "success">("idle");
  const [warRoomActive, setWarRoomActive] = useState(false);

  const startCloning = () => {
    setCloningState("cloning");
    setTimeout(() => setCloningState("success"), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-red-500 dark:text-[var(--color-neon-pink)]" />
          Agent Warfare Hub
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 max-w-2xl">
          Estratégias ofensivas avançadas. Clone o discurso da concorrência, faça seus agentes debaterem estratégias e rastreie emoções em tempo real.
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
                  layoutId="agent-warfare-tabs"
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
          {activeTab === "clone" && (
            <motion.div key="clone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Mic className="w-5 h-5 text-red-500" />
                  Clonagem de Tom de Voz
                </h2>
                <div className="text-sm px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-[var(--color-neon-pink)] rounded-full font-medium border border-red-200 dark:border-red-900/50">
                  Arma Ofensiva
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="flex flex-col gap-4 bg-slate-50 dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-white/5">
                  <p className="text-sm text-slate-600 dark:text-zinc-400 mb-2">
                    Insira a URL do site ou um PDF da concorrência. A IA analisará as falhas no discurso deles e criará um agente treinado especificamente para contra-argumentar cada ponto durante a prospecção.
                  </p>
                  <input
                    type="url"
                    placeholder="URL do Concorrente (ex: https://rival.com)"
                    className="w-full bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    onClick={startCloning}
                    disabled={cloningState !== "idle"}
                    className="mt-4 w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {cloningState === "idle" && <><Play className="w-4 h-4" /> Iniciar Infiltração e Clonagem</>}
                    {cloningState === "cloning" && <><Activity className="w-4 h-4 animate-spin" /> Mapeando Padrões Neurolinguísticos...</>}
                    {cloningState === "success" && <><Zap className="w-4 h-4" /> Tom de Voz Clonado!</>}
                  </button>
                </div>
                
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl relative overflow-hidden">
                  {cloningState === "idle" && <Mic className="w-16 h-16 text-slate-300 dark:text-zinc-700" />}
                  {cloningState === "cloning" && (
                    <div className="flex gap-1 items-end h-16">
                      {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
                        <motion.div
                          key={bar}
                          className="w-4 bg-red-500 rounded-t-sm"
                          animate={{ height: ["20%", "100%", "20%"] }}
                          transition={{ repeat: Infinity, duration: 1, delay: bar * 0.1 }}
                        />
                      ))}
                    </div>
                  )}
                  {cloningState === "success" && (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200 dark:border-red-800/50">
                        <MessageSquareCode className="w-8 h-8 text-red-600 dark:text-[var(--color-neon-pink)]" />
                      </div>
                      <h3 className="font-bold mb-2">Agente "Rival-Killer" Gerado</h3>
                      <p className="text-xs text-slate-500">
                        Identificamos 14 fraquezas na proposta de valor. O agente foi equipado com objeções predefinidas.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "warroom" && (
            <motion.div key="warroom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-500" />
                  Centro de Comando Multi-Agente
                </h2>
                <button
                  onClick={() => setWarRoomActive(!warRoomActive)}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-500 transition-colors"
                >
                  {warRoomActive ? "Pausar Simulação" : "Iniciar Simulação de Abordagem"}
                </button>
              </div>

              <div className="flex-1 bg-black/90 rounded-2xl border border-white/10 p-6 flex flex-col relative font-mono overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                
                <div className="flex-1 overflow-y-auto space-y-4 pr-4 text-sm z-10">
                  {!warRoomActive ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                      <Cpu className="w-12 h-12 mb-4 opacity-50" />
                      Aguardando inicialização da rede neural do War Room.
                    </div>
                  ) : (
                    <>
                      <div className="text-green-500">[System] Inciando simulação de venda para "Conta Enterprise - Coca-Cola".</div>
                      <div className="text-blue-400 mt-2">
                        <span className="font-bold">[Alpha - SDR]:</span> Analisando perfil do Diretor de Compras. Ele prioriza redução de custos operacionais (30%). Sugiro focar no ROI imediato no primeiro contato.
                      </div>
                      <div className="text-purple-400 mt-2">
                        <span className="font-bold">[Bravo - Closer]:</span> Discordo, Alpha. Decisores em corporações desse tamanho priorizam "Segurança" e "SLA". Se focarmos muito em preço, parecemos baratos. Vamos destacar nossos certificados ISO primeiro.
                      </div>
                      <div className="text-yellow-400 mt-2">
                        <span className="font-bold">[Charlie - Analista]:</span> Probabilidade de sucesso da abordagem Bravo: 82%. Probabilidade Alpha: 45%. Recomendo mesclar: Focar no SLA alto que, por consequência, reduz o custo invisível de paradas.
                      </div>
                      <div className="text-green-500 mt-2 animate-pulse">[System] Consenso atingido. Gerando e-mail otimizado...</div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "nlp" && (
            <motion.div key="nlp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[var(--color-neon-blue)]" />
                  NLP Sentiment Tracker
                </h2>
                <p className="text-sm text-slate-500 mt-1">Análise em tempo real do estado emocional do lead para adaptar o pitch instantaneamente.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Current Call/Chat */}
                 <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6">
                   <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-slate-500">Live Transcript: João (Lead)</h3>
                   <div className="space-y-4">
                     <p className="text-sm"><span className="font-bold text-slate-700 dark:text-zinc-300">João:</span> "Eu não sei, o preço parece meio salgado pra gente agora, e não tenho certeza sobre a implementação..."</p>
                     
                     <div className="p-4 bg-white dark:bg-black border-l-4 border-yellow-500 rounded-lg shadow-sm">
                       <p className="text-xs font-mono text-yellow-600 dark:text-yellow-400 font-bold mb-1">DETECÇÃO NLP: Ceticismo / Objeção de Custo (88%)</p>
                       <p className="text-sm text-slate-600 dark:text-zinc-400">Agente Alpha ajustando tom para <span className="font-semibold underline text-blue-500">Empático + Orientado a Valor</span>.</p>
                     </div>

                     <p className="text-sm"><span className="font-bold text-blue-600 dark:text-[var(--color-neon-blue)]">Alpha (IA):</span> "Entendo perfeitamente sua preocupação com a implementação, João. Que tal dividirmos o processo em fases para não pesar no fluxo de caixa agora?"</p>
                   </div>
                 </div>

                 {/* Sentiment Metrics */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                      <div className="text-3xl font-bold text-green-500">74%</div>
                      <div className="text-sm font-medium text-slate-600 dark:text-zinc-400">Score de Prontidão (Eagerness)</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                      <div className="text-3xl font-bold text-red-500">12%</div>
                      <div className="text-sm font-medium text-slate-600 dark:text-zinc-400">Nível de Frustração</div>
                    </div>
                    <div className="col-span-2 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-700 dark:text-zinc-300">Tensão Conversacional</span>
                      <div className="w-1/2 h-2 bg-slate-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-yellow-400 rounded-full" />
                      </div>
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
