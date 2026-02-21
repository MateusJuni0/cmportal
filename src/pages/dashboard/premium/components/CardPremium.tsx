import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const cardVariants = cva(
  'rounded-3xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-[#0f0f16] border-[rgba(148,163,184,0.1)] shadow-xl',
        glass: 'bg-[rgba(15,15,22,0.6)] backdrop-blur-xl border-[rgba(148,163,184,0.1)] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]',
        outline: 'bg-transparent border-[rgba(148,163,184,0.2)] hover:border-[rgba(148,163,184,0.4)]',
        gradient: 'bg-gradient-to-br from-[#0f0f16] to-[#1a1a25] border-[rgba(148,163,184,0.1)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'none',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, padding, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padding }), className)} {...props} />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}
