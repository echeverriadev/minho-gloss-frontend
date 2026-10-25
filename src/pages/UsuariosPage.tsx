import { UsuariosGestion } from '@/features/usuarios';
import { useTextos } from '@/shared/i18n/textos';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

export function UsuariosPage() {
  const t = useTextos();
  return (
    <>
      <PageHeader title={t.usuarios.titulo} backTo="/ajustes" backLabel={t.ajustes.volver} />
      <UsuariosGestion />
    </>
  );
}
