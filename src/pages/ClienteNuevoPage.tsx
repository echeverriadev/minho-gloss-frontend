import { useNavigate } from 'react-router';
import { ClienteForm, type ClienteRequest, clientesApi } from '@/features/clientes';
import { Card } from '@/shared/ui/Card/Card';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { toast } from '@/shared/ui/Toast/store';

export function ClienteNuevoPage() {
  const navigate = useNavigate();

  const handleSubmit = async (datos: ClienteRequest) => {
    const cliente = await clientesApi.crear(datos);
    toast.success('Cliente guardado');
    await navigate(`/clientes/${cliente.id}`, { replace: true });
  };

  return (
    <>
      <PageHeader title="Nuevo cliente" backTo="/clientes" backLabel="Volver a clientes" />
      <Card>
        <ClienteForm onSubmit={handleSubmit} onCancel={() => void navigate('/clientes')} />
      </Card>
    </>
  );
}
