import { type Ref, type SelectHTMLAttributes, useId } from 'react';
import { cn } from '@/shared/lib/cn';
import { Field } from '../Field/Field';
import { fieldDescribedBy, inputClasses, inputStateClasses } from '../Field/fieldClasses';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  hint?: string;
  ref?: Ref<HTMLSelectElement>;
}

export function Select({ label, options, error, hint, id, className, ref, ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  return (
    <Field id={selectId} label={label} error={error} hint={hint}>
      <select
        ref={ref}
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={fieldDescribedBy(selectId, error, hint)}
        className={cn(inputClasses, inputStateClasses(error), className)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
