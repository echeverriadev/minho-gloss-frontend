import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { toast } from '@/shared/ui/Toast/store';
import { useSessionStore } from '../store';
import type { Rol } from '../types';

export interface RequireRoleProps {
  rol: Rol;
}

const MENSAJE_SIN_PERMISO = 'No tienes permiso para ver esa sección';

/** Rutas de un rol: a los demás los lleva al inicio con un aviso (spec app-shell). */
export function RequireRole({ rol }: RequireRoleProps) {
  const tieneRol = useSessionStore((state) => state.usuario?.rol === rol);
  useEffect(() => {
    if (!tieneRol) {
      toast.error(MENSAJE_SIN_PERMISO);
    }
  }, [tieneRol]);
  return tieneRol ? <Outlet /> : <Navigate to="/" replace />;
}
