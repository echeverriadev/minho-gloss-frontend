export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'md' | 'sm';

// Compartidas por Button, IconButton, ButtonLink y los enlaces con forma de botón.
export const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-surface text-slate-900 ring-1 ring-slate-300 hover:bg-slate-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'text-slate-700 hover:bg-slate-100',
};

export const buttonSizeClasses: Record<ButtonSize, string> = {
  md: 'min-h-11 px-4',
  sm: 'min-h-11 px-3 text-sm',
};

export const buttonBaseClasses =
  'relative inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-50';
