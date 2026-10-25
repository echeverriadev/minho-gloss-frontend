import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200', className)}
      {...props}
    />
  );
}
