import { useState } from "react";
import { Plus, Bot, Sparkles, X, Code2, Activity, Database, Brain } from "lucide-react";
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
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Agent Factory</h1>
          <p className="text-zinc-400">Crie e gerencie sua força de vendas autônoma.</p>
        </div>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Criar Novo Agente
          </button>
        )}
      </div>

      {/* Manual Form (No Framer Motion to prevent crashes) */}
      {isCreating && (
        <div className="mb-8 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-2xl block">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Bot className="w-6 h-6 text-indigo-500" />
                </div>
                <h2 className="text-xl font-bold text-white uppercase tracking-tight">Configurar Novo Agente</h2>
              </div>
              <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Nome do Agente</label>
                <input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Ex: Alpha-1" 
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 outline-none transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Função Primária</label>
                <input 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  placeholder="Ex: Prospecção B2B" 
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 outline-none transition-colors" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Personalidade & Tom de Voz</label>
                <input 
                  value={personality} 
                  onChange={(e) => setPersonality(e.target.value)} 
                  placeholder="Ex: Profissional, direto e focado em ROI" 
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-4 text-white focus:border-indigo-500 outline-none transition-colors" 
                />
              </div>
              
              <div className="md:col-span-2 space-y-3 pt-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Módulos de Habilidade</label>
                <div className="flex flex-wrap gap-2">
                  {SKILL_OPTIONS.map(skill => (
                    <button 
                      key={skill.id} 
                      type="button"
                      onClick={() => toggleSkill(skill.label)} 
                      className={cn(
                        "px-4 py-2 rounded-lg text-xs font-bold border transition-all flex items-center gap-2", 
                        selectedSkills.includes(skill.label) 
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                          : "bg-black/40 border-white/10 text-zinc-500 hover:border-white/30"
                      )}
                    >
                      <skill.icon className="w-3.5 h-3.5" />
                      {skill.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <button 
                onClick={handleCreateAgent} 
                className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/10 active:scale-[0.98]"
              >
                <Sparkles className="w-5 h-5" />
                Sintetizar Agente Autônomo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-[#121212] rounded-2xl p-6 border border-white/10 flex flex-col gap-6 group hover:border-indigo-500/50 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center border border-white/5 group-hover:bg-zinc-700 transition-colors">
                  <Bot className="w-6 h-6 text-zinc-300 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{agent.name}</h3>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{agent.role}</p>
                </div>
              </div>
              <div className={cn(
                "w-3 h-3 rounded-full mt-1", 
                agent.status === "online" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-zinc-600"
              )} />
            </div>
            
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <p className="text-xs text-zinc-400 italic">"{agent.personality}"</p>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {agent.skills.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 text-[9px] font-bold rounded border border-indigo-500/20 uppercase">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4 flex gap-3">
              <button className="flex-1 py-2 bg-white text-black rounded-xl font-bold text-xs uppercase hover:bg-zinc-200 transition-colors">Gerenciar</button>
              <button 
                onClick={() => toggleAgentStatus(agent.id)} 
                className={cn(
                  "px-4 py-2 rounded-xl font-bold text-xs uppercase border transition-all", 
                  agent.status === "online" ? "border-rose-900/50 text-rose-500 hover:bg-rose-500/10" : "border-emerald-900/50 text-emerald-500 hover:bg-emerald-500/10"
                )}
              >
                {agent.status === "online" ? "Desligar" : "Ativar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
