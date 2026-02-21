import React from 'react';
import { 
  Cpu, 
  Activity, 
  Zap, 
  Shield, 
  Terminal, 
  Bot, 
  Settings, 
  Power,
  Search,
  MessageSquare,
  Network,
  Database
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent } from './components/CardPremium';
import { Badge } from './components/BadgePremium';
import { LiveLogTerminal } from '../../../components/common/LiveLogTerminal';
import { useStore } from '../../../store';
import { cn } from '../../../utils/cn';

const neuralData = [
  { time: '00:00', load: 45, latency: 120 },
  { time: '04:00', load: 30, latency: 95 },
  { time: '08:00', load: 65, latency: 150 },
  { time: '12:00', load: 85, latency: 210 },
  { time: '16:00', load: 75, latency: 180 },
  { time: '20:00', load: 90, latency: 240 },
  { time: '23:59', load: 55, latency: 130 },
];

export function AgentsDashboardPremium() {
  const { agents, logs, toggleAgentStatus } = useStore();

  return (
    <div className="space-y-6 p-6 animate-in fade-in slide-in-from-right-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Network className="w-6 h-6 text-white" />
            </div>
            Neural Core Management
          </h1>
          <p className="text-[#94a3b8] mt-1">Orquestração de inteligência e agentes autônomos</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="animate-pulse">System Online</Badge>
          <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Neural Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Neural Load', value: '78%', icon: Activity, color: 'text-blue-400' },
          { label: 'Avg Latency', value: '142ms', icon: Zap, color: 'text-amber-400' },
          { label: 'Active Tasks', value: '24', icon: Cpu, color: 'text-purple-400' },
          { label: 'Data Synced', value: '1.2TB', icon: Database, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <Card key={i} variant="glass" padding="md" className="relative group overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div>
                <p className="text-sm text-[#94a3b8]">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Agents List */}
        <div className="lg:col-span-1 space-y-6">
          <Card variant="glass" padding="md" className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-400" />
                Active Agents
              </h3>
              <Badge variant="info">{agents.length}</Badge>
            </div>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div 
                  key={agent.id} 
                  className={cn(
                    "p-4 rounded-2xl border transition-all cursor-pointer group",
                    agent.status === 'online' 
                      ? "bg-indigo-500/5 border-indigo-500/10 hover:border-indigo-500/30" 
                      : "bg-white/5 border-white/5 hover:border-white/10 grayscale"
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center font-bold text-white overflow-hidden">
                          {agent.avatar ? <img src={agent.avatar} alt={agent.name} /> : agent.name[0]}
                        </div>
                        {agent.status === 'online' && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0f] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{agent.name}</p>
                        <p className="text-[10px] text-[#64748b] uppercase tracking-tighter">{agent.role}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleAgentStatus(agent.id)}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        agent.status === 'online' ? "text-rose-400 hover:bg-rose-400/10" : "text-emerald-400 hover:bg-emerald-400/10"
                      )}
                    >
                      <Power className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {agent.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[#94a3b8]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Neural Network Visualization & Terminal */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" padding="none" className="h-[400px] flex flex-col overflow-hidden border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
            <LiveLogTerminal logs={logs} className="flex-1" />
          </Card>

          <Card variant="glass" padding="md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Neural Load Performance</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-xs text-[#94a3b8]">System Load</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs text-[#94a3b8]">Latency</span>
                </div>
              </div>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={neuralData}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.05)" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#12121a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="load" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorLoad)" />
                  <Area type="monotone" dataKey="latency" stroke="#f59e0b" strokeWidth={2} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
