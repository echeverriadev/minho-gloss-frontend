import { type ChangeEvent, useId, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { parseCentimos } from '@/shared/lib/dinero';
import { Field } from '../Field/Field';
import { fieldDescribedBy, inputClasses, inputStateClasses } from '../Field/fieldClasses';

export interface MoneyInputProps {
  label: string;
  /** Monto en céntimos, o `null` si está vacío. */
  value: number | null;
  onChange: (centimos: number | null) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
}

function formatEditable(centimos: number | null): string {
  return centimos === null ? '' : (centimos / 100).toFixed(2).replace('.', ',');
}

/** Campo de euros que acepta coma decimal y entrega céntimos enteros (spec app-shell). */
export function MoneyInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  disabled,
  id,
  name,
}: MoneyInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [texto, setTexto] = useState(() => formatEditable(value));

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTexto(event.target.value);
    onChange(parseCentimos(event.target.value));
  };

  const handleBlur = () => {
    setTexto(formatEditable(value));
    onBlur?.();
  };

  return (
    <Field id={inputId} label={label} error={error} hint={hint}>
      <div className="relative">
        <input
          id={inputId}
          name={name}
          inputMode="decimal"
          value={texto}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder="0,00"
          aria-invalid={error ? true : undefined}
          aria-describedby={fieldDescribedBy(inputId, error, hint)}
          className={cn(inputClasses, inputStateClasses(error), 'pr-10 text-right')}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
          €
        </span>
      </div>
    </Field>
  );
}
