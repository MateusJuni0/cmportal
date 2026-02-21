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
    setName(""); setRole(""); setPersonality(""); setSelectedSkills([]);
  };

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col gap-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Agent Factory</h1>
          <p className="text-zinc-400">Crie e gerencie sua força de vendas autônoma.</p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Criar Novo Agente
          </button>
        )}
      </div>

      {isCreating && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl overflow-hidden">
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-indigo-500" />
                <h2 className="text-xl font-bold text-white">Novo Agente</h2>
              </div>
              <X onClick={() => setIsCreating(false)} className="w-6 h-6 text-zinc-500 cursor-pointer" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" className="bg-black/50 border border-white/10 rounded-xl p-4 text-white" />
              <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Função" className="bg-black/50 border border-white/10 rounded-xl p-4 text-white" />
              <input value={personality} onChange={(e) => setPersonality(e.target.value)} placeholder="Personalidade" className="md:col-span-2 bg-black/50 border border-white/10 rounded-xl p-4 text-white" />
              
              <div className="md:col-span-2 space-y-3">
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {SKILL_OPTIONS.map(skill => (
                    <button key={skill.id} onClick={() => toggleSkill(skill.label)} className={cn("px-4 py-2 rounded-lg text-xs font-bold border", selectedSkills.includes(skill.label) ? "bg-indigo-600 text-white" : "text-zinc-500 border-white/10")}>
                      {skill.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={handleCreateAgent} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all">
              Sintetizar Agente
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-zinc-900 rounded-2xl p-6 border border-white/10 flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center border border-white/5">
                  <Bot className="w-6 h-6 text-zinc-300" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{agent.name}</h3>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{agent.role}</p>
                </div>
              </div>
              <div className={cn("w-3 h-3 rounded-full", agent.status === "online" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-zinc-600")} />
            </div>
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <p className="text-xs text-zinc-300">"{agent.personality}"</p>
            </div>
            <div className="mt-auto flex gap-3">
              <button className="flex-1 py-2 bg-white text-black rounded-xl font-bold text-xs uppercase">Gerenciar</button>
              <button onClick={() => toggleAgentStatus(agent.id)} className={cn("px-4 py-2 rounded-xl font-bold text-xs uppercase border", agent.status === "online" ? "border-rose-900 text-rose-500" : "border-emerald-900 text-emerald-500")}>
                {agent.status === "online" ? "Off" : "On"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
