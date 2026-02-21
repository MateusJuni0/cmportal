import { StateCreator } from 'zustand';
import { Client, Lead } from '../../types';
import { mockClients, mockLeads } from '../../data/mockData';
import { AppState } from '../index';

export interface CRMSlice {
  clients: Client[];
  filteredClients: Client[];
  clientFilters: { search: string; status: string | null };
  setClientFilters: (filters: Partial<CRMSlice['clientFilters']>) => void;
  addClient: (client: Omit<Client, "id">) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;

  leads: Lead[];
  filteredLeads: Lead[];
  leadFilters: { search: string; status: string | null; source: string | null };
  setLeadFilters: (filters: Partial<CRMSlice['leadFilters']>) => void;
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
}

export const createCRMSlice: StateCreator<AppState, [], [], CRMSlice> = (set, get) => ({
  // Clients
  clients: mockClients,
  filteredClients: mockClients,
  clientFilters: { search: '', status: null },
  setClientFilters: (filters) => {
    const newFilters = { ...get().clientFilters, ...filters };
    const filtered = get().clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(newFilters.search.toLowerCase()) || 
                            client.company.toLowerCase().includes(newFilters.search.toLowerCase());
      const matchesStatus = !newFilters.status || client.status === newFilters.status;
      return matchesSearch && matchesStatus;
    });
    set({ clientFilters: newFilters, filteredClients: filtered });
  },
  addClient: (clientData) => {
    const newClient: Client = { ...clientData, id: Math.random().toString(36).substr(2, 9) };
    set((state) => ({
      clients: [newClient, ...state.clients],
      filteredClients: [newClient, ...state.clients]
    }));
    get().addLog(`Novo cliente adicionado: ${newClient.company}`, 'success');
  },
  updateClient: (id, updates) => set((state) => ({
    clients: state.clients.map(c => c.id === id ? { ...c, ...updates } : c)
  })),

  // Leads
  leads: mockLeads,
  filteredLeads: mockLeads,
  leadFilters: { search: '', status: null, source: null },
  setLeadFilters: (filters) => {
    const newFilters = { ...get().leadFilters, ...filters };
    const filtered = get().leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(newFilters.search.toLowerCase()) || 
                            lead.company.toLowerCase().includes(newFilters.search.toLowerCase());
      const matchesStatus = !newFilters.status || lead.status === newFilters.status;
      const matchesSource = !newFilters.source || lead.source === newFilters.source;
      return matchesSearch && matchesStatus && matchesSource;
    });
    set({ leadFilters: newFilters, filteredLeads: filtered });
  },
  addLead: (leadData) => {
    const newLead: Lead = { 
      ...leadData, 
      id: Math.random().toString(36).substr(2, 9), 
      createdAt: new Date() 
    };
    set((state) => ({
      leads: [newLead, ...state.leads],
      filteredLeads: [newLead, ...state.leads]
    }));
    get().addLog(`Novo lead capturado: ${newLead.name} (${newLead.source})`, 'info');
  },
  updateLead: (id, updates) => set((state) => ({
    leads: state.leads.map(l => l.id === id ? { ...l, ...updates } : l)
  })),
});
