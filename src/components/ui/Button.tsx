import React from 'react';
import { cn } from '@/utils/cn';
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export function Button({ 
  children, 
  className, 
  variant = 'default',
  size = 'md',
  asChild = false,
  ...props 
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0a0f] disabled:opacity-50 disabled:cursor-not-allowed',
        
        // Size variants
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-6 py-3 text-base',
        
        // Color variants
        variant === 'default' && 'bg-[#1a1a25] text-white hover:bg-[#252532] border border-[rgba(148,163,184,0.1)]',
        variant === 'primary' && 'bg-[#22d3ee] text-[#0a0a0f] hover:bg-[#06b6d4] shadow-lg shadow-cyan-500/20',
        variant === 'secondary' && 'bg-[#a855f7] text-white hover:bg-[#9333ea] shadow-lg shadow-purple-500/20',
        variant === 'ghost' && 'text-[#94a3b8] hover:text-white hover:bg-[#1a1a25]',
        variant === 'danger' && 'bg-[#ef4444] text-white hover:bg-[#dc2626]',
        variant === 'neon' && 'bg-transparent text-[#22d3ee] border border-[#22d3ee] hover:bg-[#22d3ee]/10 shadow-lg shadow-cyan-500/20',
        
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
