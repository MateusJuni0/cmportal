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
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useAppStore } from '../../store';

const statusColors: Record<string, 'success' | 'warning' | 'destructive' | 'secondary'> = {
  active: 'success',
  warming: 'warning',
  limited: 'destructive',
  banned: 'destructive',
};

const statusLabels: Record<string, string> = {
  active: 'Ativo',
  warming: 'Aquecendo',
  limited: 'Limitado',
  banned: 'Banido',
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Agora';
  if (diffMins < 60) return `${diffMins}m atrás`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h atrás`;
  return `${Math.floor(diffMins / 1440)}d atrás`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-md">
        <p className="text-[#94a3b8] text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Mock data for charts
const warmingProgressData = [
  { day: '01/02', sent: 10, received: 5, limit: 50 },
  { day: '05/02', sent: 45, received: 25, limit: 100 },
  { day: '10/02', sent: 120, received: 60, limit: 250 },
  { day: '15/02', sent: 340, received: 180, limit: 500 },
  { day: '20/02', sent: 800, received: 450, limit: 1000 },
];

export function WhatsAppPage() {
  const { whatsappAccounts = [] } = useAppStore();
  
  const totalSent = whatsappAccounts.reduce((acc, a) => acc + (a.messagesSent || 0), 0);
  const totalReceived = whatsappAccounts.reduce((acc, a) => acc + (a.messagesReceived || 0), 0);
  const activeAccounts = whatsappAccounts.filter(a => a.status === 'active').length;
  const warmingAccounts = whatsappAccounts.filter(a => a.status === 'warming').length;
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <MessageCircle className="w-7 h-7 text-[#10b981]" />
          WhatsApp Warming
        </h1>
        <p className="text-[#94a3b8] mt-1">Infraestrutura de aquecimento e monitoramento de instâncias</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-[#10b981]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalSent.toLocaleString()}</p>
              <p className="text-xs text-[#94a3b8]">Total Enviado</p>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Inbox className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalReceived.toLocaleString()}</p>
              <p className="text-xs text-[#94a3b8]">Total Recebido</p>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{activeAccounts}</p>
              <p className="text-xs text-[#94a3b8]">Contas Ativas</p>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{warmingAccounts}</p>
              <p className="text-xs text-[#94a3b8]">Aquecendo</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Volume de Mensagens</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={warmingProgressData}>
                <defs>
                  <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sent" stroke="#10b981" strokeWidth={2} fill="url(#sentGradient)" name="Enviadas" />
                <Area type="monotone" dataKey="received" stroke="#22d3ee" strokeWidth={2} fill="none" name="Recebidas" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card variant="glass" className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Escalabilidade de Limite</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={warmingProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="limit" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Limite" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      {/* Accounts List */}
      <Card variant="glass" className="border-white/5 divide-y divide-white/5 overflow-hidden">
        {whatsappAccounts.map((account) => (
          <div key={account.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                <Phone className="w-6 h-6 text-[#10b981]" />
              </div>
              <div>
                <p className="font-medium text-white">{account.phoneNumber}</p>
                <p className="text-xs text-[#64748b]">Atividade: {formatTimeAgo(account.lastActivity)}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              <Badge variant={statusColors[account.status]}>
                {statusLabels[account.status]}
              </Badge>
              
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
              
              <div className="w-32">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-[#64748b]">PROGRESSO</span>
                  <span className="text-white">{account.warmingProgress}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#10b981] to-[#22d3ee] transition-all duration-1000"
                    style={{ width: `${account.warmingProgress}%` }}
                  />
                </div>
              </div>
              
              {account.status === 'limited' && (
                <div className="flex items-center gap-1 text-amber-500 animate-pulse">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
