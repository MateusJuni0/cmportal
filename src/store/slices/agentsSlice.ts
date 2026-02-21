import { StateCreator } from 'zustand';
import { Agent } from '../../types';
import { mockAgents } from '../../data/mockData';
import { AppState } from '../index';

export interface AgentsSlice {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id" | "createdAt">) => void;
  updateAgent: (id: string, updates: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  toggleAgentStatus: (id: string) => void;
}

export const createAgentsSlice: StateCreator<AppState, [], [], AgentsSlice> = (set, get) => ({
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
});
