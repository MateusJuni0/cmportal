import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neon' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      children,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium tracking-tight
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      active:scale-[0.98]
    `;

    const variants = {
      primary: `
        bg-[var(--color-neon-green)] text-[var(--color-bg-primary)]
        hover:bg-[#00dd77]
        focus:ring-[var(--color-neon-green)]
        shadow-lg shadow-[var(--color-neon-green)]/20
        hover:shadow-xl hover:shadow-[var(--color-neon-green)]/30
      `,
      secondary: `
        bg-[var(--color-surface-light)] text-[var(--color-text-primary)]
        hover:bg-[var(--color-border-strong)]
        focus:ring-[var(--color-border-strong)]
        border border-[var(--color-border-default)]
      `,
      outline: `
        bg-transparent text-[var(--color-text-primary)]
        border border-[var(--color-border-default)]
        hover:bg-[var(--color-surface-dark)]
        focus:ring-[var(--color-border-default)]
      `,
      ghost: `
        bg-transparent text-[var(--color-text-secondary)]
        hover:bg-[var(--color-surface-dark)] hover:text-[var(--color-text-primary)]
        focus:ring-[var(--color-border-default)]
      `,
      neon: `
        bg-transparent text-[var(--color-neon-green)]
        border border-[var(--color-neon-green)]
        hover:bg-[var(--color-neon-green)] hover:text-[var(--color-bg-primary)]
        focus:ring-[var(--color-neon-green)]
        shadow-lg shadow-[var(--color-neon-green)]/10
        hover:shadow-xl hover:shadow-[var(--color-neon-green)]/20
      `,
      glass: `
        glass text-[var(--color-text-primary)]
        hover:bg-[var(--color-surface-light)]
        focus:ring-[var(--color-border-default)]
      `,
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md',
      md: 'h-10 px-4 text-sm rounded-lg',
      lg: 'h-12 px-6 text-base rounded-xl',
      xl: 'h-14 px-8 text-lg rounded-2xl',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
