import React from 'react';
import { MessageCircle, Send, Inbox, AlertTriangle, CheckCircle, Clock, Phone } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart 
} from 'recharts';
import { Card, CardContent } from './components/CardPremium';
import { Badge } from './components/BadgePremium';

// Mock data adaptado do Minimax para aquecimento
const mockWhatsAppAccounts = [
  { id: 1, phoneNumber: '+55 11 99887-7665', status: 'active', messagesSent: 1250, messagesReceived: 840, warmingProgress: 100, lastActivity: new Date() },
  { id: 2, phoneNumber: '+55 11 97766-5544', status: 'warming', messagesSent: 450, messagesReceived: 310, warmingProgress: 65, lastActivity: new Date(Date.now() - 3600000) },
  { id: 3, phoneNumber: '+55 11 96655-4433', status: 'limited', messagesSent: 890, messagesReceived: 120, warmingProgress: 40, lastActivity: new Date(Date.now() - 86400000) },
];

const warmingProgressData = [
  { day: 'Dia 1', sent: 20, received: 15, limit: 50 },
  { day: 'Dia 2', sent: 45, received: 35, limit: 100 },
  { day: 'Dia 3', sent: 90, received: 70, limit: 200 },
  { day: 'Dia 4', sent: 180, received: 150, limit: 400 },
  { day: 'Dia 5', sent: 350, received: 290, limit: 800 },
  { day: 'Dia 6', sent: 600, received: 510, limit: 1500 },
];

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  active: 'success',
  warming: 'warning',
  limited: 'danger',
  banned: 'danger',
};

const statusLabels: Record<string, string> = {
  active: 'Ativo',
  warming: 'Aquecendo',
  limited: 'Limitado',
  banned: 'Banido',
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Agora';
  if (diffMins < 60) return `${diffMins}m atrás`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h atrás`;
  return `${Math.floor(diffMins / 1440)}d atrás`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#12121a] border border-[rgba(148,163,184,0.1)] rounded-xl p-3 shadow-xl">
        <p className="text-[#94a3b8] text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function WhatsAppDashboardPremium() {
  const totalSent = mockWhatsAppAccounts.reduce((acc, a) => acc + a.messagesSent, 0);
  const totalReceived = mockWhatsAppAccounts.reduce((acc, a) => acc + a.messagesReceived, 0);
  const activeAccounts = mockWhatsAppAccounts.filter(a => a.status === 'active').length;
  
  return (
    <div className="space-y-6 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          WhatsApp Warming Hub
        </h1>
        <p className="text-[#94a3b8] mt-1">Monitore o aquecimento e a saúde das suas contas</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" padding="sm" className="flex items-center gap-4 hover:border-emerald-500/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
            <Send className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{totalSent.toLocaleString()}</p>
            <p className="text-xs text-[#94a3b8]">Enviadas</p>
          </div>
        </Card>
        
        <Card variant="glass" padding="sm" className="flex items-center gap-4 hover:border-cyan-500/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
            <Inbox className="w-6 h-6 text-cyan-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{totalReceived.toLocaleString()}</p>
            <p className="text-xs text-[#94a3b8]">Recebidas</p>
          </div>
        </Card>
        
        <Card variant="glass" padding="sm" className="flex items-center gap-4 hover:border-emerald-400/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-400/10 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{activeAccounts}</p>
            <p className="text-xs text-[#94a3b8]">Contas Ativas</p>
          </div>
        </Card>
        
        <Card variant="glass" padding="sm" className="flex items-center gap-4 hover:border-amber-500/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">1</p>
            <p className="text-xs text-[#94a3b8]">Em Aquecimento</p>
          </div>
        </Card>
      </div>
      
      {/* Warming Chart */}
      <Card variant="glass" padding="md">
        <h3 className="text-lg font-semibold text-white mb-4">Evolução do Aquecimento</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={warmingProgressData}>
              <defs>
                <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="sent" stroke="#10b981" strokeWidth={2} fill="url(#sentGrad)" name="Envios Reais" />
              <Line type="monotone" dataKey="limit" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Limite de Segurança" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      {/* Account List */}
      <Card variant="glass">
        <div className="p-4 border-b border-[rgba(148,163,184,0.1)] flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Status das Instâncias</h3>
          <button className="text-xs text-emerald-500 hover:text-emerald-400 font-medium">Adicionar Conta +</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-[#64748b] border-b border-[rgba(148,163,184,0.05)]">
                <th className="p-4">WhatsApp</th>
                <th className="p-4">Status</th>
                <th className="p-4">Atividade</th>
                <th className="p-4">Progresso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(148,163,184,0.05)]">
              {mockWhatsAppAccounts.map((account) => (
                <tr key={account.id} className="group hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#10b981]/10 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-[#10b981]" />
                      </div>
                      <span className="text-sm text-white font-medium">{account.phoneNumber}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={statusColors[account.status]}>{statusLabels[account.status]}</Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-xs text-[#64748b]">{formatTimeAgo(account.lastActivity)}</span>
                  </td>
                  <td className="p-4">
                    <div className="w-32">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-white">{account.warmingProgress}%</span>
                      </div>
                      <div className="h-1.5 bg-[#1a1a25] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#10b981] to-[#22d3ee] rounded-full"
                          style={{ width: `${account.warmingProgress}%` }}
                        />
                      </div>
                    </div>
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
