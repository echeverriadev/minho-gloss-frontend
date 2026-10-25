import { TiposServicioGestion } from '@/features/tipos-servicio';
import { useTextos } from '@/shared/i18n/textos';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

export function TiposServicioPage() {
  const t = useTextos();
  return (
    <>
      <PageHeader title={t.catalogo.titulo} backTo="/ajustes" backLabel={t.ajustes.volver} />
      <TiposServicioGestion />
    </>
  );
}
