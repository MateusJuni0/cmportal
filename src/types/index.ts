// Types for CM Portal V8.1 Elite

export type AgentStatus = "online" | "offline" | "training";

export interface Agent {
  id: string;
  name: string;
  role: string;
  personality: string;
  status: AgentStatus;
  skills: string[];
  avatar?: string;
  createdAt: Date;
}

export interface TrainingFile {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "url" | "text";
  status: 'pending' | 'processing' | 'completed' | 'error';
  uploadedAt: Date;
}

export interface GeneratedContent {
  id: string;
  type: 'image' | 'copy' | 'video';
  prompt: string;
  result: string;
  status: 'completed' | 'failed';
  createdAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  score: number;
  source: 'instagram' | 'linkedin' | 'zaask' | 'google' | 'direct';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  createdAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: 'active' | 'trial' | 'inactive' | 'churned';
  plan: 'starter' | 'professional' | 'enterprise';
  startDate: Date;
  trialEndDate?: Date;
  monthlyValue: number;
}

export interface FinancialData {
  date: string;
  revenue: number;
  costs: number;
  profit: number;
  apiCosts: number;
}

export interface WhatsAppAccount {
  id: string;
  phoneNumber: string;
  status: 'active' | 'warming' | 'limited' | 'banned';
  messagesSent: number;
  messagesReceived: number;
  warmingProgress: number;
  lastActivity: Date;
}

export interface LogEntry {
  id: string;
  timestamp: Date | string;
  level: 'info' | 'warning' | 'error' | 'success' | 'debug';
  message: string;
  agent?: string;
  agentId?: string;
  data?: any;
}
