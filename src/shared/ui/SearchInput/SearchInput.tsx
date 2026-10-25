import { Search, X } from 'lucide-react';
import { type InputHTMLAttributes, useId } from 'react';
import { cn } from '@/shared/lib/cn';
import { inputClasses, inputStateClasses } from '../Field/fieldClasses';
import { useTextos } from '@/shared/i18n/textos';

export interface SearchInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
> {
  /** Etiqueta para lectores de pantalla (el campo no muestra etiqueta visible). */
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ label, value, onChange, id, className, ...props }: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const t = useTextos();
  return (
    <div className="relative">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(inputClasses, inputStateClasses(), 'pr-11 pl-10', className)}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={t.comun.borrarBusqueda}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-500 hover:text-slate-800"
        >
          <X className="size-5" aria-hidden />
        </button>
      )}
    </div>
  );
}
