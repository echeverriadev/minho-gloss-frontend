import { useNavigate, useSearchParams } from 'react-router';
import { type Atencion, RegistroAtencionForm } from '@/features/atenciones';
import { clientesApi } from '@/features/clientes';
import { useAsync } from '@/shared/hooks/useAsync';
import { useTextos } from '@/shared/i18n/textos';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { toast } from '@/shared/ui/Toast/store';

export function RegistrarServicioPage() {
  const navigate = useNavigate();
  const t = useTextos();
  const [params] = useSearchParams();
  const clienteId = params.get('clienteId');
  // Desde la ficha del cliente se entra con el cliente ya elegido; si no se encuentra, sin cliente.
  const cliente = useAsync(
    () => (clienteId ? clientesApi.obtener(clienteId).catch(() => null) : Promise.resolve(null)),
    [clienteId],
  );
  const volverA = clienteId ? `/clientes/${clienteId}` : '/';

  const registrada = async (atencion: Atencion) => {
    toast.success(t.atenciones.registrado);
    await navigate(`/servicios/${atencion.id}`, { replace: true });
  };

  return (
    <>
      <PageHeader title={t.atenciones.registrar} backTo={volverA} />
      {cliente.isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <RegistroAtencionForm
          clienteInicial={cliente.data ?? null}
          onRegistrada={registrada}
          onCancel={() => void navigate(volverA)}
        />
      )}
    </>
  );
}
