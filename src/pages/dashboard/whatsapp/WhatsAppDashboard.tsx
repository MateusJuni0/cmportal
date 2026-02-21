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
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockWhatsAppAccounts, warmingProgressData } from '@/data/mockData';

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

export function WhatsAppDashboard() {
  const totalSent = mockWhatsAppAccounts.reduce((acc, a) => acc + a.messagesSent, 0);
  const totalReceived = mockWhatsAppAccounts.reduce((acc, a) => acc + a.messagesReceived, 0);
  const activeAccounts = mockWhatsAppAccounts.filter(a => a.status === 'active').length;
  const warmingAccounts = mockWhatsAppAccounts.filter(a => a.status === 'warming').length;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <MessageCircle className="w-7 h-7 text-[#10b981]" />
          WhatsApp Warming
        </h1>
        <p className="text-[#94a3b8] mt-1">Monitore o aquecimento das suas contas de WhatsApp</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalSent.toLocaleString()}</p>
                <p className="text-xs text-[#94a3b8]">Mensagens Enviadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Inbox className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalReceived.toLocaleString()}</p>
                <p className="text-xs text-[#94a3b8]">Mensagens Recebidas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{activeAccounts}</p>
                <p className="text-xs text-[#94a3b8]">Contas Ativas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{warmingAccounts}</p>
                <p className="text-xs text-[#94a3b8]">Em Aquecimento</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warming Progress Chart */}
        <Card variant="glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Progresso de Aquecimento</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={warmingProgressData}>
                  <defs>
                    <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="receivedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#64748b" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="sent" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fill="url(#sentGradient)" 
                    name="Enviadas"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="received" 
                    stroke="#22d3ee" 
                    strokeWidth={2}
                    fill="url(#receivedGradient)" 
                    name="Recebidas"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Limit Progress */}
        <Card variant="glass">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Limite por Dia</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={warmingProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#64748b" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="limit" 
                    stroke="#a855f7" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Limite"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Accounts Table */}
      <Card>
        <div className="p-4 border-b border-[rgba(148,163,184,0.1)]">
          <h3 className="text-lg font-semibold text-white">Contas de WhatsApp</h3>
        </div>
        <div className="divide-y divide-[rgba(148,163,184,0.1)]">
          {mockWhatsAppAccounts.map((account) => (
            <div key={account.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#10b981]" />
                </div>
                <div>
                  <p className="font-medium text-white">{account.phoneNumber}</p>
                  <p className="text-xs text-[#64748b]">Última atividade: {formatTimeAgo(account.lastActivity)}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                {/* Status */}
                <div className="flex items-center gap-2">
                  <Badge variant={statusColors[account.status]}>
                    {statusLabels[account.status]}
                  </Badge>
                </div>
                
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-[#10b981]">
                    <Send className="w-4 h-4" />
                    <span>{account.messagesSent}</span>
                  </div>
                  <div className="flex items-center gap-1 text-cyan-400">
                    <Inbox className="w-4 h-4" />
                    <span>{account.messagesReceived}</span>
                  </div>
                </div>
                
                {/* Progress */}
                <div className="w-24">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#64748b]">Progresso</span>
                    <span className="text-white">{account.warmingProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a25] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#10b981] to-[#22d3ee] rounded-full transition-all"
                      style={{ width: `${account.warmingProgress}%` }}
                    />
                  </div>
                </div>
                
                {/* Alert for limited accounts */}
                {account.status === 'limited' && (
                  <div className="flex items-center gap-1 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs">Atenção</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
