import { CircleAlert, CircleCheck } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export interface FormAlertProps {
  tipo: 'error' | 'success' | 'info';
  children: ReactNode;
}

const tipoClasses: Record<FormAlertProps['tipo'], string> = {
  error: 'bg-red-50 text-red-800 ring-red-200',
  success: 'bg-green-50 text-green-800 ring-green-200',
  info: 'bg-brand-50 text-brand-700 ring-brand-100',
};

/** Mensaje arriba de un formulario (errores generales de la API o confirmaciones). */
export function FormAlert({ tipo, children }: FormAlertProps) {
  return (
    <div
      role={tipo === 'error' ? 'alert' : 'status'}
      className={cn('flex gap-2 rounded-lg p-3 text-sm ring-1', tipoClasses[tipo])}
    >
      {tipo === 'error' ? (
        <CircleAlert className="size-5 shrink-0" aria-hidden />
      ) : (
        <CircleCheck className="size-5 shrink-0" aria-hidden />
      )}
      <div>{children}</div>
    </div>
  );
}
