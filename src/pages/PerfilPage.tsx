import { LogOut } from 'lucide-react';
import {
  CambiarPasswordForm,
  PreferenciasForm,
  useSessionStore,
  useUsuarioActual,
} from '@/features/auth';
import { useTextos } from '@/shared/i18n/textos';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

export function PerfilPage() {
  const usuario = useUsuarioActual();
  const cerrarSesion = useSessionStore((state) => state.cerrarSesion);
  const t = useTextos();
  return (
    <>
      <PageHeader title={t.perfil.titulo} />
      <div className="flex flex-col gap-4">
        <Card className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-slate-900">{usuario.nombre}</p>
          <p className="text-slate-600">{usuario.email}</p>
          <div>
            <Badge tone={usuario.rol === 'admin' ? 'brand' : 'neutral'}>
              {t.roles[usuario.rol]}
            </Badge>
          </div>
        </Card>
        <Card className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-slate-900">{t.perfil.preferencias}</h2>
          <PreferenciasForm />
        </Card>
        <Card className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-slate-900">{t.auth.cambiarPassword}</h2>
          <CambiarPasswordForm />
        </Card>
        <Button variant="secondary" onClick={() => cerrarSesion()} fullWidth>
          <LogOut className="size-5" aria-hidden />
          {t.perfil.cerrarSesion}
        </Button>
      </div>
    </>
  );
}
