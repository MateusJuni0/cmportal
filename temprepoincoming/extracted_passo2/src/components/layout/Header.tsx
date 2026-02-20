import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { Bell, Search, Menu, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

interface HeaderProps {
  className?: string;
  title?: string;
}

export function Header({ className = '', title }: HeaderProps) {
  const { sidebarCollapsed, toggleSidebar, unreadCount } = useAppStore();

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-20 glass-strong border-b border-[var(--color-border-subtle)]',
        'flex items-center justify-between px-6 z-40',
        sidebarCollapsed ? 'left-20' : 'left-72',
        'transition-all duration-300 ease-out',
        className
      )}
    >
      {/* Left Section - Title & Toggle */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {title && (
          <h1 className="text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
            {title}
          </h1>
        )}
      </div>

      {/* Right Section - Search, Notifications, User */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:block w-64">
          <Input
            variant="glass"
            size="sm"
            placeholder="Buscar... (Cmd+K)"
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="default"
              color="red"
              size="sm"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>

        {/* User Menu */}
        <Button variant="ghost" size="sm" className="gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="hidden lg:block text-sm font-medium">Admin</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
