import { Agent, Lead, Client, FinancialData, WhatsAppAccount, LogEntry } from '../types';

export const mockAgents: Agent[] = [
  { 
    id: '1', 
    name: 'Dante', 
    role: 'Sovereign Architect', 
    personality: 'Analítico, estrategista e focado em escala massiva.', 
    status: 'online', 
    skills: ['Orquestração', 'Deploy Automation', 'State Sync'], 
    createdAt: new Date('2026-02-01') 
  },
  { 
    id: '2', 
    name: 'Nero', 
    role: 'Hunter Elite', 
    personality: 'Persistente e agressivo na prospecção de mercado luxo.', 
    status: 'online', 
    skills: ['Lead Scraping', 'Social Infiltration', 'Cold Outreach'], 
    createdAt: new Date('2026-02-05') 
  },
  { 
    id: '3', 
    name: 'Alfa', 
    role: 'Sniper Intention', 
    personality: 'Silencioso, preciso e focado em sinais de compra quentes.', 
    status: 'online', 
    skills: ['Intent Analysis', 'Real-time Monitoring', 'Signal Extraction'], 
    createdAt: new Date('2026-02-10') 
  },
];

export const mockLeads: Lead[] = [
  { id: '1', name: 'Ricardo Pereira', company: 'Belcanto Group', email: 'ricardo@belcanto.pt', phone: '+351912345678', score: 95, source: 'linkedin', status: 'qualified', createdAt: new Date('2026-02-18') },
  { id: '2', name: 'Sofia Amaral', company: 'Luxury Real Estate', email: 'sofia@luxury.pt', phone: '+351912345679', score: 88, source: 'instagram', status: 'new', createdAt: new Date('2026-02-19') },
  { id: '3', name: 'Biclaque Trajano', company: 'Independente', email: 'btrajano@gmail.com', phone: '+351934567890', score: 82, source: 'zaask', status: 'contacted', createdAt: new Date('2026-02-20') },
  { id: '4', name: 'António Silva', company: 'Almadrava Lisboa', email: 'antonio@almadrava.com', phone: '+351961234567', score: 75, source: 'google', status: 'proposal', createdAt: new Date('2026-02-21') },
];

export const mockClients: Client[] = [
  { id: '1', name: 'Mateus Oliveira', email: 'mateus@cmtecnologia.pt', company: 'CM Tecnologia', phone: '+351910000000', status: 'active', plan: 'enterprise', startDate: new Date('2026-01-01'), monthlyValue: 12500 },
  { id: '2', name: 'João Avillez', email: 'joao@avillez.pt', company: 'Grupo Avillez', phone: '+351912222222', status: 'active', plan: 'professional', startDate: new Date('2026-02-10'), monthlyValue: 2500 },
];

export const mockFinancialData: FinancialData[] = [
  { date: 'Set', revenue: 8500, costs: 2100, profit: 6400, apiCosts: 850 },
  { date: 'Out', revenue: 12200, costs: 3200, profit: 9000, apiCosts: 1100 },
  { date: 'Nov', revenue: 15900, costs: 4100, profit: 11800, apiCosts: 1400 },
  { date: 'Dez', revenue: 22300, costs: 5200, profit: 17100, apiCosts: 1900 },
  { date: 'Jan', revenue: 31800, costs: 6800, profit: 25000, apiCosts: 2600 },
  { date: 'Fev', revenue: 42500, costs: 8200, profit: 34300, apiCosts: 3200 },
];

export const mockWhatsAppAccounts: WhatsAppAccount[] = [
  { id: '1', phoneNumber: '+351910000001', status: 'active', messagesSent: 5420, messagesReceived: 3150, warmingProgress: 100, lastActivity: new Date() },
  { id: '2', phoneNumber: '+351910000002', status: 'warming', messagesSent: 850, messagesReceived: 420, warmingProgress: 65, lastActivity: new Date() },
];

export const mockLogEntries: LogEntry[] = [
  { id: '1', timestamp: new Date(Date.now() - 3600000), level: 'success', message: 'Dante concluiu a integração da Melhoria 2 com 100% de precisão.' },
  { id: '2', timestamp: new Date(Date.now() - 1800000), level: 'info', message: 'Nero iniciou varredura por leads luxo em Lisboa.' },
  { id: '3', timestamp: new Date(Date.now() - 600000), level: 'success', message: 'Lead "Almadrava Lisboa" capturado e classificado como Alta Intenção.' },
];
