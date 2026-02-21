import { useState } from "react";
import { LineChart, Globe, Eye, Activity, UserMinus, ShieldAlert, Crosshair, Map, MessageSquare } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "churn", label: "Previsão de Churn", icon: UserMinus },
  { id: "heatmap", label: "Mapa 3D Global", icon: Globe },
  { id: "matrix", label: "Matriz Concorrentes", icon: Crosshair },
  { id: "social", label: "Dark Social Matrix", icon: Eye },
];

export function MarketIntelligence() {
  const [activeTab, setActiveTab] = useState("churn");

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3 text-slate-900 dark:text-white">
          <LineChart className="w-8 h-8 text-indigo-500" />
          Market Intelligence Hub
        </h1>
        <p className="text-slate-500 dark:text-zinc-400 max-w-2xl">
          Análise preditiva, espionagem de concorrentes e escuta profunda de redes sociais não rastreáveis. 
          Onde os dados se tornam armas.
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
                  layoutId="market-intel-tabs"
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

      <div className="flex-1 min-h-[400px] relative rounded-3xl overflow-hidden glass-card p-6 border border-slate-200 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {activeTab === "churn" && (
            <motion.div key="churn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
                  <Activity className="w-5 h-5 text-rose-500" />
                  Radar de Risco de Churn (IA)
                </h2>
                <div className="text-sm px-3 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full font-medium border border-rose-200 dark:border-rose-900/50">
                  3 Clientes em Zona Crítica
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "TechCorp Ltda", risk: 89, reason: "Redução de login de 60% nos últimos 14 dias.", action: "Acionar agente Bravo para call." },
                  { name: "Nexus SaaS", risk: 74, reason: "Uso estagnado de features chave. NPS caiu.", action: "Disparar fluxo de reengajamento." },
                  { name: "Global Finance", risk: 65, reason: "Ticket de suporte sem resposta > 48h.", action: "Escalar para Customer Success humano." },
                ].map((client, i) => (
                  <div key={i} className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 p-5 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-900 dark:text-white">{client.name}</h3>
                      <span className="text-rose-500 font-mono text-xs font-bold bg-rose-50 dark:bg-rose-950/50 px-2 py-1 rounded">Risco: {client.risk}%</span>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Motivo Detectado</p>
                      <p className="text-sm text-slate-700 dark:text-zinc-300">{client.reason}</p>
                    </div>
                    <button className="mt-auto w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-medium hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors">
                      Executar Ação Preventiva
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "heatmap" && (
            <motion.div key="heatmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center relative min-h-[400px]">
              <div className="absolute top-0 left-0">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
                  <Map className="w-5 h-5 text-indigo-500" />
                  Mapa de Calor 3D - Prospecção
                </h2>
                <p className="text-sm text-slate-500 mt-1">Concentre seus agentes onde a demanda está fervendo.</p>
              </div>
              <div className="w-64 h-64 rounded-full border-4 border-dashed border-indigo-500/20 dark:border-indigo-500/20 flex items-center justify-center relative animate-[spin_60s_linear_infinite]">
                <div className="absolute w-48 h-48 rounded-full border border-indigo-500/30" />
                <div className="absolute w-32 h-32 rounded-full border border-indigo-500/40" />
                <Globe className="w-16 h-16 text-indigo-500 opacity-50" />
                
                {/* Hotspots */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-rose-500/50 rounded-full blur-sm animate-pulse" />
                <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-amber-500/50 rounded-full blur-sm animate-pulse delay-150" />
                <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-rose-500/50 rounded-full blur-xs animate-pulse delay-300" />
              </div>
            </motion.div>
          )}

          {activeTab === "matrix" && (
            <motion.div key="matrix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
                  <ShieldAlert className="w-5 h-5 text-orange-500" />
                  Matriz Scraper de Concorrentes
                </h2>
                <p className="text-sm text-slate-500 mt-1">IA monitorando mudanças de preço e features rivais em tempo real.</p>
              </div>
              <div className="bg-white/50 dark:bg-black/20 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-black/40">
                    <tr>
                      <th className="p-4 font-semibold text-slate-700 dark:text-zinc-300">Concorrente</th>
                      <th className="p-4 font-semibold text-slate-700 dark:text-zinc-300">Última Mudança</th>
                      <th className="p-4 font-semibold text-slate-700 dark:text-zinc-300">Preço Atual</th>
                      <th className="p-4 font-semibold text-slate-700 dark:text-zinc-300">Diferencial Crítico</th>
                      <th className="p-4 font-semibold text-slate-700 dark:text-zinc-300">Ação IA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                    <tr>
                      <td className="p-4 font-medium text-slate-900 dark:text-white">Alpha CRM</td>
                      <td className="p-4 text-orange-500 font-medium">Nova feature IA</td>
                      <td className="p-4 text-slate-600 dark:text-zinc-400">$199/m</td>
                      <td className="p-4 text-xs">Foco em Enterprise</td>
                      <td className="p-4">
                        <button className="px-3 py-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded-lg text-xs hover:bg-slate-50 transition-colors">
                          Ajustar Pitch
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900 dark:text-white">SalesBot Inc</td>
                      <td className="p-4 text-emerald-500 font-medium">Preço subiu 15%</td>
                      <td className="p-4 text-slate-600 dark:text-zinc-400">$250/m</td>
                      <td className="p-4 text-xs">Chatbots simples</td>
                      <td className="p-4">
                        <button className="px-3 py-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded-lg text-xs hover:bg-slate-50 transition-colors">
                          Campanha Desconto
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-slate-900 dark:text-white">Omega Outbound</td>
                      <td className="p-4 text-slate-400 font-medium">Sem alterações</td>
                      <td className="p-4 text-slate-600 dark:text-zinc-400">$150/m</td>
                      <td className="p-4 text-xs">Sem automação de voz</td>
                      <td className="p-4">
                        <button className="px-3 py-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 rounded-lg text-xs hover:bg-slate-50 transition-colors">
                          Destacar Voz IA
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "social" && (
            <motion.div key="social" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
                  <MessageSquare className="w-5 h-5 text-indigo-500" />
                  Dark Social Listening Matrix
                </h2>
                <p className="text-sm text-slate-500 mt-1">Intercepte intenções ocultas em comunidades privadas.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { source: "Slack: RevOps Community", content: "Alguém conhece uma alternativa ao Salesforce que tenha IA nativa?", intent: "Alta", time: "Há 5 min", post: "Vimos o post no canal #alternatives" },
                  { source: "Discord: SaaS Founders", content: "Nosso SDR não tá batendo a meta. Ferramentas de outbound?", intent: "Muito Alta", time: "Há 12 min", post: "Mensagem direta no canal #growth" },
                  { source: "Reddit: r/sales", content: "Essas ferramentas de cold email tão todas iguais. Precisamos de personalização.", intent: "Média", time: "Há 1 hora", post: "Thread sobre automação" },
                  { source: "Telegram: Growth Hackers", content: "Churn de 10% esse mês. Socorro.", intent: "Alta", time: "Há 3 horas", post: "Mensagem no grupo VIP" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-xl relative group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[8px] font-bold uppercase tracking-wider rounded-bl-lg border-l border-b border-indigo-100">
                      INTENÇÃO: {item.intent}
                    </div>
                    <p className="text-[10px] text-slate-400 mb-2 font-mono flex items-center gap-2">
                      <Eye className="w-3 h-3" /> {item.source} • {item.time}
                    </p>
                    <p className="text-sm font-medium text-slate-800 dark:text-zinc-200 mb-2">"{item.content}"</p>
                    <p className="text-[10px] text-indigo-500/70 mb-4 italic">{item.post}</p>
                    <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all hover:scale-105">
                      Engajar com Agente ALFA
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
