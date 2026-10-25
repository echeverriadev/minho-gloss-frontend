import { LoaderCircle } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useTextos } from '@/shared/i18n/textos';

export interface SpinnerProps {
  label?: string;
  className?: string;
}

export function Spinner({ label, className }: SpinnerProps) {
  const t = useTextos();
  return (
    <output className={cn('inline-flex items-center gap-2 text-slate-600', className)}>
      <LoaderCircle className="size-5 animate-spin" aria-hidden />
      <span className="sr-only">{label ?? t.comun.cargando}</span>
    </output>
  );
}
