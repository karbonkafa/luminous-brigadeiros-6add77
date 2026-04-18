import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getCharacterInitial(code: string): string {
  return code.charAt(0);
}

export function getStatColor(value: number): string {
  if (value >= 9) return 'text-red-400';
  if (value >= 7) return 'text-amber-400';
  if (value >= 5) return 'text-accent-gold';
  if (value >= 3) return 'text-cyan-400';
  return 'text-gray-400';
}
