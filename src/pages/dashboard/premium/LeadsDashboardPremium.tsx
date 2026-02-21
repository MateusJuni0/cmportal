import React from 'react';
import { Users, UserPlus, Target, BarChart3, Filter, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardContent } from './components/CardPremium';
import { Badge } from './components/BadgePremium';

const mockLeads = [
  { id: 1, name: 'Biclaque Trajano', company: 'Logística Avançada', score: 95, status: 'Hot', value: 'R$ 15.000', lastContact: '2h atrás' },
  { id: 2, name: 'Ana Silva', company: 'Tech Solutions', score: 72, status: 'Warm', value: 'R$ 8.500', lastContact: '5h atrás' },
  { id: 3, name: 'Marcos Rover', company: 'Varejo Digital', score: 45, status: 'Cold', value: 'R$ 12.000', lastContact: '1d atrás' },
  { id: 4, name: 'Julia Costa', company: 'BioTech', score: 88, status: 'Hot', value: 'R$ 25.000', lastContact: '45m atrás' },
];

const funnelData = [
  { step: 'Captados', value: 4500, fill: '#6366f1' },
  { step: 'Qualificados', value: 2800, fill: '#8b5cf6' },
  { step: 'Proposta', value: 1200, fill: '#a855f7' },
  { step: 'Fechados', value: 450, fill: '#10b981' },
];

const scoreColors: Record<string, 'success' | 'warning' | 'danger'> = {
  Hot: 'success',
  Warm: 'warning',
  Cold: 'danger',
};

export function LeadsDashboardPremium() {
  return (
    <div className="space-y-6 p-6 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/20">
              <Target className="w-6 h-6 text-white" />
            </div>
            Leads & CRM Analytics
          </h1>
          <p className="text-[#94a3b8] mt-1">Gestão inteligente de oportunidades e conversão</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white transition-all">
            <Filter className="w-4 h-4" /> Filtrar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm text-white font-medium transition-all">
            <UserPlus className="w-4 h-4" /> Novo Lead
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="glass" padding="md" className="relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-all" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">8.452</p>
              <p className="text-sm text-[#94a3b8]">Total de Leads</p>
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="md" className="relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">12.4%</p>
              <p className="text-sm text-[#94a3b8]">Taxa de Conversão</p>
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="md" className="relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">R$ 142k</p>
              <p className="text-sm text-[#94a3b8]">Pipeline Estimado</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Funnel & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" padding="md">
          <h3 className="text-lg font-semibold text-white mb-6">Funil de Vendas</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="step" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  content={({active, payload}) => {
                    if (active && payload) return (
                      <div className="bg-[#12121a] border border-white/10 p-2 rounded-lg shadow-xl">
                        <p className="text-white text-sm font-medium">{payload[0].value} Leads</p>
                      </div>
                    )
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card variant="glass" padding="md">
          <h3 className="text-lg font-semibold text-white mb-6">Últimas Atividades</h3>
          <div className="space-y-4">
            {mockLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold text-white">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{lead.name}</p>
                    <p className="text-[10px] text-[#64748b]">{lead.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={scoreColors[lead.status]}>{lead.score}</Badge>
                  <button className="text-[#64748b] hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main CRM Table */}
      <Card variant="glass">
        <div className="p-6 border-b border-white/5">
          <h3 className="text-lg font-semibold text-white">Base de Leads Qualificados</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-[#64748b] uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-semibold">Lead</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Score</th>
                <th className="px-6 py-4 font-semibold">LTV Estimado</th>
                <th className="px-6 py-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-white">{lead.name}</p>
                    <p className="text-xs text-[#64748b]">{lead.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={scoreColors[lead.status]}>{lead.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", lead.score > 80 ? "bg-emerald-500" : lead.score > 50 ? "bg-amber-500" : "bg-rose-500")}
                          style={{ width: `${lead.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#94a3b8]">{lead.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white font-medium">{lead.value}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-[#64748b] hover:text-white hover:bg-white/5 rounded-lg transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
