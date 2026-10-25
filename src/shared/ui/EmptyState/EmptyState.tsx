import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
      <Icon className="size-10 text-slate-400" aria-hidden />
      <p className="text-lg font-medium text-slate-800">{title}</p>
      {description && <p className="max-w-sm text-slate-600">{description}</p>}
      {action}
    </div>
  );
}
