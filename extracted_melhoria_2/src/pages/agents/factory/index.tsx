import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Bot, Settings, Activity, Sparkles, Brain, Code2, Database } from "lucide-react";
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
          <h1 className="text-3xl font-bold tracking-tight mb-2">Agent Factory</h1>
          <p className="text-slate-500 dark:text-zinc-400">
            Crie e gerencie sua força de vendas autônoma. Sem código, apenas instruções.
          </p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" />
            Criar Novo Agente
          </button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="glass-card overflow-hidden"
          >
            <form onSubmit={handleCreateAgent} className="p-6 md:p-8 space-y-6 border-l-4 border-brand-500 dark:border-[var(--color-neon-blue)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-brand-100 dark:bg-brand-900/30 rounded-lg text-brand-600 dark:text-[var(--color-neon-blue)]">
                  <Bot className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">Configuração Inicial do Agente</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Nome do Agente</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Clara, Vendedora Senior"
                    className="w-full bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all neumorph dark:neumorph"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Função (O que ele faz?)</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Especialista em outbound para SaaS"
                    className="w-full bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all neumorph dark:neumorph"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Personalidade (Tom de voz)</label>
                  <input
                    type="text"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    placeholder="Ex: Profissional, mas descontraído. Foco em resolver problemas."
                    className="w-full bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all neumorph dark:neumorph"
                    required
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-zinc-300">Skills Iniciais</label>
                  <div className="flex flex-wrap gap-3">
                    {SKILL_OPTIONS.map((skill) => {
                      const isSelected = selectedSkills.includes(skill.label);
                      const Icon = skill.icon;
                      return (
                        <button
                          type="button"
                          key={skill.id}
                          onClick={() => toggleSkill(skill.label)}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                            isSelected 
                              ? "bg-brand-50 dark:bg-brand-900/20 border-brand-500 dark:border-[var(--color-neon-blue)] text-brand-700 dark:text-[var(--color-neon-blue)]" 
                              : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:border-slate-300 dark:hover:border-white/20"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {skill.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Sintetizar Agente
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full"
            >
              {/* Animated Glow Backdrop */}
              <div className={cn(
                "absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200",
                agent.status === 'online' ? "bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-blue)]" : "bg-gradient-to-r from-slate-400 to-slate-500 dark:from-zinc-600 dark:to-zinc-700"
              )} />
              
              <div className="relative h-full bg-white dark:bg-zinc-900 rounded-2xl p-6 flex flex-col border border-slate-200 dark:border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/5">
                        <Bot className="w-6 h-6 text-slate-700 dark:text-zinc-300" />
                      </div>
                      <span className={cn(
                        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm",
                        agent.status === "online" ? "bg-green-500 dark:bg-[var(--color-neon-green)] shadow-[0_0_10px_var(--color-neon-green)]" : "bg-slate-400 dark:bg-zinc-500"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{agent.name}</h3>
                      <p className="text-xs font-medium text-slate-500 dark:text-zinc-400 uppercase tracking-wider">{agent.role}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors bg-slate-50 dark:bg-zinc-800/50 rounded-lg">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="bg-slate-50 dark:bg-black/20 p-3 rounded-xl border border-slate-100 dark:border-white/5">
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mb-1">Personalidade</p>
                    <p className="text-sm font-medium text-slate-700 dark:text-zinc-300">"{agent.personality}"</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mb-2">Skills Ativas</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 text-xs font-medium rounded-md border border-brand-200 dark:border-brand-800/30">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex gap-3">
                  <button className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors">
                    Gerenciar
                  </button>
                  <button 
                    onClick={() => toggleAgentStatus(agent.id)}
                    className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors",
                    agent.status === "online" 
                      ? "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/20" 
                      : "border-green-200 text-green-600 hover:bg-green-50 dark:border-green-900/30 dark:text-[var(--color-neon-green)] dark:hover:bg-green-900/20"
                  )}>
                    {agent.status === "online" ? "Desativar" : "Ativar"}
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
