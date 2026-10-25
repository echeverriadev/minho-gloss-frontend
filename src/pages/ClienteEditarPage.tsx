import { useNavigate, useParams } from 'react-router';
import { ClienteForm, type ClienteRequest, clientesApi } from '@/features/clientes';
import { useAsync } from '@/shared/hooks/useAsync';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { Card } from '@/shared/ui/Card/Card';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { toast } from '@/shared/ui/Toast/store';
import { useTextos } from '@/shared/i18n/textos';

export function ClienteEditarPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const t = useTextos();
  const { data: cliente, error, isLoading, reload } = useAsync(() => clientesApi.obtener(id), [id]);
  const volver = `/clientes/${id}`;

  const handleSubmit = async (datos: ClienteRequest) => {
    await clientesApi.editar(id, datos);
    toast.success(t.clientes.guardado);
    await navigate(volver, { replace: true });
  };

  return (
    <>
      <PageHeader title={t.clientes.editar} backTo={volver} backLabel={t.clientes.volverAFicha} />
      {isLoading && <Skeleton className="h-96 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {cliente && !isLoading && (
        <Card>
          <ClienteForm
            cliente={cliente}
            onSubmit={handleSubmit}
            onCancel={() => void navigate(volver)}
          />
        </Card>
      )}
    </>
  );
}
