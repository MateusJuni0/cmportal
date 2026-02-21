import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function Input({ 
  className, 
  label,
  icon,
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#94a3b8] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full rounded-xl bg-[#12121a] border border-[rgba(148,163,184,0.1)] px-4 py-2.5 text-sm text-white placeholder-[#64748b] transition-all duration-200',
            'focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/30',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
