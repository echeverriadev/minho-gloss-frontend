import { LoaderCircle } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export interface SpinnerProps {
  label?: string;
  className?: string;
}

export function Spinner({ label = 'Cargando…', className }: SpinnerProps) {
  return (
    <output className={cn('inline-flex items-center gap-2 text-slate-600', className)}>
      <LoaderCircle className="size-5 animate-spin" aria-hidden />
      <span className="sr-only">{label}</span>
    </output>
  );
}
