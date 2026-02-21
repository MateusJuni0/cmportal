import { create } from 'zustand';
import { Agent, TrainingFile, Client, Lead, FinancialData, WhatsAppAccount, LogEntry } from '../types';
import { mockAgents, mockClients, mockLeads, mockFinancialData, mockWhatsAppAccounts, mockLogEntries } from '../data/mockData';

interface AppState {
  // Agents
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id" | "createdAt">) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  toggleAgentStatus: (id: string) => void;
  
  // Training
  trainingFiles: TrainingFile[];
  addTrainingFile: (file: Omit<TrainingFile, "id" | "uploadedAt">) => void;
  removeTrainingFile: (id: string) => void;

  // CRM: Clients
  clients: Client[];
  filteredClients: Client[];
  clientFilters: { search: string; status: string | null };
  setClientFilters: (filters: Partial<AppState['clientFilters']>) => void;
  addClient: (client: Omit<Client, "id">) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;

  // CRM: Leads
  leads: Lead[];
  filteredLeads: Lead[];
  leadFilters: { search: string; status: string | null; source: string | null };
  setLeadFilters: (filters: Partial<AppState['leadFilters']>) => void;
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;

  // Systems
  financialData: FinancialData[];
  whatsappAccounts: WhatsAppAccount[];
  
  // Intelligence Stream (Logs)
  logs: LogEntry[];
  addLog: (message: string, level?: LogEntry['level'], agentId?: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Agents
  agents: mockAgents as Agent[],
  addAgent: (agentData) => {
    const newAgent: Agent = { 
      ...agentData, 
      id: Math.random().toString(36).substr(2, 9), 
      createdAt: new Date() 
    };
    set((state) => ({ agents: [newAgent, ...state.agents] }));
    get().addLog(`Novo agente criado: ${newAgent.name}`, 'success');
  },
  updateAgent: (id, updates) => set((state) => ({
    agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a)
  })),
  deleteAgent: (id) => {
    const agent = get().agents.find(a => a.id === id);
    set((state) => ({ agents: state.agents.filter(a => a.id !== id) }));
    if (agent) get().addLog(`Agente deletado: ${agent.name}`, 'warning');
  },
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

  // Systems (Static for now, can be expanded to dynamic later)
  financialData: mockFinancialData,
  whatsappAccounts: mockWhatsAppAccounts,

  // Logs / Intelligence Stream
  logs: mockLogEntries,
  addLog: (message, level = 'info', agentId) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      level,
      message,
      agentId
    };
    set((state) => ({ logs: [newLog, ...state.logs].slice(0, 100) })); // Limit to 100 logs
  }
}));
