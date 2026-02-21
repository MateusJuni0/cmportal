import { StateCreator } from 'zustand';
import { FinancialData, WhatsAppAccount, LogEntry } from '../../types';
import { mockFinancialData, mockWhatsAppAccounts, mockLogEntries } from '../../data/mockData';
import { AppState } from '../index';

export interface SystemSlice {
  financialData: FinancialData[];
  whatsappAccounts: WhatsAppAccount[];
  logs: LogEntry[];
  addLog: (message: string, level?: LogEntry['level'], agentId?: string) => void;
}

export const createSystemSlice: StateCreator<AppState, [], [], SystemSlice> = (set, get) => ({
  financialData: mockFinancialData,
  whatsappAccounts: mockWhatsAppAccounts,
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
});
