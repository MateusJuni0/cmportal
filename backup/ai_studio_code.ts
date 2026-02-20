export interface Agent {
  id: string;
  name: 'Dante' | 'Nero' | 'Alfa';
  status: 'online' | 'offline' | 'learning' | 'deploying';
  vps_ip: string;
  last_heartbeat: string;
}

export interface FinanceLedger {
  id: string;
  type: 'revenue' | 'expense';
  category: 'api_cost' | 'vps' | 'deal_closed' | 'marketing';
  amount: number;
  description: string;
  created_at: string;
}