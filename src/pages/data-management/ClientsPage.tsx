import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, X, Briefcase, TrendingUp, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { GlassmorphismCard } from '@/components/common/GlassmorphismCard';

// Tipagem local para estabilidade
interface LocalClient {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'trial' | 'inactive' | 'churned';
  plan: 'starter' | 'professional' | 'enterprise';
  monthlyValue: number;
  startDate: string;
}

const mockClients: LocalClient[] = [
  { id: '1', name: 'Ricardo Pereira', company: 'Nexus Solutions', email: 'ricardo@nexus.pt', phone: '+351 912 345 678', status: 'active', plan: 'enterprise', monthlyValue: 2500, startDate: '2026-01-15' },
  { id: '2', name: 'Sofia Martins', company: 'Digital Flow', email: 'sofia@dflow.com', phone: '+351 923 456 789', status: 'trial', plan: 'professional', monthlyValue: 850, startDate: '2026-02-10' },
  { id: '3', name: 'João Silva', company: 'Imobiliária Elite', email: 'joao@ielite.pt', phone: '+351 934 567 890', status: 'active', plan: 'professional', monthlyValue: 1200, startDate: '2025-11-20' },
  { id: '4', name: 'Maria Santos', company: 'Tech Hub Porto', email: 'maria@techub.pt', phone: '+351 965 432 109', status: 'inactive', plan: 'starter', monthlyValue: 450, startDate: '2025-09-05' },
];

const statusConfig: Record<string, { label: string, color: string, glow: string }> = {
  active: { label: 'Ativo', color: 'text-emerald-400', glow: 'bg-emerald-500/10' },
  trial: { label: 'Trial', color: 'text-amber-400', glow: 'bg-amber-500/10' },
  inactive: { label: 'Inativo', color: 'text-zinc-500', glow: 'bg-zinc-500/10' },
  churned: { label: 'Cancelado', color: 'text-rose-400', glow: 'bg-rose-500/10' },
};

const planConfig: Record<string, { label: string, color: string }> = {
  starter: { label: 'Starter', color: 'text-blue-400' },
  professional: { label: 'Professional', color: 'text-purple-400' },
  enterprise: { label: 'Enterprise', color: 'text-rose-400' },
};

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-PT', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = mockClients.filter(c => 
    (activeFilter === 'all' || c.status === activeFilter) &&
    (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.company.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <div className="flex items-center gap-2 text-[var(--color-neon-purple)] font-black text-[10px] uppercase tracking-[0.3em]">
            <ShieldCheck className="w-3 h-3" />
            Ecosystem Sovereignty
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-blue)]">Manager</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium">Controle o faturamento e o sucesso da sua rede de clientes.</p>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(157, 0, 255, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto px-8 py-4 bg-[var(--color-neon-purple)] text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3"
        >
          <Plus className="w-5 h-5" />
          REGISTAR CLIENTE
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Clientes Totais', val: mockClients.length, icon: Users, color: 'text-blue-400' },
          { label: 'Receita MRR', val: formatCurrency(5000), icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Em Trial', val: '1', icon: Clock, color: 'text-amber-400' },
          { label: 'LTV Médio', val: formatCurrency(12000), icon: Briefcase, color: 'text-purple-400' },
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
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-[var(--color-neon-purple)] transition-colors" />
          <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, empresa ou plano..."
            className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-14 py-4 text-sm text-white focus:outline-none focus:border-[var(--color-neon-purple)]/30 transition-all backdrop-blur-xl"
          />
        </div>
        <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto scrollbar-none no-scrollbar">
          {['all', 'active', 'trial', 'inactive'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                activeFilter === f ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-200"
              )}
            >
              {f === 'all' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((client) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={client.id}
            >
              <GlassmorphismCard className="p-6 md:p-8 flex flex-col gap-6 border border-white/5 group hover:border-[var(--color-neon-purple)]/20 transition-all relative overflow-hidden">
                <div className={cn("absolute -top-10 -right-10 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity", statusConfig[client.status].glow)} />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 flex items-center justify-center text-xl font-black text-white group-hover:scale-110 transition-transform duration-500">
                      {client.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-white tracking-tight">{client.company}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-lg border", statusConfig[client.status].glow, statusConfig[client.status].color)}>
                          {statusConfig[client.status].label}
                        </span>
                        <span className={cn("text-[9px] font-black uppercase tracking-widest", planConfig[client.plan].color)}>
                          {planConfig[client.plan].label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">MRR</div>
                    <div className="text-xl font-black text-white tracking-tighter">{formatCurrency(client.monthlyValue)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5 relative z-10">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-zinc-500 group-hover:text-white transition-colors">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <p className="text-[10px] font-black text-zinc-600 uppercase">Responsável</p>
                        <p className="text-xs font-bold text-zinc-300">{client.name}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 rounded-lg text-zinc-500 group-hover:text-white transition-colors">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-zinc-600 uppercase">Desde</p>
                        <p className="text-xs font-bold text-zinc-300">{new Date(client.startDate).toLocaleDateString('pt-PT')}</p>
                      </div>
                   </div>
                </div>

                <div className="flex gap-3 relative z-10">
                  <button className="flex-1 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Contactar
                  </button>
                  <button className="flex-1 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2">
                    <ExternalLink className="w-3.5 h-3.5" /> Detalhes
                  </button>
                </div>
              </GlassmorphismCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Simple Modal Placeholder */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setIsModalOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 shadow-[0_0_100px_rgba(157,0,255,0.1)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-neon-purple)]/5 blur-[80px] rounded-full" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h2 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                  <Plus className="w-6 h-6 text-[var(--color-neon-purple)]" />
                  Novo Cliente
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-zinc-600 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Nome da Empresa</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-[var(--color-neon-purple)] outline-none font-bold shadow-inner" placeholder="Ex: Nexus Solutions" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Plano</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-[var(--color-neon-purple)] outline-none font-bold shadow-inner appearance-none">
                      <option value="starter">Starter</option>
                      <option value="professional">Professional</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">MRR (EUR)</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-[var(--color-neon-purple)] outline-none font-bold shadow-inner" placeholder="1500" />
                  </div>
                </div>
                <button className="w-full py-5 bg-[var(--color-neon-purple)] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl mt-4">
                  ATIVAR CLIENTE NO ECOSSISTEMA
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
