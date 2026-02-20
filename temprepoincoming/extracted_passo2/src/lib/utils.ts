import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilitário para combinar classes CSS com Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formata um número para o formato de moeda
 */
export function formatCurrency(value: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Formata uma data para o formato legível
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return dateObj.toLocaleDateString('pt-PT', options || defaultOptions);
}

/**
 * Formata uma data e hora
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('pt-PT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Calcula a diferença de tempo em formato relativo
 */
export function timeAgo(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) return 'agora mesmo';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m atrás`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d atrás`;
  return formatDate(dateObj);
}

/**
 * Gera um score colorido baseado no valor
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-[var(--color-neon-green)]';
  if (score >= 60) return 'text-[var(--color-neon-blue)]';
  if (score >= 40) return 'text-[var(--color-neon-orange)]';
  return 'text-[var(--color-neon-red)]';
}

/**
 * Gera um badge de status colorido
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    new: 'bg-[var(--color-neon-blue)]',
    contacted: 'bg-[var(--color-neon-orange)]',
    qualified: 'bg-[var(--color-neon-purple)]',
    converted: 'bg-[var(--color-neon-green)]',
    lost: 'bg-[var(--color-neon-red)]',
    online: 'bg-[var(--color-neon-green)]',
    offline: 'bg-[var(--color-text-muted)]',
    busy: 'bg-[var(--color-neon-orange)]',
    success: 'bg-[var(--color-neon-green)]',
    warning: 'bg-[var(--color-neon-orange)]',
    error: 'bg-[var(--color-neon-red)]',
    info: 'bg-[var(--color-neon-blue)]',
  };
  return colors[status.toLowerCase()] || 'bg-[var(--color-text-muted)]';
}

/**
 * Trunca um texto com reticências
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Valida um email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Gera um ID único
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Debounce para funções
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Sleep utilitário
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
