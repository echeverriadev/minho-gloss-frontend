import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-white text-slate-900 ring-1 ring-slate-300 hover:bg-slate-100',
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`min-h-11 rounded-lg px-4 font-medium transition-colors disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
