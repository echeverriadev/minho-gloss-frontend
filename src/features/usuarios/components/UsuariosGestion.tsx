import { UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { useUsuarioActual } from '@/features/auth';
import { useAsync } from '@/shared/hooks/useAsync';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { Button } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog/ConfirmDialog';
import { Dialog } from '@/shared/ui/Dialog/Dialog';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { toast } from '@/shared/ui/Toast/store';
import { usuariosApi } from '../api';
import type { Usuario } from '../types';
import { RestablecerPasswordUsuarioForm } from './RestablecerPasswordUsuarioForm';
import { UsuarioForm, type UsuarioFormValues } from './UsuarioForm';
import { UsuarioItem } from './UsuarioItem';

type Accion =
  { tipo: 'crear' } | { tipo: 'editar' | 'restablecer' | 'desactivar'; usuario: Usuario } | null;

/** Pantalla del admin para administrar las cuentas del negocio (spec gestion-usuarios). */
export function UsuariosGestion() {
  const actual = useUsuarioActual();
  const [incluirInactivos, setIncluirInactivos] = useState(false);
  const [accion, setAccion] = useState<Accion>(null);
  const [isDesactivando, setIsDesactivando] = useState(false);
  const { data, error, isLoading, reload } = useAsync(
    () => usuariosApi.listar(incluirInactivos),
    [incluirInactivos],
  );
  const cerrar = () => setAccion(null);

  const handleGuardar = async (valores: UsuarioFormValues) => {
    if (accion?.tipo === 'editar') {
      await usuariosApi.editar(accion.usuario.id, { nombre: valores.nombre, rol: valores.rol });
      toast.success('Usuario actualizado');
    } else {
      await usuariosApi.crear(valores);
      toast.success('Usuario creado');
    }
    cerrar();
    reload();
  };

  const handleRestablecer = async (password: string) => {
    if (accion?.tipo !== 'restablecer') {
      return;
    }
    await usuariosApi.restablecerPassword(accion.usuario.id, password);
    toast.success('Contraseña restablecida');
    cerrar();
  };

  const handleDesactivar = async () => {
    if (accion?.tipo !== 'desactivar') {
      return;
    }
    setIsDesactivando(true);
    try {
      await usuariosApi.desactivar(accion.usuario.id);
      toast.success('Usuario desactivado');
      cerrar();
      reload();
    } catch (error_) {
      toast.error(mensajeDeError(error_));
    } finally {
      setIsDesactivando(false);
    }
  };

  const handleReactivar = async (usuario: Usuario) => {
    try {
      await usuariosApi.editar(usuario.id, { activo: true });
      toast.success('Usuario reactivado');
      reload();
    } catch (error_) {
      toast.error(mensajeDeError(error_));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Checkbox
          label="Ver también los inactivos"
          checked={incluirInactivos}
          onChange={(event) => setIncluirInactivos(event.target.checked)}
        />
        <Button onClick={() => setAccion({ tipo: 'crear' })}>
          <UserPlus className="size-5" aria-hidden />
          Agregar usuario
        </Button>
      </div>

      {isLoading && !data && <Skeleton className="h-24 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {data?.items.length === 0 && <EmptyState icon={Users} title="No hay usuarios para mostrar" />}
      <ul className="flex flex-col gap-2">
        {data?.items.map((usuario) => (
          <li key={usuario.id}>
            <UsuarioItem
              usuario={usuario}
              esUsuarioActual={usuario.id === actual.id}
              onEditar={() => setAccion({ tipo: 'editar', usuario })}
              onRestablecer={() => setAccion({ tipo: 'restablecer', usuario })}
              onDesactivar={() => setAccion({ tipo: 'desactivar', usuario })}
              onReactivar={() => void handleReactivar(usuario)}
            />
          </li>
        ))}
      </ul>

      <Dialog
        isOpen={accion?.tipo === 'crear' || accion?.tipo === 'editar'}
        title={accion?.tipo === 'editar' ? 'Editar usuario' : 'Agregar usuario'}
        onClose={cerrar}
      >
        <UsuarioForm
          usuario={accion?.tipo === 'editar' ? accion.usuario : undefined}
          onSubmit={handleGuardar}
          onCancel={cerrar}
        />
      </Dialog>
      <Dialog
        isOpen={accion?.tipo === 'restablecer'}
        title="Restablecer contraseña"
        onClose={cerrar}
      >
        {accion?.tipo === 'restablecer' && (
          <RestablecerPasswordUsuarioForm
            nombre={accion.usuario.nombre}
            onSubmit={handleRestablecer}
            onCancel={cerrar}
          />
        )}
      </Dialog>
      <ConfirmDialog
        isOpen={accion?.tipo === 'desactivar'}
        title={accion?.tipo === 'desactivar' ? `¿Desactivar a ${accion.usuario.nombre}?` : ''}
        description="No podrá iniciar sesión hasta que lo reactives. Su historial se conserva."
        confirmLabel="Desactivar"
        isLoading={isDesactivando}
        onConfirm={() => void handleDesactivar()}
        onCancel={cerrar}
      />
    </div>
  );
}
