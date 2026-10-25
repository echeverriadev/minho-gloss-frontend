import { useParams } from 'react-router';
import { ClienteDetalle, clientesApi } from '@/features/clientes';
import { useAsync } from '@/shared/hooks/useAsync';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useTextos } from '@/shared/i18n/textos';

export function ClienteDetallePage() {
  const { id = '' } = useParams();
  const t = useTextos();
  const { data: cliente, error, isLoading, reload } = useAsync(() => clientesApi.obtener(id), [id]);

  return (
    <>
      <PageHeader title={t.clientes.ficha} backTo="/clientes" backLabel={t.clientes.volverALista} />
      {isLoading && <Skeleton className="h-64 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {cliente && !isLoading && <ClienteDetalle cliente={cliente} />}
    </>
  );
}
