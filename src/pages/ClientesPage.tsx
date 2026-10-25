import { ClientesList } from '@/features/clientes';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

export function ClientesPage() {
  return (
    <>
      <PageHeader title="Clientes" />
      <ClientesList />
    </>
  );
}
