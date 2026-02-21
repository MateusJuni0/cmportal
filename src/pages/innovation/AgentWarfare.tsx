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
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-white">
            <ShieldAlert className="w-8 h-8 text-rose-500" />
            Agent Warfare Hub
          </h1>
          <p className="text-zinc-400 max-w-2xl">
            Estratégias ofensivas avançadas. Clone o discurso da concorrência e execute simulações táticas.
          </p>
        </div>
        <div className="px-4 py-2 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 animate-pulse">
           <Zap className="w-3 h-3" /> Modo Ofensivo Ativo
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
                "relative px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-tight transition-all flex items-center gap-2 outline-none",
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="agent-warfare-tabs"
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

      <div className="flex-1 min-h-[500px] relative rounded-3xl overflow-hidden bg-[#121212] border border-white/10 p-8 shadow-2xl">
        <AnimatePresence mode="wait">
          {activeTab === "clone" && (
            <motion.div key="clone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Mic className="w-5 h-5 text-rose-500" />
                  Infiltração de Discurso
                </h2>
                <span className="text-[10px] font-bold text-rose-500/70 uppercase">Arma Classe-S</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Insira a URL do concorrente. A IA mapeará os padrões linguísticos e criará um agente treinado para destruir as objeções do rival durante a prospecção.
                  </p>
                  
                  <div className="space-y-4">
                    <input
                      type="url"
                      placeholder="https://concorrente-vulneravel.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-rose-500 outline-none transition-all shadow-inner"
                    />
                    <button
                      onClick={startCloning}
                      disabled={cloningState !== "idle"}
                      className={cn(
                        "w-full py-4 rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3",
                        cloningState === "idle" ? "bg-rose-600 hover:bg-rose-500 text-white" : 
                        cloningState === "cloning" ? "bg-zinc-800 text-zinc-500 cursor-wait" : 
                        "bg-emerald-600 text-white"
                      )}
                    >
                      {cloningState === "idle" && <><Play className="w-4 h-4" /> Iniciar Infiltração</>}
                      {cloningState === "cloning" && <><Activity className="w-4 h-4 animate-spin" /> Mapeando Neuro-Padrões...</>}
                      {cloningState === "success" && <><Zap className="w-4 h-4" /> Discurso Clonado com Sucesso</>}
                    </button>
                  </div>
                </div>
                
                <div className="relative rounded-2xl border border-white/5 bg-black/40 p-8 flex flex-col items-center justify-center text-center group">
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-500/5 to-transparent pointer-events-none" />
                  
                  {cloningState === "idle" && (
                    <div className="space-y-4">
                      <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto border border-white/5 shadow-2xl">
                        <Mic className="w-10 h-10 text-zinc-600" />
                      </div>
                      <p className="text-xs text-zinc-500 uppercase tracking-tighter">Aguardando Alvo</p>
                    </div>
                  )}

                  {cloningState === "cloning" && (
                    <div className="flex gap-1.5 items-end h-20">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((bar) => (
                        <motion.div
                          key={bar}
                          className="w-5 bg-rose-500 rounded-t-sm shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                          animate={{ height: ["20%", "100%", "20%"] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: bar * 0.1 }}
                        />
                      ))}
                    </div>
                  )}

                  {cloningState === "success" && (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
                      <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto border border-rose-500/30 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                        <MessageSquareCode className="w-10 h-10 text-rose-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2">Agente "Rival-Killer" Ativo</h3>
                        <p className="text-xs text-zinc-500 max-w-xs">
                          Mapeamos 14 vulnerabilidades no discurso de valor do concorrente. Objeções carregadas no cérebro do Alpha.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "warroom" && (
            <motion.div key="warroom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
               {/* WarRoom Layout simplified for stability */}
               <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <BrainCircuit className="w-5 h-5 text-indigo-500" />
                  War Room Multi-Agente
                </h2>
                <button onClick={() => setWarRoomActive(!warRoomActive)} className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg uppercase tracking-widest hover:bg-indigo-500 transition-all">
                  {warRoomActive ? "Pausar Tática" : "Simular Combate"}
                </button>
              </div>
              <div className="flex-1 bg-black rounded-xl border border-white/5 p-6 font-mono text-xs overflow-y-auto">
                {!warRoomActive ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-700">
                    <Cpu className="w-8 h-8 mb-2 opacity-30" />
                    Sistemas Offline
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-emerald-500">[SYSTEM] Analisando alvo: Coca-Cola Enterprise...</p>
                    <p className="text-blue-400"><span className="text-white font-bold">ALPHA:</span> Focar em ROI (30% redução custos).</p>
                    <p className="text-purple-400"><span className="text-white font-bold">BRAVO:</span> Negativo. Prioridade deles é Segurança/SLA.</p>
                    <p className="text-amber-400"><span className="text-white font-bold">CHARLIE:</span> Consenso: Usar SLA alto como prova de economia indireta.</p>
                    <p className="text-emerald-500 animate-pulse">[SYSTEM] Gerando e-mail de infiltração...</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
