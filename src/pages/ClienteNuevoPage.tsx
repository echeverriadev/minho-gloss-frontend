import { useNavigate } from 'react-router';
import { ClienteForm, type ClienteRequest, clientesApi } from '@/features/clientes';
import { Card } from '@/shared/ui/Card/Card';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { toast } from '@/shared/ui/Toast/store';
import { useTextos } from '@/shared/i18n/textos';

export function ClienteNuevoPage() {
  const navigate = useNavigate();
  const t = useTextos();

  const handleSubmit = async (datos: ClienteRequest) => {
    const cliente = await clientesApi.crear(datos);
    toast.success(t.clientes.guardado);
    await navigate(`/clientes/${cliente.id}`, { replace: true });
  };

  return (
    <>
      <PageHeader title={t.clientes.nuevo} backTo="/clientes" backLabel={t.clientes.volverALista} />
      <Card>
        <ClienteForm onSubmit={handleSubmit} onCancel={() => void navigate('/clientes')} />
      </Card>
    </>
  );
}
