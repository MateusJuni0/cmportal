import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'secondary' | 'purple' | 'neon' | 'info';
}

export function Badge({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: BadgeProps) {
  const variants = {
    default: 'bg-zinc-800/50 text-zinc-400 border-white/5',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
    destructive: 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.1)]',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]',
    secondary: 'bg-white/5 text-zinc-300 border-white/10',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]',
    neon: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.3)] animate-pulse',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-widest border transition-all duration-300',
        variants[variant as keyof typeof variants],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
