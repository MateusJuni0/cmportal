import { GlassmorphismCard } from "@/components/common/GlassmorphismCard";
import { NeumorphismButton } from "@/components/common/NeumorphismButton";
import { LineChart, Users, Zap, Bot, ArrowUpRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

export function Dashboard() {
  // Chamada real ao motor tRPC na VPS
  const { data, isLoading } = trpc.dashboard.getStats.useQuery();

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
    <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-12 h-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Dashboard Central</h1>
          <p className="text-zinc-400">
            Visão geral da sua operação autônoma de vendas.
          </p>
        </div>
        <NeumorphismButton className="text-sm py-2 px-4 h-auto">Gerar Relatório Analítico</NeumorphismButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <GlassmorphismCard key={i} className={`flex flex-col gap-4 relative overflow-hidden group ${isLoading ? 'animate-pulse' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-center relative z-10">
                <span className="text-sm font-medium text-zinc-400">{stat.title}</span>
                <div className="p-2 bg-[#1A1A1A] rounded-lg border border-white/5">
                   <Icon className={`w-4 h-4 ${stat.color} drop-shadow-[0_0_5px_currentColor]`} />
                </div>
              </div>
              <div className="relative z-10">
                 <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                 <div className="text-[10px] font-medium text-[var(--color-neon-green)] flex items-center gap-1">
                   <ArrowUpRight className="w-3 h-3" />
                   {stat.trend}
                 </div>
              </div>
            </GlassmorphismCard>
          )
        })}
      </div>

      {/* Placeholder for future charts or activities */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[300px]">
        <GlassmorphismCard className="lg:col-span-2 flex flex-col justify-center items-center text-zinc-500 border-dashed border-2 border-white/10 bg-transparent shadow-none">
          <LineChart className="w-12 h-12 mb-4 opacity-20" />
          Gráfico Principal de MRR (Fase 2)
        </GlassmorphismCard>
        <GlassmorphismCard className="flex flex-col justify-center items-center text-zinc-500 border-dashed border-2 border-white/10 bg-transparent shadow-none">
          <Zap className="w-12 h-12 mb-4 opacity-20" />
          Feed de Atividade em Tempo Real
        </GlassmorphismCard>
      </div>
    </div>
  );
}
