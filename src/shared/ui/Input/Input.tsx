import { type InputHTMLAttributes, type ReactNode, type Ref, useId } from 'react';
import { cn } from '@/shared/lib/cn';
import { Field } from '../Field/Field';
import { fieldDescribedBy, inputClasses, inputStateClasses } from '../Field/fieldClasses';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  /** Contenido extra debajo del error, por ejemplo un enlace al cliente que ya usa el dato. */
  errorAction?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

export function Input({
  label,
  error,
  hint,
  errorAction,
  id,
  className,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <Field id={inputId} label={label} error={error} hint={hint} errorAction={errorAction}>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={fieldDescribedBy(inputId, error, hint)}
        className={cn(inputClasses, inputStateClasses(error), className)}
        {...props}
      />
    </Field>
  );
}
