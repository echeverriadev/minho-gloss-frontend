import { TiposServicioGestion } from '@/features/tipos-servicio';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

export function TiposServicioPage() {
  return (
    <>
      <PageHeader title="Servicios y extras" backTo="/ajustes" backLabel="Volver a ajustes" />
      <TiposServicioGestion />
    </>
  );
}
