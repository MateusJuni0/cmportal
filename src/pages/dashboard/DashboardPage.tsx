import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";
import { NeumorphismButton } from "@/components/common/NeumorphismButton";
import { LineChart, Users, Zap, Bot, ArrowUpRight } from "lucide-react";
// import { trpc } from "@/lib/trpc";

export function Dashboard() {
  // Chamada real ao motor tRPC na VPS
  // const { data, isLoading, error } = trpc.dashboard.getStats.useQuery();
  const isLoading = false;
  const data = { activeAgents: 5, totalLeads: 1250, totalRevenue: 15000 };

  // if (error) {
  //   console.error("Erro tRPC:", error);
  // }

  // Função para formatar moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
  };

  const stats = [
    { 
      title: "Agentes Ativos", 
      value: isLoading ? "..." : data?.activeAgents.toString() || "0", 
      icon: Bot, 
      color: "text-[var(--color-neon-blue)]", 
      trend: "+2 ativos" 
    },
    { 
      title: "Leads Gerados", 
      value: isLoading ? "..." : data?.totalLeads.toLocaleString() || "0", 
      icon: Users, 
      color: "text-[var(--color-neon-purple)]", 
      trend: "+15% mês" 
    },
    { 
      title: "Taxa de Conversão", 
      value: "8.4%", // Estático por enquanto até mapearmos no backend
      icon: LineChart, 
      color: "text-[var(--color-neon-green)]", 
      trend: "+1.2% base" 
    },
    { 
      title: "Receita (Revenue)", 
      value: isLoading ? "..." : formatCurrency(data?.totalRevenue || 0), 
      icon: Zap, 
      color: "text-amber-500", 
      trend: "Direto da VPS" 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8 pb-12 h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1 md:mb-2">Dashboard Central</h1>
          <p className="text-xs md:text-sm text-zinc-400">
            Visão geral da sua operação autônoma de vendas.
          </p>
        </div>
        <NeumorphismButton className="text-[10px] md:text-sm py-2 px-4 h-auto w-full sm:w-auto">Gerar Relatório Analítico</NeumorphismButton>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassmorphismCard key={i} className={`flex flex-col gap-4 relative overflow-hidden group ${isLoading ? 'animate-pulse' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-center relative z-10">
                <span className="text-[10px] md:text-sm font-medium text-zinc-400">{stat.title}</span>
                <div className="p-1.5 md:p-2 bg-[#1A1A1A] rounded-lg border border-white/5">
                   <Icon className={`w-3 h-3 md:w-4 md:h-4 ${stat.color} drop-shadow-[0_0_5px_currentColor]`} />
                </div>
              </div>
              <div className="relative z-10">
                 <div className="text-xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                 <div className="text-[9px] md:text-[10px] font-medium text-[var(--color-neon-green)] flex items-center gap-1">
                   <ArrowUpRight className="w-3 h-3" />
                   {stat.trend}
                 </div>
              </div>
            </GlassmorphismCard>
          )
        })}
      </div>

      {/* Placeholder for future charts or activities */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-h-[300px]">
        <GlassmorphismCard className="lg:col-span-2 flex flex-col justify-center items-center text-zinc-500 border-dashed border-2 border-white/10 bg-transparent shadow-none p-8">
          <LineChart className="w-8 h-8 md:w-12 md:h-12 mb-4 opacity-20" />
          <span className="text-xs md:text-sm">Gráfico Principal de MRR (Fase 2)</span>
        </GlassmorphismCard>
        <GlassmorphismCard className="flex flex-col justify-center items-center text-zinc-500 border-dashed border-2 border-white/10 bg-transparent shadow-none p-8">
          <Zap className="w-8 h-8 md:w-12 md:h-12 mb-4 opacity-20" />
          <span className="text-xs md:text-sm">Feed de Atividade em Tempo Real</span>
        </GlassmorphismCard>
      </div>
    </div>
  );
}
