import { type InputHTMLAttributes, type Ref, useId } from 'react';
import { cn } from '@/shared/lib/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  hint?: string;
  ref?: Ref<HTMLInputElement>;
}

export function Checkbox({ label, error, hint, id, className, ref, ...props }: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const describedBy = [error && `${checkboxId}-error`, hint && `${checkboxId}-hint`]
    .filter(Boolean)
    .join(' ');
  return (
    <div className="flex flex-col gap-1">
      <div className="flex min-h-11 items-start gap-3">
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn('accent-brand-600 mt-0.5 size-6 shrink-0 rounded', className)}
          {...props}
        />
        <label htmlFor={checkboxId} className="text-base text-slate-800">
          {label}
        </label>
      </div>
      {hint && !error && (
        <p id={`${checkboxId}-hint`} className="text-sm text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${checkboxId}-error`} className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
