/** Ids de ayuda y error de un campo, para `aria-describedby`. */
export function fieldDescribedBy(id: string, error?: string, hint?: string): string | undefined {
  const ids = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean);
  return ids.length ? ids.join(' ') : undefined;
}

export const inputClasses =
  'block min-h-11 w-full rounded-lg border bg-white px-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-2 focus:outline-offset-0 focus:outline-brand-600 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500';

export function inputStateClasses(error?: string): string {
  return error ? 'border-red-600' : 'border-slate-300';
}
