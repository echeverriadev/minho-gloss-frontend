export const ROLES = ['admin', 'empleado'] as const;
export type Rol = (typeof ROLES)[number];

export const ETIQUETA_ROL: Record<Rol, string> = {
  admin: 'Administrador',
  empleado: 'Empleado',
};

export interface UsuarioSesion {
  id: string;
  nombre: string;
  email: string;
  rol: Rol;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  /** Segundos hasta que vence el token. */
  expiresIn: number;
  usuario: UsuarioSesion;
}

export interface CambiarPasswordRequest {
  passwordActual: string;
  passwordNueva: string;
}

export interface RestablecerPasswordRequest {
  token: string;
  password: string;
}

export const PASSWORD_MIN = 8;
