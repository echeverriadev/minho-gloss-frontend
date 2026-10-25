import { UsuariosGestion } from '@/features/usuarios';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

export function UsuariosPage() {
  return (
    <>
      <PageHeader title="Usuarios" backTo="/ajustes" backLabel="Volver a ajustes" />
      <UsuariosGestion />
    </>
  );
}
