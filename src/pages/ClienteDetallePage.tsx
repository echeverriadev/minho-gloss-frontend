import { useParams } from 'react-router';
import { ClienteDetalle, clientesApi } from '@/features/clientes';
import { useAsync } from '@/shared/hooks/useAsync';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export function ClienteDetallePage() {
  const { id = '' } = useParams();
  const { data: cliente, error, isLoading, reload } = useAsync(() => clientesApi.obtener(id), [id]);

  return (
    <>
      <PageHeader title="Ficha del cliente" backTo="/clientes" backLabel="Volver a clientes" />
      {isLoading && <Skeleton className="h-64 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {cliente && !isLoading && <ClienteDetalle cliente={cliente} />}
    </>
  );
}
