import { Settings, UserPlus, Users } from 'lucide-react';
import { useIsAdmin, useUsuarioActual } from '@/features/auth';
import { useTextos } from '@/shared/i18n/textos';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';
import { Card } from '@/shared/ui/Card/Card';

export function HomePage() {
  const usuario = useUsuarioActual();
  const isAdmin = useIsAdmin();
  const t = useTextos();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-slate-900">
        {t.inicio.saludo(usuario.nombre.split(' ')[0])}
      </h1>
      <Card className="flex flex-col gap-3">
        <p className="text-slate-700">{t.inicio.queHacer}</p>
        <ButtonLink to="/clientes/nuevo" fullWidth>
          <UserPlus className="size-5" aria-hidden />
          {t.inicio.agregarCliente}
        </ButtonLink>
        <ButtonLink to="/clientes" variant="secondary" fullWidth>
          <Users className="size-5" aria-hidden />
          {t.inicio.buscarCliente}
        </ButtonLink>
        {isAdmin && (
          <ButtonLink to="/ajustes/usuarios" variant="secondary" fullWidth>
            <Settings className="size-5" aria-hidden />
            {t.inicio.gestionarUsuarios}
          </ButtonLink>
        )}
      </Card>
    </div>
  );
}
