import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, X, CreditCard, Building, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from './components/CardPremium';
import { Badge } from './components/BadgePremium';
import { cn } from '../../../utils/cn';

// Mock data adaptado do Minimax
const mockClients = [
  { id: 1, name: 'Mateus Oliveira', company: 'CMTecnologia', plan: 'Enterprise', status: 'active', monthlyValue: 2500, startDate: '12/01/2026' },
  { id: 2, name: 'Lucas Rocha', company: 'NexGen Systems', plan: 'Professional', status: 'active', monthlyValue: 1200, startDate: '05/02/2026' },
  { id: 3, name: 'Biclaque Trajano', company: 'Trajano Log', plan: 'Professional', status: 'trial', monthlyValue: 1200, startDate: '18/02/2026' },
  { id: 4, name: 'Sara Lima', company: 'Sara Design', plan: 'Starter', status: 'inactive', monthlyValue: 450, startDate: '01/01/2026' },
];

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
  active: 'success',
  trial: 'warning',
  inactive: 'danger',
};

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export function ClientsDashboardPremium() {
  const [search, setSearch] = useState('');
  
  const totalMRR = mockClients.filter(c => c.status !== 'inactive').reduce((acc, c) => acc + c.monthlyValue, 0);
  const activeCount = mockClients.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-6 p-6 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#a855f7] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Users className="w-6 h-6 text-white" />
            </div>
            Client Ecosystem
          </h1>
          <p className="text-[#94a3b8] mt-1">Gestão de assinaturas e recorrência (MRR)</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl text-sm text-white font-semibold shadow-lg shadow-purple-500/20 transition-all">
          <Plus className="w-4 h-4" /> Novo Cliente
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" padding="sm" className="relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{formatCurrency(totalMRR)}</p>
              <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">MRR Atual</p>
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="sm" className="relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">{activeCount}</p>
              <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Clientes Ativos</p>
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="sm" className="relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">1</p>
              <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Em Trial</p>
            </div>
          </div>
        </Card>

        <Card variant="glass" padding="sm" className="relative group overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-white">3</p>
              <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider">Empresas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search & Filter */}
      <Card variant="glass" padding="sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
          <input 
            type="text"
            placeholder="Buscar por cliente, empresa ou plano..."
            className="w-full bg-[#0f0f16]/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </Card>

      {/* Clients Table */}
      <Card variant="glass" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-[#64748b] uppercase tracking-[0.1em] border-b border-white/5 bg-white/[0.01]">
                <th className="px-6 py-4 font-bold">Organização</th>
                <th className="px-6 py-4 font-bold">Plano</th>
                <th className="px-6 py-4 font-bold">Mensalidade</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Opções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockClients.map((client) => (
                <tr key={client.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                        {client.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{client.company}</p>
                        <p className="text-[10px] text-[#64748b]">{client.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-[#94a3b8] bg-white/5 px-2 py-1 rounded-md">{client.plan}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm text-white font-bold">{formatCurrency(client.monthlyValue)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant={statusColors[client.status]}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-[#64748b] hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-[#64748b] hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
