import React from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'glass' | 'neumorph';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant = 'default',
      size = 'md',
      leftIcon,
      rightIcon,
      clearable = false,
      onClear,
      value,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      w-full
      bg-transparent text-[var(--color-text-primary)]
      placeholder:text-[var(--color-text-tertiary)]
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      default: `
        bg-[var(--color-surface-dark)]
        border border-[var(--color-border-default)]
        focus:border-[var(--color-neon-green)]
        focus:ring-[var(--color-neon-green)]/20
        rounded-lg
      `,
      glass: `
        glass
        focus:border-[var(--color-neon-green)]
        focus:ring-[var(--color-neon-green)]/20
        rounded-xl
      `,
      neumorph: `
        neumorph
        focus:ring-[var(--color-neon-green)]/20
        rounded-xl
      `,
    };

    const sizes = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-11 px-4 text-sm',
      lg: 'h-13 px-5 text-base',
    };

    const handleClear = () => {
      if (onClear) {
        onClear();
      }
    };

    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            baseStyles,
            variants[variant],
            sizes[size],
            leftIcon && 'pl-10',
            (rightIcon || clearable) && 'pr-10',
            className
          )}
          value={value}
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {rightIcon && !clearable && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface SearchInputProps extends Omit<InputProps, 'leftIcon'> {
  onSearch?: (value: string) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onSearch?.(e.target.value);
    };

    return (
      <Input
        ref={ref}
        leftIcon={<Search className="h-4 w-4" />}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';
