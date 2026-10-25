import { Eye, EyeOff } from 'lucide-react';
import { type InputHTMLAttributes, type Ref, useId, useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { Field } from '../Field/Field';
import { fieldDescribedBy, inputClasses, inputStateClasses } from '../Field/fieldClasses';

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  hint?: string;
  ref?: Ref<HTMLInputElement>;
}

/** Campo de contraseña con botón para mostrarla u ocultarla. */
export function PasswordInput({
  label,
  error,
  hint,
  id,
  className,
  ref,
  ...props
}: PasswordInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Field id={inputId} label={label} error={error} hint={hint}>
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          type={isVisible ? 'text' : 'password'}
          aria-invalid={error ? true : undefined}
          aria-describedby={fieldDescribedBy(inputId, error, hint)}
          className={cn(inputClasses, inputStateClasses(error), 'pr-12', className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          aria-pressed={isVisible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-slate-500 hover:text-slate-800"
        >
          {isVisible ? (
            <EyeOff className="size-5" aria-hidden />
          ) : (
            <Eye className="size-5" aria-hidden />
          )}
        </button>
      </div>
    </Field>
  );
}
