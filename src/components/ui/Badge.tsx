import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neon';
}

export function Badge({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        
        variant === 'default' && 'bg-[#1a1a25] text-[#94a3b8] border border-[rgba(148,163,184,0.1)]',
        variant === 'success' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        variant === 'warning' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        variant === 'danger' && 'bg-red-500/10 text-red-400 border border-red-500/20',
        variant === 'info' && 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
        variant === 'purple' && 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
        variant === 'neon' && 'bg-cyan-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20',
        
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
