import { House, type LucideIcon, Settings, UserRound, Users } from 'lucide-react';
import type { Rol } from '@/features/auth';

export interface ItemNavegacion {
  to: string;
  etiqueta: string;
  icono: LucideIcon;
  /** Si se indica, solo lo ve ese rol. */
  rol?: Rol;
}

// Solo las secciones que ya existen; cada cambio de OpenSpec que agrega una suma su opción.
export const NAVEGACION: ItemNavegacion[] = [
  { to: '/', etiqueta: 'Inicio', icono: House },
  { to: '/clientes', etiqueta: 'Clientes', icono: Users },
  { to: '/ajustes', etiqueta: 'Ajustes', icono: Settings, rol: 'admin' },
  { to: '/perfil', etiqueta: 'Perfil', icono: UserRound },
];
