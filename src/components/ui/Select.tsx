import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SelectProps {
  value: string | null;
  onValueChange: (value: string | null) => void;
  options: { value: string | null; label: string }[];
  placeholder?: string;
  className?: string;
}

export function Select({ 
  value, 
  onValueChange, 
  options, 
  placeholder = 'Selecione...',
  className 
}: SelectProps) {
  return (
    <SelectPrimitive.Root value={value || ''} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger
        className={cn(
          'inline-flex items-center justify-between rounded-xl bg-[#12121a] border border-[rgba(148,163,184,0.1)] px-4 py-2.5 text-sm text-white transition-all duration-200',
          'focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/30',
          className
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDown className="h-4 w-4 text-[#64748b]" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="overflow-hidden rounded-xl bg-[#12121a] border border-[rgba(148,163,184,0.1)] shadow-xl z-50"
          position="popper"
          sideOffset={4}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value || 'all'}
                value={option.value || ''}
                className={cn(
                  'relative flex items-center rounded-lg px-3 py-2 text-sm text-[#94a3b8] cursor-pointer outline-none',
                  'select-none hover:bg-[#1a1a25] hover:text-white',
                  'data-[highlighted]:bg-[#1a1a25] data-[highlighted]:text-white'
                )}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2">
                  <Check className="h-4 w-4 text-[#22d3ee]" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
