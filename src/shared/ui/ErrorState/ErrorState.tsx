import { CircleAlert } from 'lucide-react';
import { Button } from '../Button/Button';
import { useTextos } from '@/shared/i18n/textos';

export interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const t = useTextos();
  return (
    <div role="alert" className="flex flex-col items-center gap-3 px-4 py-10 text-center">
      <CircleAlert className="size-10 text-red-600" aria-hidden />
      <p className="max-w-sm text-slate-800">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          {t.comun.reintentar}
        </Button>
      )}
    </div>
  );
}
