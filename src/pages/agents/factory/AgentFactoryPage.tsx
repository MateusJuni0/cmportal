import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Bot, Settings, Activity, Sparkles, Brain, Code2, Database, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAppStore } from "@/store";

const SKILL_OPTIONS = [
  { id: "cold-email", label: "Cold Email", icon: Code2 },
  { id: "linkedin", label: "LinkedIn", icon: Activity },
  { id: "crm", label: "Integração CRM", icon: Database },
  { id: "analysis", label: "Análise de Dados", icon: Brain },
];

export function AgentFactory() {
  const { agents, addAgent, toggleAgentStatus } = useAppStore();
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [personality, setPersonality] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !personality) return;

    addAgent({
      name,
      role,
      personality,
      status: "offline",
      skills: selectedSkills.length > 0 ? selectedSkills : ["Geral"],
    });
    setIsCreating(false);
    
    // Reset Form
    setName("");
    setRole("");
    setPersonality("");
    setSelectedSkills([]);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">Agent Factory</h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Crie e gerencie sua força de vendas autônoma. Sem código, apenas instruções.
          </p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Criar Novo Agente
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xl relative z-50"
          >
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                    <Bot className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Configuração do Agente</h2>
                </div>
                <button onClick={() => setIsCreating(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nome</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Clara"
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Função</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Outbound"
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Personalidade</label>
                  <input
                    type="text"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {SKILL_OPTIONS.map((skill) => {
                      const isSelected = selectedSkills.includes(skill.label);
                      return (
                        <button
                          type="button"
                          key={skill.id}
                          onClick={() => toggleSkill(skill.label)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-xs font-bold border transition-all",
                            isSelected 
                              ? "bg-indigo-600 border-indigo-600 text-white" 
                              : "bg-transparent border-slate-200 dark:border-white/10 text-slate-500 hover:border-indigo-500"
                          )}
                        >
                          {skill.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-white/5">
                <button
                  type="submit"
                  onClick={handleCreateAgent}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-bold flex items-center gap-2 hover:bg-indigo-700 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Sintetizar Agente
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className={cn(
                "absolute -inset-0.5 rounded-2xl blur opacity-20 group-hover:opacity-100 transition duration-500",
                agent.status === 'online' ? "bg-emerald-500" : "bg-slate-500"
              )} />
              
              <div className="relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-white/10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/5">
                      <Bot className="w-6 h-6 text-slate-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{agent.name}</h3>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{agent.role}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    agent.status === "online" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-slate-400"
                  )} />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="p-3 bg-slate-50 dark:bg-black/40 rounded-xl border border-slate-100 dark:border-white/5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Personalidade</p>
                    <p className="text-sm text-slate-700 dark:text-zinc-300">"{agent.personality}"</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {agent.skills.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded border border-indigo-100 dark:border-indigo-900/50 uppercase tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button className="flex-1 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest">
                    Gerenciar
                  </button>
                  <button 
                    onClick={() => toggleAgentStatus(agent.id)}
                    className={cn(
                    "px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-colors",
                    agent.status === "online" ? "border-rose-200 text-rose-500" : "border-emerald-200 text-emerald-500"
                  )}>
                    {agent.status === "online" ? "Off" : "On"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
