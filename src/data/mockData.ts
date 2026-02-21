import { Agent, Lead, Client, FinancialData, WhatsAppAccount, LogEntry } from '../types';

export const mockAgents: Agent[] = [
  { id: '1', name: 'Dante', role: 'Chief Executive Agent', personality: 'Estratégico, focado em ROI e expansão de mercado.', status: 'online', skills: ['Vendas', 'Gestão', 'Estratégia'], createdAt: new Date() },
  { id: '2', name: 'Nero', role: 'Hunter Elite', personality: 'Persistente, analítico e focado em prospecção fria.', status: 'online', skills: ['LinkedIn Scraper', 'Email Hunting', 'Qualificação'], createdAt: new Date() },
  { id: '3', name: 'Lúcio', role: 'Architect QA', personality: 'Técnico, rigoroso com qualidade e estabilidade.', status: 'online', skills: ['Code Review', 'Infra', 'Segurança'], createdAt: new Date() },
];

export const mockLeads: Lead[] = [
  { id: '1', name: 'João Silva', company: 'TechStart Brasil', email: 'joao@techstart.com', phone: '+5511999999999', score: 92, source: 'linkedin', status: 'new', createdAt: new Date('2024-01-15') },
  { id: '2', name: 'Maria Santos', company: 'Digital Solutions', email: 'maria@digitalsol.com', phone: '+5511888888888', score: 85, source: 'instagram', status: 'contacted', createdAt: new Date('2024-01-14') },
  { id: '3', name: 'Pedro Costa', company: 'Inovação Tech', email: 'pedro@inovacaotech.com', phone: '+5511777777777', score: 78, source: 'zaask', status: 'qualified', createdAt: new Date('2024-01-13') },
  { id: '4', name: 'Ana Oliveira', company: 'Cloud Systems', email: 'ana@cloudsystems.com', phone: '+5511666666666', score: 71, source: 'google', status: 'proposal', createdAt: new Date('2024-01-12') },
  { id: '5', name: 'Carlos Mendes', company: 'DataFlow', email: 'carlos@dataflow.com', phone: '+5511555555555', score: 65, source: 'linkedin', status: 'new', createdAt: new Date('2024-01-11') },
];

export const mockClients: Client[] = [
  { id: '1', name: 'Empresa ABC Ltda', email: 'contato@abc.com', company: 'ABC Tecnologia', phone: '+5511999999999', status: 'active', plan: 'professional', startDate: new Date('2024-01-01'), monthlyValue: 1500 },
  { id: '2', name: 'XYZ Corporation', email: 'financeiro@xyz.com', company: 'XYZ Corp', phone: '+5511888888888', status: 'trial', plan: 'starter', startDate: new Date('2024-01-10'), trialEndDate: new Date('2024-01-24'), monthlyValue: 0 },
  { id: '3', name: 'Tech Innovators', email: 'ti@techinnovators.com', company: 'Tech Innovators SA', phone: '+5511777777777', status: 'active', plan: 'enterprise', startDate: new Date('2023-12-01'), monthlyValue: 5000 },
];

export const mockFinancialData: FinancialData[] = [
  { date: 'Jan', revenue: 12500, costs: 3200, profit: 9300, apiCosts: 1200 },
  { date: 'Fev', revenue: 15200, costs: 3800, profit: 11400, apiCosts: 1500 },
  { date: 'Mar', revenue: 18900, costs: 4200, profit: 14700, apiCosts: 1800 },
  { date: 'Abr', revenue: 21300, costs: 5100, profit: 16200, apiCosts: 2200 },
  { date: 'Mai', revenue: 24800, costs: 5800, profit: 19000, apiCosts: 2600 },
  { date: 'Jun', revenue: 28400, costs: 6400, profit: 22000, apiCosts: 2900 },
];

export const mockWhatsAppAccounts: WhatsAppAccount[] = [
  { id: '1', phoneNumber: '+351912345678', status: 'active', messagesSent: 1250, messagesReceived: 890, warmingProgress: 100, lastActivity: new Date() },
  { id: '2', phoneNumber: '+351912345679', status: 'warming', messagesSent: 450, messagesReceived: 320, warmingProgress: 45, lastActivity: new Date(Date.now() - 3600000) },
];

export const mockLogEntries: LogEntry[] = [
  { id: '1', timestamp: new Date(Date.now() - 60000), level: 'info', message: 'Dante iniciou prospecção estratégica para mercado imobiliário.' },
  { id: '2', timestamp: new Date(Date.now() - 55000), level: 'success', message: 'Nero identificou 15 novos leads de alta intenção no LinkedIn.' },
  { id: '3', timestamp: new Date(Date.now() - 50000), level: 'warning', message: 'Lúcio detectou latência acima do normal na Evolution API.' },
];
