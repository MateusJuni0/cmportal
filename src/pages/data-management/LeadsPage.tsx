import React, { useEffect, useState } from 'react';
import { Search, Target, TrendingUp, Users, Filter, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { GlassmorphismCard } from '@/components/common/GlassmorphismCard';

// Tipagem simplificada para evitar erros de import
interface LocalLead {
  id: string;
  name: string;
  email: string;
  company: string;
  score: number;
  source: 'instagram' | 'linkedin' | 'zaask' | 'google' | 'direct';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
}

const mockLeads: LocalLead[] = [
  { id: '1', name: 'Biclaque Trajano', email: 'biclaque@exemplo.pt', company: 'Trajano Tech', score: 92, source: 'linkedin', status: 'qualified' },
  { id: '2', name: 'Ana Silva', email: 'ana.silva@empresa.pt', company: 'Inovação Digital', score: 85, source: 'instagram', status: 'new' },
  { id: '3', name: 'Carlos Santos', email: 'carlos@santos.pt', company: 'Santos & Filhos', score: 45, source: 'google', status: 'contacted' },
  { id: '4', name: 'Marta Oliveira', email: 'marta@oliveira.pt', company: 'Oliveira Design', score: 78, source: 'direct', status: 'proposal' },
];

const sourceConfig: Record<string, { label: string, color: string, glow: string }> = {
  instagram: { label: 'Instagram', color: 'text-pink-400', glow: 'bg-pink-500/10' },
  linkedin: { label: 'LinkedIn', color: 'text-blue-400', glow: 'bg-blue-500/10' },
  zaask: { label: 'Zaask', color: 'text-amber-400', glow: 'bg-amber-500/10' },
  google: { label: 'Google', color: 'text-emerald-400', glow: 'bg-emerald-500/10' },
  direct: { label: 'Direto', color: 'text-purple-400', glow: 'bg-purple-500/10' },
};

export function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = mockLeads.filter(l => 
    (activeFilter === 'all' || l.status === activeFilter) &&
    (l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto flex flex-col gap-8 pb-24 px-2 md:px-0"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-neon-blue)] font-black text-[10px] uppercase tracking-[0.3em]">
            <Target className="w-3 h-3" />
            High Precision Targeting
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Leads <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">Sniper</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium">Capture e priorize oportunidades com score de IA em tempo real.</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 243, 255, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="w-full md:w-auto px-8 py-4 bg-[var(--color-neon-blue)] text-black rounded-2xl font-black text-sm flex items-center justify-center gap-3"
        >
          <TrendingUp className="w-5 h-5" />
          Importar Inteligência
        </motion.button>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Leads Hoje', val: '42', icon: Users, color: 'text-blue-400' },
          { label: 'Alta Intenção', val: '12', icon: Target, color: 'text-purple-400' },
          { label: 'Conversão', val: '18%', icon: ArrowUpRight, color: 'text-emerald-400' },
          { label: 'Em Follow-up', val: '28', icon: Clock, color: 'text-amber-400' },
        ].map((s, i) => (
          <motion.div key={i} variants={itemVariants}>
            <GlassmorphismCard className="p-4 md:p-6 border border-white/5 flex flex-col gap-2">
               <s.icon className={cn("w-4 h-4", s.color)} />
               <div className="text-xl md:text-2xl font-black text-white leading-none">{s.val}</div>
               <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{s.label}</div>
            </GlassmorphismCard>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[var(--color-neon-blue)] transition-colors" />
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, empresa ou sniper score..."
            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-14 py-4 text-sm text-white focus:outline-none focus:border-[var(--color-neon-blue)]/30 focus:ring-1 focus:ring-[var(--color-neon-blue)]/20 transition-all backdrop-blur-xl"
          />
        </div>
        <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto scrollbar-none no-scrollbar">
          {['all', 'qualified', 'proposal', 'new'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeFilter === f ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Leads List / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((lead) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={lead.id}
            >
              <GlassmorphismCard className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center border border-white/5 group hover:border-[var(--color-neon-blue)]/20 transition-all relative overflow-hidden">
                {/* Background Glow */}
                <div className={cn("absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity", sourceConfig[lead.source].glow)} />
                
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-2xl font-black text-white group-hover:scale-110 transition-transform duration-500">
                    {lead.name.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-black border-2 border-white/10 flex items-center justify-center shadow-2xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-1">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
                    <h3 className="text-xl font-black text-white tracking-tight">{lead.name}</h3>
                    <span className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter w-fit mx-auto md:mx-0", sourceConfig[lead.source].glow, sourceConfig[lead.source].color)}>
                      {sourceConfig[lead.source].label}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{lead.company}</p>
                  <p className="text-[10px] text-zinc-600 font-medium truncate max-w-[200px]">{lead.email}</p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-1">
                  <div className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">Sniper Score</div>
                  <div className={cn(
                    "text-3xl font-black tracking-tighter drop-shadow-lg",
                    lead.score >= 80 ? "text-emerald-400" : "text-amber-400"
                  )}>
                    {lead.score}<span className="text-xs opacity-40 ml-0.5">%</span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[1,2,3,4,5].map(s => (
                      <div key={s} className={cn("h-1 w-4 rounded-full bg-white/5", s <= (lead.score/20) && "bg-[var(--color-neon-blue)]")} />
                    ))}
                  </div>
                </div>
              </GlassmorphismCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
