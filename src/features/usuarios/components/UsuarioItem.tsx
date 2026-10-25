import { KeyRound, Pencil, UserCheck, UserX } from 'lucide-react';
import { ETIQUETA_ROL } from '@/features/auth';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Card } from '@/shared/ui/Card/Card';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import type { Usuario } from '../types';

export interface UsuarioItemProps {
  usuario: Usuario;
  esUsuarioActual: boolean;
  onEditar: () => void;
  onRestablecer: () => void;
  onDesactivar: () => void;
  onReactivar: () => void;
}

export function UsuarioItem({
  usuario,
  esUsuarioActual,
  onEditar,
  onRestablecer,
  onDesactivar,
  onReactivar,
}: UsuarioItemProps) {
  return (
    <Card className="flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900">
          {usuario.nombre}
          {esUsuarioActual && <span className="text-slate-500"> (tú)</span>}
        </p>
        <p className="truncate text-sm text-slate-600">{usuario.email}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          <Badge tone={usuario.rol === 'admin' ? 'brand' : 'neutral'}>
            {ETIQUETA_ROL[usuario.rol]}
          </Badge>
          {!usuario.activo && <Badge tone="danger">Inactivo</Badge>}
        </div>
      </div>
      <div className="flex shrink-0">
        <IconButton
          aria-label={`Editar a ${usuario.nombre}`}
          icon={<Pencil className="size-5" aria-hidden />}
          onClick={onEditar}
        />
        <IconButton
          aria-label={`Restablecer la contraseña de ${usuario.nombre}`}
          icon={<KeyRound className="size-5" aria-hidden />}
          onClick={onRestablecer}
        />
        {usuario.activo ? (
          !esUsuarioActual && (
            <IconButton
              aria-label={`Desactivar a ${usuario.nombre}`}
              icon={<UserX className="size-5 text-red-700" aria-hidden />}
              onClick={onDesactivar}
            />
          )
        ) : (
          <IconButton
            aria-label={`Reactivar a ${usuario.nombre}`}
            icon={<UserCheck className="size-5 text-green-700" aria-hidden />}
            onClick={onReactivar}
          />
        )}
      </div>
    </Card>
  );
}
