import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { useTextos } from '@/shared/i18n/textos';

export interface PageHeaderProps {
  title: string;
  /** Ruta a la que vuelve la flecha, si la pantalla es de segundo nivel. */
  backTo?: string;
  backLabel?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, backTo, backLabel, actions }: PageHeaderProps) {
  const t = useTextos();
  return (
    <div className="mb-4 flex items-center gap-2">
      {backTo && (
        <Link
          to={backTo}
          aria-label={backLabel ?? t.comun.volver}
          className="-ml-2 flex size-11 shrink-0 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
      )}
      <h1 className="min-w-0 flex-1 truncate text-2xl font-bold text-slate-900">{title}</h1>
      {actions}
    </div>
  );
}
