import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'neon';
}

export function Card({ 
  children, 
  className, 
  variant = 'default',
  ...props 
}: CardProps) {
  return (
    <div 
      className={cn(
        'rounded-2xl p-6',
        variant === 'default' && 'bg-[#12121a] border border-[rgba(148,163,184,0.1)]',
        variant === 'glass' && 'glass',
        variant === 'neon' && 'glass neon-cyan',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ 
  children, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn('mb-4', className)} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ 
  children, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 
      className={cn('text-lg font-semibold text-white', className)} 
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ 
  children, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p 
      className={cn('text-sm text-[#94a3b8]', className)} 
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({ 
  children, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}
