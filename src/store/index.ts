import { create } from 'zustand';
import { Agent, TrainingFile, Client, Lead, FinancialData, WhatsAppAccount, LogEntry } from '../types';
import { mockAgents, mockClients, mockLeads, mockFinancialData, mockWhatsAppAccounts, mockLogEntries } from '../data/mockData';

interface AppState {
  // Agents
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id" | "createdAt">) => void;
  toggleAgentStatus: (id: string) => void;
  
  // Training
  trainingFiles: TrainingFile[];
  addTrainingFile: (file: Omit<TrainingFile, "id" | "uploadedAt">) => void;
  removeTrainingFile: (id: string) => void;
  clearTrainingFiles: () => void;

  // Clients
  clients: Client[];
  filteredClients: Client[];
  clientFilters: { search: string; status: string | null };
  setClientFilters: (filters: Partial<AppState['clientFilters']>) => void;
  addClient: (client: Omit<Client, "id">) => void;

  // Leads
  leads: Lead[];
  filteredLeads: Lead[];
  leadFilters: { search: string; status: string | null };
  setLeadFilters: (filters: Partial<AppState['leadFilters']>) => void;

  // Financial
  financialData: FinancialData[];

  // WhatsApp
  whatsappAccounts: WhatsAppAccount[];

  // Logs
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, "id" | "timestamp">) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Agents
  agents: mockAgents as Agent[],
  addAgent: (agent) => set((state) => ({ 
    agents: [{ ...agent, id: Math.random().toString(36).substr(2, 9), createdAt: new Date() }, ...state.agents] 
  })),
  toggleAgentStatus: (id) => set((state) => ({
    agents: state.agents.map(a => a.id === id ? { ...a, status: a.status === 'online' ? 'offline' : 'online' } : a)
  })),

  // Training
  trainingFiles: [],
  addTrainingFile: (file) => set((state) => ({
    trainingFiles: [...state.trainingFiles, { ...file, id: Math.random().toString(36).substr(2, 9), uploadedAt: new Date() }]
  })),
  removeTrainingFile: (id) => set((state) => ({
    trainingFiles: state.trainingFiles.filter(f => f.id !== id)
  })),
  clearTrainingFiles: () => set({ trainingFiles: [] }),

  // Clients
  clients: mockClients,
  filteredClients: mockClients,
  clientFilters: { search: '', status: null },
  setClientFilters: (filters) => set((state) => {
    const newFilters = { ...state.clientFilters, ...filters };
    const filtered = state.clients.filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(newFilters.search.toLowerCase()) || 
                            client.company.toLowerCase().includes(newFilters.search.toLowerCase());
      const matchesStatus = !newFilters.status || client.status === newFilters.status;
      return matchesSearch && matchesStatus;
    });
    return { clientFilters: newFilters, filteredClients: filtered };
  }),
  addClient: (client) => set((state) => ({
    clients: [{ ...client, id: Math.random().toString(36).substr(2, 9) }, ...state.clients],
    filteredClients: [{ ...client, id: Math.random().toString(36).substr(2, 9) }, ...state.clients]
  })),

  // Leads
  leads: mockLeads,
  filteredLeads: mockLeads,
  leadFilters: { search: '', status: null },
  setLeadFilters: (filters) => set((state) => {
    const newFilters = { ...state.leadFilters, ...filters };
    const filtered = state.leads.filter(lead => {
      const matchesSearch = lead.name.toLowerCase().includes(newFilters.search.toLowerCase()) || 
                            lead.company.toLowerCase().includes(newFilters.search.toLowerCase());
      const matchesStatus = !newFilters.status || lead.status === newFilters.status;
      return matchesSearch && matchesStatus;
    });
    return { leadFilters: newFilters, filteredLeads: filtered };
  }),

  // Financial
  financialData: mockFinancialData,

  // WhatsApp
  whatsappAccounts: mockWhatsAppAccounts,

  // Logs
  logs: mockLogEntries,
  addLog: (log) => set((state) => ({
    logs: [{ ...log, id: Math.random().toString(36).substr(2, 9), timestamp: new Date() }, ...state.logs]
  })),
}));
