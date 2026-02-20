import { create } from 'zustand';
import { User, Notification, ThemeConfig } from '@/types';

interface AppState {
  // Estado do Usuário
  user: User | null;
  isAuthenticated: boolean;
  
  // Estado das Notificações
  notifications: Notification[];
  unreadCount: number;
  
  // Estado do Tema
  theme: ThemeConfig;
  
  // Estado da Sidebar
  sidebarCollapsed: boolean;
  
  // Ações do Usuário
  setUser: (user: User | null) => void;
  logout: () => void;
  
  // Ações de Notificação
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  
  // Ações do Tema
  setTheme: (theme: Partial<ThemeConfig>) => void;
  
  // Ações da Sidebar
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Estado Inicial
  user: null,
  isAuthenticated: false,
  notifications: [],
  unreadCount: 0,
  theme: {
    primaryColor: '#00FF00',
    accentColor: '#00BFFF',
    darkMode: true,
    glassmorphism: true,
    neumorphism: true,
  },
  sidebarCollapsed: false,
  
  // Ações do Usuário
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user 
  }),
  
  logout: () => set({ 
    user: null, 
    isAuthenticated: false,
    notifications: [],
    unreadCount: 0,
  }),
  
  // Ações de Notificação
  addNotification: (notification) => set((state) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      read: false,
    };
    return {
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    };
  }),
  
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
    unreadCount: Math.max(0, state.unreadCount - 1),
  })),
  
  clearNotifications: () => set({ 
    notifications: [], 
    unreadCount: 0 
  }),
  
  // Ações do Tema
  setTheme: (theme) => set((state) => ({
    theme: { ...state.theme, ...theme },
  })),
  
  // Ações da Sidebar
  toggleSidebar: () => set((state) => ({
    sidebarCollapsed: !state.sidebarCollapsed,
  })),
  
  setSidebarCollapsed: (collapsed) => set({ 
    sidebarCollapsed: collapsed 
  }),
}));
