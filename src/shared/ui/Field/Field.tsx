import type { ReactNode } from 'react';

export interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  /** Se muestra junto al error, por ejemplo un enlace al registro que ya usa el dato. */
  errorAction?: ReactNode;
  children: ReactNode;
}

/** Etiqueta, ayuda y error comunes a todos los campos de formulario. */
export function Field({ id, label, error, hint, errorAction, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-800">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700">
          {error}
          {errorAction && <> · {errorAction}</>}
        </p>
      )}
    </div>
  );
}
