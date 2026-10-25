import { LogOut } from 'lucide-react';
import {
  CambiarPasswordForm,
  ETIQUETA_ROL,
  useSessionStore,
  useUsuarioActual,
} from '@/features/auth';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

export function PerfilPage() {
  const usuario = useUsuarioActual();
  const cerrarSesion = useSessionStore((state) => state.cerrarSesion);
  return (
    <>
      <PageHeader title="Mi perfil" />
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-slate-900">{usuario.nombre}</p>
          <p className="text-slate-600">{usuario.email}</p>
          <div>
            <Badge tone={usuario.rol === 'admin' ? 'brand' : 'neutral'}>
              {ETIQUETA_ROL[usuario.rol]}
            </Badge>
          </div>
        </Card>
        <Card className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-slate-900">Cambiar contraseña</h2>
          <CambiarPasswordForm />
        </Card>
        <Button variant="secondary" onClick={() => cerrarSesion()} fullWidth>
          <LogOut className="size-5" aria-hidden />
          Cerrar sesión
        </Button>
      </div>
    </>
  );
}
