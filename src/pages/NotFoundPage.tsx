import { SearchX } from 'lucide-react';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';

export function NotFoundPage() {
  return (
    <EmptyState
      icon={SearchX}
      title="No encontramos esta página"
      action={<ButtonLink to="/">Volver al inicio</ButtonLink>}
    />
  );
}
