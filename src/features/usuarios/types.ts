import type { Rol } from '@/features/auth';

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CrearUsuarioRequest {
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
}

export interface EditarUsuarioRequest {
  nombre?: string;
  rol?: Rol;
  activo?: boolean;
}
