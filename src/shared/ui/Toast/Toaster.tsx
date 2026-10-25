import { CircleAlert, CircleCheck, X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { type ToastTipo, useToastStore } from './store';

const tipoClasses: Record<ToastTipo, string> = {
  success: 'bg-slate-900 text-white',
  error: 'bg-red-700 text-white',
};

export interface ToasterProps {
  className?: string;
}

/** Contenedor de avisos breves; se monta una vez en el layout. */
export function Toaster({ className }: ToasterProps) {
  const toasts = useToastStore((state) => state.toasts);
  const cerrar = useToastStore((state) => state.cerrar);
  return (
    <div
      aria-live="polite"
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-20 z-50 flex flex-col items-center gap-2 px-4 md:bottom-6',
        className,
      )}
    >
      {toasts.map((item) => (
        <div
          key={item.id}
          className={cn(
            'pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-lg px-4 py-3 shadow-lg',
            tipoClasses[item.tipo],
          )}
        >
          {item.tipo === 'success' ? (
            <CircleCheck className="size-5 shrink-0" aria-hidden />
          ) : (
            <CircleAlert className="size-5 shrink-0" aria-hidden />
          )}
          <p className="flex-1 text-sm">{item.mensaje}</p>
          <button
            type="button"
            onClick={() => cerrar(item.id)}
            aria-label="Cerrar aviso"
            className="-mr-2 flex size-11 items-center justify-center rounded-lg opacity-80 hover:opacity-100"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      ))}
    </div>
  );
}
