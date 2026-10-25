import { SearchX } from 'lucide-react';
import { useTextos } from '@/shared/i18n/textos';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';

export function NotFoundPage() {
  const t = useTextos();
  return (
    <EmptyState
      icon={SearchX}
      title={t.comun.noEncontrada}
      action={<ButtonLink to="/">{t.comun.volverAlInicio}</ButtonLink>}
    />
  );
}
