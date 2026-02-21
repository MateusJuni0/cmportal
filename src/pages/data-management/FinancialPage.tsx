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
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAppStore } from '../../store';

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-PT', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-md">
        <p className="text-[#94a3b8] text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function FinancialPage() {
  const { financialData = [] } = useAppStore();
  
  const totalRevenue = financialData.reduce((acc, d) => acc + (d.revenue || 0), 0);
  const totalCosts = financialData.reduce((acc, d) => acc + (d.costs || 0), 0);
  const totalProfit = financialData.reduce((acc, d) => acc + (d.profit || 0), 0);
  const totalApiCosts = financialData.reduce((acc, d) => acc + (d.apiCosts || 0), 0);
  
  const hasData = financialData.length > 0;
  const lastMonth = hasData ? financialData[financialData.length - 1] : { revenue: 0 };
  const prevMonth = financialData.length > 1 ? financialData[financialData.length - 2] : { revenue: 1 };
  const revenueGrowth = hasData ? (((lastMonth.revenue - prevMonth.revenue) / (prevMonth.revenue || 1)) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <DollarSign className="w-7 h-7 text-[#22d3ee]" />
          Quantum Treasury
        </h1>
        <p className="text-[#94a3b8] mt-1">Visão algorítmica de receitas, lucros e queima de API</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="relative overflow-hidden p-4">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#22d3ee]/5 rounded-full blur-2xl" />
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
            <span className="text-xs text-[#64748b]">vs anterior</span>
          </div>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden p-4">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-full blur-2xl" />
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
            Margem: {((totalProfit / (totalRevenue || 1)) * 100).toFixed(1)}%
          </p>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden p-4">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#ef4444]/5 rounded-full blur-2xl" />
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
            {((totalCosts / (totalRevenue || 1)) * 100).toFixed(1)}% da receita
          </p>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden p-4">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#a855f7]/5 rounded-full blur-2xl" />
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
            {((totalApiCosts / (totalCosts || 1)) * 100).toFixed(1)}% dos custos
          </p>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit Chart */}
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Fluxo de Lucro</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData}>
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value/1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="profit" stroke="#22d3ee" strokeWidth={2} fill="url(#profitGradient)" name="Lucro" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        {/* API Costs Chart */}
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Burn Rate de API</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value}`} />
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
