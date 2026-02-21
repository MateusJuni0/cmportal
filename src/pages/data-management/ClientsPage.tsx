import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, X } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { useAppStore } from '../../store';
import { Client } from '../../types';

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
  trial: 'bg-amber-500/20 text-amber-400 border-amber-500/20',
  inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/20',
  churned: 'bg-red-500/20 text-red-400 border-red-500/20',
};

const planLabels: Record<string, string> = {
  starter: 'Starter',
  professional: 'Professional',
  enterprise: 'Enterprise',
};

const statusLabels: Record<string, string> = {
  active: 'Ativo',
  trial: 'Trial',
  inactive: 'Inativo',
  churned: 'Cancelado',
};

const statusOptions = [
  { value: 'all', label: 'Todos os Status' },
  { value: 'active', label: 'Ativo' },
  { value: 'trial', label: 'Trial' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'churned', label: 'Cancelado' },
];

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-PT', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

export function ClientsDashboard() {
  const { filteredClients, clientFilters, setClientFilters, clients } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    plan: 'starter' as Client['plan'],
    status: 'trial' as Client['status'],
  });
  
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.status === 'active').length;
  const trialClients = clients.filter(c => c.status === 'trial').length;
  const mrr = clients.filter(c => c.status !== 'churned').reduce((acc, c) => acc + c.monthlyValue, 0);
  
  const handleOpenModal = (client?: Client) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name,
        email: client.email,
        company: client.company,
        phone: client.phone,
        plan: client.plan,
        status: client.status,
      });
    } else {
      setEditingClient(null);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        plan: 'starter',
        status: 'trial',
      });
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-7 h-7 text-[#a855f7]" />
            Client Management
          </h1>
          <p className="text-[#94a3b8] mt-1">Gerencie seus clientes, trials e faturamento</p>
        </div>
        
        <Button variant="primary" onClick={() => handleOpenModal()} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#a855f7]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalClients}</p>
              <p className="text-xs text-[#94a3b8]">Total de Clientes</p>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{activeClients}</p>
              <p className="text-xs text-[#94a3b8]">Clientes Ativos</p>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{trialClients}</p>
              <p className="text-xs text-[#94a3b8]">Em Trial</p>
            </div>
          </div>
        </Card>
        
        <Card variant="glass" className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{formatCurrency(mrr)}</p>
              <p className="text-xs text-[#94a3b8]">MRR</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Filters */}
      <Card variant="glass" className="p-4 border-white/5">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar por nome, empresa ou email..."
              icon={<Search className="w-4 h-4 text-[#94a3b8]" />}
              value={clientFilters.search}
              onChange={(e) => setClientFilters({ search: e.target.value })}
            />
          </div>
          <div className="w-full sm:w-48">
            <Select
              value={clientFilters.status || 'all'}
              onValueChange={(value) => setClientFilters({ status: value === 'all' ? null : value })}
              options={statusOptions}
            />
          </div>
        </div>
      </Card>
      
      {/* Clients Table */}
      <Card variant="glass" className="border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[#94a3b8]">Cliente</TableHead>
                <TableHead className="text-[#94a3b8]">Plano</TableHead>
                <TableHead className="text-[#94a3b8]">Valor</TableHead>
                <TableHead className="text-[#94a3b8]">Status</TableHead>
                <TableHead className="text-[#94a3b8]">Início</TableHead>
                <TableHead className="text-[#94a3b8]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="border-white/5 hover:bg-white/[0.02]">
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{client.company}</p>
                      <p className="text-xs text-[#64748b]">{client.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#cbd5e1]">{planLabels[client.plan]}</TableCell>
                  <TableCell>
                    <span className="text-white font-medium">
                      {formatCurrency(client.monthlyValue)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[client.status]}`}>
                      {statusLabels[client.status]}
                    </span>
                  </TableCell>
                  <TableCell className="text-[#94a3b8]">
                    {new Date(client.startDate).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(client)}
                        className="p-1.5 text-[#94a3b8] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[#94a3b8] hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      
      {/* Modal - Simplified Integration */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal} />
          <Card className="relative w-full max-w-md bg-[#0A0A0A] border-white/10 p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>
              <button onClick={handleCloseModal} className="p-1 text-[#94a3b8] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <Input label="Nome" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <Input label="Email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <Input label="Empresa" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
              <div className="flex gap-4">
                <Button variant="secondary" onClick={handleCloseModal} className="flex-1">Cancelar</Button>
                <Button variant="primary" onClick={handleCloseModal} className="flex-1">Salvar</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
