// Estrutura de tipos TypeScript para o Sovereign Sales Engine

// Tipos de Navegação
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

// Tipos de Usuário
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'viewer';
}

// Tipos de Lead
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: 'instagram' | 'linkedin' | 'zaask' | 'website' | 'other';
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: Date;
  lastInteraction?: Date;
}

// Tipos de Agente
export interface Agent {
  id: string;
  name: string;
  description: string;
  voiceTone: string;
  status: 'online' | 'offline' | 'busy';
  tasksCompleted: number;
  lastActive?: Date;
}

// Tipos de Notificação
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  read: boolean;
  createdAt: Date;
}

// Tipos de Configuração do Tema
export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  darkMode: boolean;
  glassmorphism: boolean;
  neumorphism: boolean;
}
