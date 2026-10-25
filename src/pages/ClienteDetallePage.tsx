import { Plus } from 'lucide-react';
import { useParams } from 'react-router';
import { HistorialCliente } from '@/features/atenciones';
import { ClienteDetalle, clientesApi } from '@/features/clientes';
import { useAsync } from '@/shared/hooks/useAsync';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';
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
      {cliente && !isLoading && (
        <div className="flex flex-col gap-6">
          {cliente.activo && (
            <ButtonLink to={`/servicios/nuevo?clienteId=${cliente.id}`} fullWidth>
              <Plus className="size-5" aria-hidden />
              {t.atenciones.registrar}
            </ButtonLink>
          )}
          <ClienteDetalle cliente={cliente} />
          <HistorialCliente clienteId={cliente.id} />
        </div>
      )}
    </>
  );
}
