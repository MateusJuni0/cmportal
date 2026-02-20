import React from 'react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import {
  LayoutDashboard,
  Users,
  Bot,
  DollarSign,
  MessageCircle,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  Image,
  Globe,
  Database,
  GitBranch,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  category?: string;
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    path: '/dashboard',
    category: 'Principal',
  },
  {
    id: 'leads',
    label: 'Leads Sniper',
    icon: <Users className="h-5 w-5" />,
    path: '/dashboard/leads',
    badge: 12,
    category: 'Principal',
  },
  {
    id: 'agents',
    label: 'Agent Factory',
    icon: <Bot className="h-5 w-5" />,
    path: '/dashboard/agents',
    category: 'Automação',
  },
  {
    id: 'creative-lab',
    label: 'Creative Lab',
    icon: <Image className="h-5 w-5" />,
    path: '/dashboard/creative-lab',
    category: 'Automação',
  },
  {
    id: 'terminal',
    label: 'Live Log',
    icon: <Terminal className="h-5 w-5" />,
    path: '/dashboard/terminal',
    category: 'Automação',
  },
  {
    id: 'financial',
    label: 'Financial',
    icon: <DollarSign className="h-5 w-5" />,
    path: '/dashboard/financial',
    category: 'Gestão',
  },
  {
    id: 'clients',
    label: 'Clientes',
    icon: <Users className="h-5 w-5" />,
    path: '/dashboard/clients',
    category: 'Gestão',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: <MessageCircle className="h-5 w-5" />,
    path: '/dashboard/whatsapp',
    category: 'Gestão',
  },
  {
    id: 'cms',
    label: 'Site Editor',
    icon: <FileText className="h-5 w-5" />,
    path: '/dashboard/cms',
    category: 'Conteúdo',
  },
  {
    id: 'landing-pages',
    label: 'Landing Pages',
    icon: <Globe className="h-5 w-5" />,
    path: '/dashboard/landing-pages',
    category: 'Conteúdo',
  },
  {
    id: 'ai-training',
    label: 'AI Training',
    icon: <Database className="h-5 w-5" />,
    path: '/dashboard/ai-training',
    category: 'Conteúdo',
  },
  {
    id: 'git-sync',
    label: 'Git Sync',
    icon: <GitBranch className="h-5 w-5" />,
    path: '/dashboard/git-sync',
    category: 'Sistema',
  },
  {
    id: 'deploy',
    label: 'Deploy',
    icon: <Sparkles className="h-5 w-5" />,
    path: '/dashboard/deploy',
    category: 'Sistema',
  },
  {
    id: 'settings',
    label: 'Configurações',
    icon: <Settings className="h-5 w-5" />,
    path: '/dashboard/settings',
    category: 'Sistema',
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  const groupedNavItems = navigationItems.reduce((acc, item) => {
    const category = item.category || 'Outros';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-full glass-strong border-r border-[var(--color-border-subtle)]',
        'transition-all duration-300 ease-out z-50',
        sidebarCollapsed ? 'w-20' : 'w-72',
        className
      )}
    >
      {/* Logo Section */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-[var(--color-border-subtle)]">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-blue)] flex items-center justify-center shadow-lg shadow-[var(--color-neon-green)]/20">
              <Sparkles className="h-6 w-6 text-[var(--color-bg-primary)]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
                Sovereign
              </h1>
              <p className="text-xs text-[var(--color-text-tertiary)]">Sales Engine</p>
            </div>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[var(--color-neon-green)] to-[var(--color-neon-blue)] flex items-center justify-center shadow-lg shadow-[var(--color-neon-green)]/20 mx-auto">
            <Sparkles className="h-6 w-6 text-[var(--color-bg-primary)]" />
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
        {Object.entries(groupedNavItems).map(([category, items]) => (
          <div key={category}>
            {!sidebarCollapsed && (
              <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-text-tertiary)]">
                {category}
              </h3>
            )}
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl',
                      'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                      'hover:bg-[var(--color-surface-dark)]',
                      'transition-all duration-200 ease-out',
                      'group relative',
                      sidebarCollapsed && 'justify-center'
                    )}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-sm font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge variant="neon" color="red" size="sm">
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                    {sidebarCollapsed && item.badge && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[var(--color-neon-red)] text-[10px] font-bold text-white flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--color-border-subtle)]">
        <Button
          variant="ghost"
          className={cn('w-full justify-start', sidebarCollapsed && 'justify-center')}
          leftIcon={<LogOut className="h-5 w-5" />}
        >
          {!sidebarCollapsed && 'Logout'}
        </Button>
      </div>
    </aside>
  );
}
