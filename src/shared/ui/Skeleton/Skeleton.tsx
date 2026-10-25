import { cn } from '@/shared/lib/cn';

export interface SkeletonProps {
  className?: string;
}

/** Bloque gris animado que ocupa el lugar del contenido mientras carga. */
export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden className={cn('animate-pulse rounded-lg bg-slate-200', className)} />;
}
