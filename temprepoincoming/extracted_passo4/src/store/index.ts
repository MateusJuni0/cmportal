import { create } from 'zustand';

export type AgentStatus = "online" | "offline";

export interface Agent {
  id: string;
  name: string;
  role: string;
  personality: string;
  status: AgentStatus;
  skills: string[];
}

export interface TrainingFile {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "url";
}

interface AppState {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, "id">) => void;
  toggleAgentStatus: (id: string) => void;
  
  trainingFiles: TrainingFile[];
  addTrainingFile: (file: Omit<TrainingFile, "id">) => void;
  removeTrainingFile: (id: string) => void;
  clearTrainingFiles: () => void;
}

const INITIAL_AGENTS: Agent[] = [
  { id: "1", name: "Alpha", role: "SDR Focado em Tech", personality: "Persuasivo, Direto", status: "online", skills: ["Cold Email", "LinkedIn"] },
  { id: "2", name: "Bravo", role: "Nutrição de Leads", personality: "Empático, Educativo", status: "offline", skills: ["Follow-up", "CRM"] },
];

export const useAppStore = create<AppState>((set) => ({
  agents: INITIAL_AGENTS,
  addAgent: (agent) => set((state) => ({ 
    agents: [{ ...agent, id: Math.random().toString(36).substr(2, 9) }, ...state.agents] 
  })),
  toggleAgentStatus: (id) => set((state) => ({
    agents: state.agents.map(a => a.id === id ? { ...a, status: a.status === 'online' ? 'offline' : 'online' } : a)
  })),

  trainingFiles: [],
  addTrainingFile: (file) => set((state) => ({
    trainingFiles: [...state.trainingFiles, { ...file, id: Math.random().toString(36).substr(2, 9) }]
  })),
  removeTrainingFile: (id) => set((state) => ({
    trainingFiles: state.trainingFiles.filter(f => f.id !== id)
  })),
  clearTrainingFiles: () => set({ trainingFiles: [] }),
}));
