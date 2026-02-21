import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { Card, CardContent } from './components/CardPremium';
import { Badge } from './components/BadgePremium';

// Mock data adaptado do Minimax
const mockFinancialData = [
  { date: 'Set', revenue: 45000, costs: 22000, profit: 23000, apiCosts: 1200 },
  { date: 'Out', revenue: 52000, costs: 24000, profit: 28000, apiCosts: 1500 },
  { date: 'Nov', revenue: 48000, costs: 23000, profit: 25000, apiCosts: 1300 },
  { date: 'Dez', revenue: 61000, costs: 28000, profit: 33000, apiCosts: 1800 },
  { date: 'Jan', revenue: 68000, costs: 30000, profit: 38000, apiCosts: 2100 },
  { date: 'Fev', revenue: 75000, costs: 32000, profit: 43000, apiCosts: 2400 },
];

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#12121a] border border-[rgba(148,163,184,0.1)] rounded-xl p-3 shadow-xl">
        <p className="text-[#94a3b8] text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function FinancialDashboardPremium() {
  const totalRevenue = mockFinancialData.reduce((acc, d) => acc + d.revenue, 0);
  const totalCosts = mockFinancialData.reduce((acc, d) => acc + d.costs, 0);
  const totalProfit = mockFinancialData.reduce((acc, d) => acc + d.profit, 0);
  const totalApiCosts = mockFinancialData.reduce((acc, d) => acc + d.apiCosts, 0);
  
  const lastMonth = mockFinancialData[mockFinancialData.length - 1];
  const prevMonth = mockFinancialData[mockFinancialData.length - 2];
  const revenueGrowth = ((lastMonth.revenue - prevMonth.revenue) / prevMonth.revenue * 100).toFixed(1);

  return (
    <div className="space-y-6 p-6 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22d3ee] to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          Financial Command
        </h1>
        <p className="text-[#94a3b8] mt-1">Visão geral das finanças e custos de API (Módulo Premium)</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="relative overflow-hidden group hover:border-[#22d3ee]/30 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#22d3ee]/5 rounded-full blur-2xl group-hover:bg-[#22d3ee]/10 transition-all" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#94a3b8]">Receita Total</p>
                <p className="text-xl font-bold text-white mt-1">{formatCurrency(totalRevenue)}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#22d3ee]" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Badge variant="success">+{revenueGrowth}%</Badge>
              <span className="text-xs text-[#64748b]">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden group hover:border-emerald-500/30">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-full blur-2xl" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#94a3b8]">Lucro Líquido</p>
                <p className="text-xl font-bold text-white mt-1">{formatCurrency(totalProfit)}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#10b981]" />
              </div>
            </div>
            <p className="text-xs text-[#64748b] mt-2">
              Margem: {((totalProfit / totalRevenue) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden group hover:border-rose-500/30">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#ef4444]/5 rounded-full blur-2xl" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#94a3b8]">Custos Totais</p>
                <p className="text-xl font-bold text-white mt-1">{formatCurrency(totalCosts)}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#ef4444]/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-[#ef4444]" />
              </div>
            </div>
            <p className="text-xs text-[#64748b] mt-2">
              {(totalCosts / totalRevenue * 100).toFixed(1)}% da receita
            </p>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden group hover:border-purple-500/30">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#a855f7]/5 rounded-full blur-2xl" />
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#94a3b8]">Custos de API</p>
                <p className="text-xl font-bold text-white mt-1">{formatCurrency(totalApiCosts)}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-[#a855f7]" />
              </div>
            </div>
            <p className="text-xs text-[#64748b] mt-2">
              {((totalApiCosts / totalCosts) * 100).toFixed(1)}% dos custos
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" padding="md">
          <h3 className="text-lg font-semibold text-white mb-4">Fluxo de Lucro</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockFinancialData}>
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(value) => `R$${value/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="profit" stroke="#22d3ee" strokeWidth={2} fill="url(#profitGradient)" name="Lucro" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card variant="glass" padding="md">
          <h3 className="text-lg font-semibold text-white mb-4">Gastos com APIs (IA)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockFinancialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} tickFormatter={(value) => `R$${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="apiCosts" fill="#a855f7" radius={[4, 4, 0, 0]} name="Custos API" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
