import React from 'react';

type BadgeColor = 'green' | 'blue' | 'purple' | 'red' | 'orange' | 'gray';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'neon' | 'outline' | 'soft';
  color?: BadgeColor;
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  children: React.ReactNode;
}

export function Badge({
  className = '',
  variant = 'default',
  color = 'gray',
  size = 'md',
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const colorClasses: Record<BadgeColor, { bg: string; text: string; border: string; soft: string }> = {
    green: {
      bg: 'bg-[var(--color-neon-green)]',
      text: 'text-[var(--color-neon-green)]',
      border: 'border-[var(--color-neon-green)]',
      soft: 'bg-[var(--color-neon-green)]/10',
    },
    blue: {
      bg: 'bg-[var(--color-neon-blue)]',
      text: 'text-[var(--color-neon-blue)]',
      border: 'border-[var(--color-neon-blue)]',
      soft: 'bg-[var(--color-neon-blue)]/10',
    },
    purple: {
      bg: 'bg-[var(--color-neon-purple)]',
      text: 'text-[var(--color-neon-purple)]',
      border: 'border-[var(--color-neon-purple)]',
      soft: 'bg-[var(--color-neon-purple)]/10',
    },
    red: {
      bg: 'bg-[var(--color-neon-red)]',
      text: 'text-[var(--color-neon-red)]',
      border: 'border-[var(--color-neon-red)]',
      soft: 'bg-[var(--color-neon-red)]/10',
    },
    orange: {
      bg: 'bg-[var(--color-neon-orange)]',
      text: 'text-[var(--color-neon-orange)]',
      border: 'border-[var(--color-neon-orange)]',
      soft: 'bg-[var(--color-neon-orange)]/10',
    },
    gray: {
      bg: 'bg-[var(--color-text-muted)]',
      text: 'text-[var(--color-text-secondary)]',
      border: 'border-[var(--color-border-strong)]',
      soft: 'bg-[var(--color-surface-light)]',
    },
  };

  const colors = colorClasses[color];

  const baseStyles = 'inline-flex items-center gap-1.5 font-medium tracking-tight transition-all duration-200';

  const variants: Record<string, string> = {
    default: `${colors.bg} text-[var(--color-bg-primary)]`,
    neon: `${colors.text} border ${colors.border} bg-transparent`,
    outline: `bg-transparent border ${colors.border} ${colors.text}`,
    soft: `${colors.soft} ${colors.text}`,
  };

  const sizes: Record<string, string> = {
    sm: 'h-5 px-2 text-xs rounded-md',
    md: 'h-6 px-2.5 text-xs rounded-lg',
    lg: 'h-7 px-3 text-sm rounded-xl',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${colors.bg}`} />
      )}
      {children}
    </span>
  );
}

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: string;
  variant?: 'default' | 'neon' | 'outline' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function StatusBadge({
  status,
  variant = 'soft',
  size = 'md',
  className = '',
  children,
  ...props
}: StatusBadgeProps) {
  const statusColors: Record<string, BadgeColor> = {
    new: 'blue',
    contacted: 'orange',
    qualified: 'purple',
    converted: 'green',
    lost: 'red',
    online: 'green',
    offline: 'gray',
    busy: 'orange',
    success: 'green',
    warning: 'orange',
    error: 'red',
    info: 'blue',
  };

  const color: BadgeColor = statusColors[status.toLowerCase()] || 'gray';

  return (
    <Badge
      variant={variant}
      color={color}
      size={size}
      dot
      className={className}
      {...props}
    >
      {children || status}
    </Badge>
  );
}

interface ScoreBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreBadge({
  score,
  size = 'md',
  className = '',
  ...props
}: ScoreBadgeProps) {
  const getColor = (score: number): BadgeColor => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'blue';
    if (score >= 40) return 'orange';
    return 'red';
  };

  const color: BadgeColor = getColor(score);

  return (
    <Badge
      variant="neon"
      color={color}
      size={size}
      className={`${className} font-bold`}
      {...props}
    >
      {score}
    </Badge>
  );
}
