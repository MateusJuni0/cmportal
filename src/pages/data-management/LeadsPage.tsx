import React, { useEffect } from 'react';
import { Search, Target, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { useAppStore } from '../../store';
import { trpc } from '../../lib/trpc';
import { Lead } from '../../types';

const sourceColors: Record<string, string> = {
  instagram: 'bg-pink-500/20 text-pink-400',
  linkedin: 'bg-blue-500/20 text-blue-400',
  zaask: 'bg-amber-500/20 text-amber-400',
  google: 'bg-emerald-500/20 text-emerald-400',
  direct: 'bg-purple-500/20 text-purple-400',
};

const statusLabels: Record<string, string> = {
  new: 'Novo',
  contacted: 'Contatado',
  qualified: 'Qualificado',
  proposal: 'Proposta',
  closed: 'Fechado',
};

const sourceOptions = [
  { value: 'all', label: 'Todas as Fontes' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'zaask', label: 'Zaask' },
  { value: 'google', label: 'Google' },
  { value: 'direct', label: 'Direto' },
];

function getScoreColor(score: number): 'success' | 'warning' | 'destructive' | 'secondary' {
  if (score >= 80) return 'success';
  if (score >= 50) return 'warning';
  if (score >= 30) return 'destructive';
  return 'secondary';
}

export function LeadsPage() {
  const { filteredLeads = [], leadFilters, setLeadFilters } = useAppStore();
  
  // Sincronização com o Backend via tRPC
  const { data: remoteLeads, isLoading } = trpc.leads.list.useQuery();

  useEffect(() => {
    if (remoteLeads) {
      // Aqui poderíamos atualizar o store global se quiséssemos persistência local,
      // mas para o teste, vamos apenas usar os dados se existirem.
      // useAppStore.getState().setLeads(remoteLeads as Lead[]);
    }
  }, [remoteLeads]);

  // Se tivermos dados remotos, eles ganham prioridade sobre os mocks do store
  const displayLeads = remoteLeads ? (remoteLeads as unknown as Lead[]) : filteredLeads;

  const totalLeads = displayLeads.length;
  const avgScore = totalLeads > 0 
    ? Math.round(displayLeads.reduce((acc, lead) => acc + (lead.score || 0), 0) / totalLeads) 
    : 0;
  const highIntentLeads = displayLeads.filter(l => (l.score || 0) >= 70).length;
  
  return (
    <div className={`space-y-6 animate-in fade-in duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Target className="w-7 h-7 text-[#22d3ee]" />
            Leads Sniper {isLoading && <span className="text-xs text-cyan-500 animate-pulse">(Sincronizando...)</span>}
          </h1>
          <p className="text-[#94a3b8] mt-1">Gerencie e priorize seus leads por intenção de compra</p>
        </div>
        
        <Button variant="primary" className="w-full sm:w-auto">
          <TrendingUp className="w-4 h-4 mr-2" />
          Importar Leads
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="glass" className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#22d3ee]/5 rounded-full blur-2xl group-hover:bg-[#22d3ee]/10 transition-colors" />
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#22d3ee]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalLeads}</p>
                <p className="text-xs text-[#94a3b8]">Total de Leads</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#10b981]/5 rounded-full blur-2xl group-hover:bg-[#10b981]/10 transition-colors" />
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-[#10b981]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{avgScore}</p>
                <p className="text-xs text-[#94a3b8]">Score Médio</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#a855f7]/5 rounded-full blur-2xl group-hover:bg-[#a855f7]/10 transition-colors" />
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#a855f7]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{highIntentLeads}</p>
                <p className="text-xs text-[#94a3b8]">Alta Intenção</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <Card variant="glass" className="border-white/5 bg-[#0A0A0A]/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome, empresa ou email..."
                icon={<Search className="w-4 h-4 text-[#94a3b8]" />}
                className="bg-black/20 border-white/10"
                value={leadFilters.search}
                onChange={(e) => setLeadFilters({ search: e.target.value })}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={leadFilters.status || 'all'}
                onValueChange={(value) => setLeadFilters({ status: value === 'all' ? null : value })}
                options={sourceOptions}
                className="bg-black/20 border-white/10"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Leads Table */}
      <Card variant="glass" className="border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[#94a3b8]">Lead</TableHead>
                <TableHead className="text-[#94a3b8]">Empresa</TableHead>
                <TableHead className="text-[#94a3b8]">Score</TableHead>
                <TableHead className="text-[#94a3b8]">Fonte</TableHead>
                <TableHead className="text-[#94a3b8]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayLeads
                .sort((a, b) => (b.score || 0) - (a.score || 0))
                .map((lead) => (
                <TableRow key={lead.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-[#64748b]">{lead.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#cbd5e1]">{lead.company}</TableCell>
                  <TableCell>
                    <Badge variant={getScoreColor(lead.score || 0)}>
                      {lead.score || 0}/100
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2 py-1 rounded-lg text-xs font-medium capitalize ${sourceColors[lead.source]}`}>
                      {lead.source}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[#94a3b8]">{statusLabels[lead.status]}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
