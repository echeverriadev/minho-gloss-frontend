import { type Ref, type TextareaHTMLAttributes, useId } from 'react';
import { cn } from '@/shared/lib/cn';
import { Field } from '../Field/Field';
import { fieldDescribedBy, inputClasses, inputStateClasses } from '../Field/fieldClasses';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
  ref?: Ref<HTMLTextAreaElement>;
}

export function Textarea({
  label,
  error,
  hint,
  id,
  className,
  rows = 3,
  ref,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  return (
    <Field id={textareaId} label={label} error={error} hint={hint}>
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={fieldDescribedBy(textareaId, error, hint)}
        className={cn(inputClasses, inputStateClasses(error), 'py-2', className)}
        {...props}
      />
    </Field>
  );
}
