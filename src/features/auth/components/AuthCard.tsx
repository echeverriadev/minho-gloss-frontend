import { Droplets } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTextos } from '@/shared/i18n/textos';

export interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

/** Marco común de las pantallas sin sesión (login y recuperación). */
export function AuthCard({ title, description, children }: AuthCardProps) {
  const t = useTextos();
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center gap-6 px-4 py-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <Droplets className="text-brand-600 size-12" aria-hidden />
        <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
          {t.auth.marca}
        </p>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {description && <p className="text-slate-600">{description}</p>}
      </div>
      <div className="bg-surface rounded-xl p-5 shadow-sm ring-1 ring-slate-200">{children}</div>
    </main>
  );
}
