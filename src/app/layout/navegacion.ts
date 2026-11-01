import { ClipboardList, House, type LucideIcon, Settings, UserRound, Users } from 'lucide-react';
import type { Rol } from '@/features/auth';
import type { Textos } from '@/shared/i18n/textos';

export interface ItemNavegacion {
  to: string;
  etiqueta: keyof Omit<Textos['nav'], 'principal' | 'sinPermiso'>;
  icono: LucideIcon;
  /** Si se indica, solo lo ve ese rol. */
  rol?: Rol;
}

// Solo las secciones que ya existen; cada cambio de OpenSpec que agrega una suma su opción.
export const NAVEGACION: ItemNavegacion[] = [
  { to: '/', etiqueta: 'inicio', icono: House },
  { to: '/servicios', etiqueta: 'servicios', icono: ClipboardList },
  { to: '/clientes', etiqueta: 'clientes', icono: Users },
  { to: '/ajustes', etiqueta: 'ajustes', icono: Settings, rol: 'admin' },
  { to: '/perfil', etiqueta: 'perfil', icono: UserRound },
];
