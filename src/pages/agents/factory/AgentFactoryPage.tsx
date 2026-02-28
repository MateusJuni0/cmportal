import { useState } from "react";
import { Plus, Bot, Sparkles, X, Code2, Activity, Database, Brain, Zap, Shield, Target, Cpu } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";

// Mock para evitar erros de import de store se não estiver 100%
const mockAgents = [
  { id: '1', name: 'NEURO-SDR', role: 'Prospecção LinkedIn', personality: 'Direto, focado em conversão e ROI.', status: 'online', skills: ['LinkedIn', 'Cold Outreach'] },
  { id: '2', name: 'VULKAN-CODE', role: 'DevOps & Backend', personality: 'Técnico, preciso e implacável com bugs.', status: 'offline', skills: ['Docker', 'Git', 'Node.js'] },
  { id: '3', name: 'PIXEL-PERFECT', role: 'Frontend Architect', personality: 'Estético, detalhista e focado em UX.', status: 'online', skills: ['React', 'Framer Motion'] },
];

const SKILL_OPTIONS = [
  { id: "cold-email", label: "Cold Email", icon: Zap, color: "text-amber-400" },
  { id: "linkedin", label: "LinkedIn", icon: Activity, color: "text-blue-400" },
  { id: "crm", label: "Integração CRM", icon: Database, color: "text-emerald-400" },
  { id: "analysis", label: "Análise de Dados", icon: Brain, color: "text-purple-400" },
];

export function AgentFactory() {
  const [isCreating, setIsCreating] = useState(false);
  const [agents, setAgents] = useState(mockAgents);

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
    if (!name || !role) return;
    const newAgent = {
      id: Math.random().toString(),
      name,
      role,
      personality: personality || "Padrão do sistema",
      status: 'offline' as const,
      skills: selectedSkills.length > 0 ? selectedSkills : ["Geral"],
    };
    setAgents([newAgent, ...agents]);
    setIsCreating(false);
    setName(""); setRole(""); setPersonality(""); setSelectedSkills([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto h-full flex flex-col gap-10 pb-24 px-2 md:px-0"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-neon-purple)] font-black text-[10px] uppercase tracking-[0.3em]">
            <Cpu className="w-3 h-3" />
            Neural Synthesis Lab
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)]">Factory</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium max-w-md">Produza e escale a sua força de trabalho sintética em segundos.</p>
        </div>
        {!isCreating && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(157, 0, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreating(true)}
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-[var(--color-neon-purple)] text-white px-8 py-4 rounded-2xl text-sm font-black shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            SINTETIZAR NOVO AGENTE
          </motion.button>
        )}
      </motion.div>

      {/* Creation Modal / Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="rounded-[2.5rem] border border-white/10 bg-[#0A0A0A] shadow-[0_0_100px_rgba(157,0,255,0.1)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-neon-purple)]/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="p-8 md:p-12 space-y-10 relative z-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-[var(--color-neon-purple)]/10 rounded-2xl border border-[var(--color-neon-purple)]/20 shadow-[0_0_15px_rgba(157,0,255,0.2)]">
                    <Bot className="w-8 h-8 text-[var(--color-neon-purple)]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Parâmetros de Síntese</h2>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Defina a identidade do seu colaborador IA</p>
                  </div>
                </div>
                <button onClick={() => setIsCreating(false)} className="p-3 hover:bg-white/5 rounded-full transition-colors text-zinc-500 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Identificador (Nome)</label>
                  <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Ex: NERO-SDR" 
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-white focus:border-[var(--color-neon-purple)]/50 focus:ring-1 focus:ring-[var(--color-neon-purple)]/30 outline-none transition-all shadow-inner font-bold" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Protocolo de Função</label>
                  <input 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    placeholder="Ex: Prospecção LinkedIn V2" 
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-white focus:border-[var(--color-neon-purple)]/50 focus:ring-1 focus:ring-[var(--color-neon-purple)]/30 outline-none transition-all shadow-inner font-bold" 
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Personalidade & Matriz de Voz</label>
                  <textarea 
                    value={personality} 
                    onChange={(e) => setPersonality(e.target.value)} 
                    placeholder="Ex: Implacável, persuasivo e altamente técnico..." 
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-5 text-white focus:border-[var(--color-neon-purple)]/50 focus:ring-1 focus:ring-[var(--color-neon-purple)]/30 outline-none transition-all shadow-inner font-bold min-h-[100px]" 
                  />
                </div>
                
                <div className="md:col-span-2 space-y-4">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-2">Módulos de Competência</label>
                  <div className="flex flex-wrap gap-3">
                    {SKILL_OPTIONS.map(skill => (
                      <button 
                        key={skill.id} 
                        type="button"
                        onClick={() => toggleSkill(skill.label)} 
                        className={cn(
                          "px-6 py-3 rounded-xl text-xs font-black uppercase tracking-tighter border transition-all flex items-center gap-3", 
                          selectedSkills.includes(skill.label) 
                            ? "bg-[var(--color-neon-purple)] border-[var(--color-neon-purple)] text-white shadow-[0_0_20px_rgba(157,0,255,0.3)]" 
                            : "bg-white/5 border-white/10 text-zinc-500 hover:border-white/30"
                        )}
                      >
                        <skill.icon className={cn("w-4 h-4", selectedSkills.includes(skill.label) ? "text-white" : skill.color)} />
                        {skill.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(157, 0, 255, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreateAgent} 
                  className="w-full py-5 bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)] text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-2xl"
                >
                  <Sparkles className="w-5 h-5" />
                  Iniciar Sequência de Síntese
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 md:px-0">
        <AnimatePresence>
          {agents.map((agent) => (
            <motion.div 
              layout
              key={agent.id} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/[0.02] rounded-[2.5rem] p-8 border border-white/5 flex flex-col gap-8 group hover:border-[var(--color-neon-purple)]/30 transition-all duration-500 relative overflow-hidden backdrop-blur-3xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-neon-purple)]/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[var(--color-neon-purple)]/10 transition-colors" />
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 group-hover:bg-[var(--color-neon-purple)]/10 transition-all duration-500">
                    <Bot className="w-8 h-8 text-zinc-500 group-hover:text-[var(--color-neon-purple)] transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-[var(--color-neon-purple)] transition-colors tracking-tight">{agent.name}</h3>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{agent.role}</p>
                  </div>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border", 
                  agent.status === "online" 
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                    : "bg-zinc-500/10 text-zinc-500 border-white/5"
                )}>
                  {agent.status}
                </div>
              </div>
              
              <div className="p-5 bg-black/40 rounded-2xl border border-white/5 relative z-10 shadow-inner">
                <p className="text-xs text-zinc-400 font-medium leading-relaxed italic">"{agent.personality}"</p>
              </div>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {agent.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-[var(--color-neon-purple)]/5 text-[var(--color-neon-purple)] text-[9px] font-black rounded-lg border border-[var(--color-neon-purple)]/10 uppercase tracking-tighter">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 flex gap-4 relative z-10">
                <motion.button 
                  whileHover={{ y: -2 }}
                  className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-xl transition-all"
                >
                  Configurar
                </motion.button>
                <motion.button 
                  whileHover={{ y: -2 }}
                  className={cn(
                    "px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all", 
                    agent.status === "online" 
                      ? "border-rose-500/20 text-rose-500 hover:bg-rose-500/5" 
                      : "border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/5"
                  )}
                >
                  {agent.status === "online" ? "Offline" : "Deploy"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
