import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'strong';
  hover?: boolean;
  border?: boolean;
}

export function GlassmorphismCard({
  children,
  intensity = 'medium',
  hover = false,
  border = true,
  className = '',
  ...props
}: GlassmorphismCardProps) {
  const intensities = {
    light: 'bg-[rgba(20,20,20,0.4)] backdrop-blur-[10px]',
    medium: 'bg-[rgba(20,20,20,0.6)] backdrop-blur-[20px]',
    strong: 'bg-[rgba(30,30,30,0.8)] backdrop-blur-[40px]',
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300 ease-out',
        intensities[intensity],
        border && 'border border-[var(--color-border-subtle)]',
        hover && 'hover:scale-[1.02] hover:shadow-2xl hover:border-[var(--color-border-strong)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassmorphismCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassmorphismCardHeader({
  children,
  className = '',
  ...props
}: GlassmorphismCardHeaderProps) {
  return (
    <div
      className={cn(
        'px-6 py-5 border-b border-[var(--color-border-subtle)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassmorphismCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function GlassmorphismCardTitle({
  children,
  as: Component = 'h3',
  className = '',
  ...props
}: GlassmorphismCardTitleProps) {
  return (
    <Component
      className={cn(
        'text-lg font-semibold tracking-tight text-[var(--color-text-primary)]',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface GlassmorphismCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function GlassmorphismCardDescription({
  children,
  className = '',
  ...props
}: GlassmorphismCardDescriptionProps) {
  return (
    <p
      className={cn('text-sm text-[var(--color-text-tertiary)] mt-1', className)}
      {...props}
    >
      {children}
    </p>
  );
}

interface GlassmorphismCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassmorphismCardContent({
  children,
  className = '',
  ...props
}: GlassmorphismCardContentProps) {
  return (
    <div className={cn('px-6 py-5', className)} {...props}>
      {children}
    </div>
  );
}

interface GlassmorphismCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassmorphismCardFooter({
  children,
  className = '',
  ...props
}: GlassmorphismCardFooterProps) {
  return (
    <div
      className={cn('px-6 py-4 border-t border-[var(--color-border-subtle)]', className)}
      {...props}
    >
      {children}
    </div>
  );
}
