import { apiClient } from '@/shared/lib/apiClient';
import type {
  CambiarPasswordRequest,
  LoginRequest,
  LoginResponse,
  RestablecerPasswordRequest,
  UsuarioSesion,
} from './types';

export const authApi = {
  login: (datos: LoginRequest) => apiClient.post<LoginResponse>('/auth/login', datos),
  me: () => apiClient.get<UsuarioSesion>('/auth/me'),
  cambiarPassword: (datos: CambiarPasswordRequest) =>
    apiClient.post<void>('/auth/cambiar-password', datos),
  recuperarPassword: (email: string) => apiClient.post<void>('/auth/recuperar-password', { email }),
  restablecerPassword: (datos: RestablecerPasswordRequest) =>
    apiClient.post<void>('/auth/restablecer-password', datos),
};
