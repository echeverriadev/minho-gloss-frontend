import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/shared/lib/cn';

export interface OpcionesRadioProps {
  legend: string;
  opciones: { value: string; label: string }[];
  valorActual: string;
  registro: UseFormRegisterReturn;
}

/** Botones de opción excluyentes, con radios nativos para teclado y lectores de pantalla. */
export function OpcionesRadio({ legend, opciones, valorActual, registro }: OpcionesRadioProps) {
  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="mb-1 text-sm font-medium text-slate-800">{legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        {opciones.map(({ value, label }) => (
          <label
            key={value}
            className={cn(
              'has-focus-visible:outline-brand-600 flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-3 text-center text-sm font-medium ring-1 has-focus-visible:outline-2',
              valorActual === value
                ? 'bg-brand-50 text-brand-700 ring-brand-600'
                : 'bg-surface text-slate-700 ring-slate-300',
            )}
          >
            <input type="radio" value={value} className="sr-only" {...registro} />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
