import { ClientesList } from '@/features/clientes';
import { useTextos } from '@/shared/i18n/textos';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

export function ClientesPage() {
  const t = useTextos();
  return (
    <>
      <PageHeader title={t.clientes.titulo} />
      <ClientesList />
    </>
  );
}
