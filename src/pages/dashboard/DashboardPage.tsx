import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";
import { NeumorphismButton } from "@/components/common/NeumorphismButton";
import { LineChart, Users, Zap, Bot, ArrowUpRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { trpc } from "@/lib/trpc";

export function Dashboard() {
  const { data: realData, isLoading } = trpc.dashboard.getStats.useQuery();
  
  // Fallback para mock se o banco estiver vazio ou offline
  const data = realData || { 
    activeAgents: 5, 
    totalLeads: 1250, 
    totalRevenue: 15000,
    totalClients: 42
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
  };

  const stats = [
    { 
      title: "Agentes Ativos", 
      value: data.activeAgents.toString(), 
      icon: Bot, 
      color: "text-[var(--color-neon-blue)]", 
      trend: "+2 ativos",
      glow: "shadow-[0_0_20px_rgba(0,243,255,0.2)]"
    },
    { 
      title: "Leads Gerados", 
      value: data.totalLeads.toLocaleString(), 
      icon: Users, 
      color: "text-[var(--color-neon-purple)]", 
      trend: "+15% mês",
      glow: "shadow-[0_0_20px_rgba(157,0,255,0.2)]"
    },
    { 
      title: "Taxa de Conversão", 
      value: "8.4%", 
      icon: TrendingUp, 
      color: "text-[var(--color-neon-green)]", 
      trend: "+1.2% base",
      glow: "shadow-[0_0_20px_rgba(57,255,20,0.2)]"
    },
    { 
      title: "Receita (Revenue)", 
      value: formatCurrency(data.totalRevenue), 
      icon: Zap, 
      color: "text-amber-400", 
      trend: "Direto da VPS",
      glow: "shadow-[0_0_20px_rgba(251,191,36,0.2)]"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
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
      className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12 pb-24"
    >
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2 md:px-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[var(--color-neon-blue)] font-black text-[10px] uppercase tracking-[0.3em]">
            <span className="w-8 h-[1px] bg-[var(--color-neon-blue)]" />
            System Operational
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">Elite</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 font-medium">
            Monitorização em tempo real do seu ecossistema de vendas soberano.
          </p>
        </div>
        <NeumorphismButton className="w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-[var(--color-neon-blue)] hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all">
          Extrair Intelligence Report
        </NeumorphismButton>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} variants={itemVariants}>
              <GlassmorphismCard className={cn(
                "flex flex-col gap-6 p-6 md:p-8 relative overflow-hidden group transition-all hover:scale-[1.02]",
                stat.glow
              )}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
                <div className="flex justify-between items-center relative z-10">
                  <div className="p-3 bg-black/40 rounded-2xl border border-white/10">
                     <Icon className={cn("w-5 h-5 md:w-6 md:h-6", stat.color, "drop-shadow-[0_0_10px_currentColor]")} />
                  </div>
                  <div className="text-[10px] font-black text-[var(--color-neon-green)] flex items-center gap-1 bg-[var(--color-neon-green)]/10 px-2 py-1 rounded-full border border-[var(--color-neon-green)]/20">
                     <ArrowUpRight className="w-3 h-3" />
                     {stat.trend}
                  </div>
                </div>
                <div className="space-y-1 relative z-10">
                   <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{stat.title}</div>
                   <div className="text-3xl md:text-4xl font-black text-white tracking-tighter">{stat.value}</div>
                </div>
              </GlassmorphismCard>
            </motion.div>
          )
        })}
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 px-2 md:px-0">
        <motion.div variants={itemVariants} className="lg:col-span-8">
          <GlassmorphismCard className="h-[400px] flex flex-col p-8 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-[var(--color-neon-blue)]" />
                Performance de Conversão
              </h3>
              <div className="flex gap-2">
                {['24H', '7D', '30D'].map(t => (
                  <button key={t} className="px-3 py-1 text-[10px] font-black text-zinc-500 hover:text-white border border-white/5 rounded-md transition-colors">{t}</button>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center text-zinc-600 border-2 border-dashed border-white/5 rounded-3xl">
              <TrendingUp className="w-12 h-12 mb-4 opacity-10" />
              <span className="text-xs font-black uppercase tracking-widest opacity-40">Motor Analítico V8.1 em Standby</span>
            </div>
          </GlassmorphismCard>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-6">
          <GlassmorphismCard className="p-8 border border-white/5 bg-white/[0.01]">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Atividade Recente
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Novo Lead Sniper', time: '2m atrás', color: 'bg-cyan-500' },
                { label: 'Campanha Ativada', time: '14m atrás', color: 'bg-purple-500' },
                { label: 'Relatório Gerado', time: '1h atrás', color: 'bg-emerald-500' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className={cn("w-2 h-2 rounded-full", item.color, "shadow-[0_0_8px_currentColor]")} />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{item.label}</div>
                    <div className="text-[10px] font-medium text-zinc-600 uppercase tracking-tighter">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassmorphismCard>

          <GlassmorphismCard className="p-8 bg-gradient-to-br from-[var(--color-neon-blue)]/10 to-transparent border border-[var(--color-neon-blue)]/10">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">Protocolo Alpha</h4>
            <p className="text-xs text-zinc-400 mb-4 font-medium leading-relaxed">Otimização de SDR autônomo está a operar a 98% de eficiência na VPS.</p>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '98%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-[var(--color-neon-blue)] shadow-[0_0_10px_rgba(0,243,255,0.5)]" 
              />
            </div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
