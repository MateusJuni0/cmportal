import React, { useState } from 'react';
import { Users, Search, Plus, Edit, Trash2, X, Mail, Phone, Building } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { useAppStore } from '@/store';
import { Client } from '@/types';

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
  { value: null, label: 'Todos os Status' },
  { value: 'active', label: 'Ativo' },
  { value: 'trial', label: 'Trial' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'churned', label: 'Cancelado' },
];

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="w-7 h-7 text-[#a855f7]" />
            Client Management
          </h1>
          <p className="text-[#94a3b8] mt-1">Gerencie seus clientes, trials e pagamentos</p>
        </div>
        
        <Button variant="primary" onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#a855f7]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#a855f7]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalClients}</p>
                <p className="text-xs text-[#94a3b8]">Total de Clientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{activeClients}</p>
                <p className="text-xs text-[#94a3b8]">Clientes Ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{trialClients}</p>
                <p className="text-xs text-[#94a3b8]">Em Trial</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card variant="glass" className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{formatCurrency(mrr)}</p>
                <p className="text-xs text-[#94a3b8]">MRR</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome, empresa ou email..."
                icon={<Search className="w-4 h-4" />}
                value={clientFilters.search}
                onChange={(e) => setClientFilters({ search: e.target.value })}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={clientFilters.status}
                onValueChange={(value) => setClientFilters({ status: value })}
                options={statusOptions}
                placeholder="Filtrar por status"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Clients Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-white">{client.company}</p>
                    <p className="text-xs text-[#64748b]">{client.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-[#94a3b8]">{planLabels[client.plan]}</span>
                </TableCell>
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
                <TableCell>
                  <span className="text-[#94a3b8]">
                    {client.startDate.toLocaleDateString('pt-BR')}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenModal(client)}
                      className="p-1.5 text-[#94a3b8] hover:text-white hover:bg-[#1a1a25] rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-[#94a3b8] hover:text-red-400 hover:bg-[#1a1a25] rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <div className="relative w-full max-w-md bg-[#12121a] border border-[rgba(148,163,184,0.1)] rounded-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">
                {editingClient ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>
              <button 
                onClick={handleCloseModal}
                className="p-1 text-[#94a3b8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleCloseModal(); }}>
              <Input
                label="Nome"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="João Silva"
              />
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="joao@empresa.com"
              />
              
              <Input
                label="Empresa"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Empresa Ltda"
              />
              
              <Input
                label="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+5511999999999"
              />
              
              <div>
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">Plano</label>
                <Select
                  value={formData.plan}
                  onValueChange={(value) => setFormData({ ...formData, plan: value as Client['plan'] })}
                  options={[
                    { value: 'starter', label: 'Starter' },
                    { value: 'professional', label: 'Professional' },
                    { value: 'enterprise', label: 'Enterprise' },
                  ]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as Client['status'] })}
                  options={[
                    { value: 'trial', label: 'Trial' },
                    { value: 'active', label: 'Ativo' },
                    { value: 'inactive', label: 'Inativo' },
                  ]}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button variant="default" onClick={handleCloseModal} className="flex-1">
                  Cancelar
                </Button>
                <Button variant="primary" type="submit" className="flex-1">
                  {editingClient ? 'Salvar' : 'Criar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
