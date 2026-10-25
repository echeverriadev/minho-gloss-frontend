import { Settings, UserPlus, Users } from 'lucide-react';
import { useIsAdmin, useUsuarioActual } from '@/features/auth';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';
import { Card } from '@/shared/ui/Card/Card';

export function HomePage() {
  const usuario = useUsuarioActual();
  const isAdmin = useIsAdmin();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-slate-900">Hola, {usuario.nombre.split(' ')[0]}</h1>
      <Card className="flex flex-col gap-3">
        <p className="text-slate-700">¿Qué quieres hacer?</p>
        <ButtonLink to="/clientes/nuevo" fullWidth>
          <UserPlus className="size-5" aria-hidden />
          Agregar cliente
        </ButtonLink>
        <ButtonLink to="/clientes" variant="secondary" fullWidth>
          <Users className="size-5" aria-hidden />
          Buscar un cliente
        </ButtonLink>
        {isAdmin && (
          <ButtonLink to="/ajustes/usuarios" variant="secondary" fullWidth>
            <Settings className="size-5" aria-hidden />
            Gestionar usuarios
          </ButtonLink>
        )}
      </Card>
    </div>
  );
}
