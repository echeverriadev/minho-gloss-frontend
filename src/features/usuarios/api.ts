import { apiClient } from '@/shared/lib/apiClient';
import type { Paginado } from '@/shared/lib/paginado';
import type { CrearUsuarioRequest, EditarUsuarioRequest, Usuario } from './types';

export const usuariosApi = {
  listar: (incluirInactivos: boolean) =>
    apiClient.get<Paginado<Usuario>>(
      `/usuarios?limit=100${incluirInactivos ? '&incluirInactivos=true' : ''}`,
    ),
  crear: (datos: CrearUsuarioRequest) => apiClient.post<Usuario>('/usuarios', datos),
  editar: (id: string, datos: EditarUsuarioRequest) =>
    apiClient.patch<Usuario>(`/usuarios/${id}`, datos),
  desactivar: (id: string) => apiClient.delete(`/usuarios/${id}`),
  restablecerPassword: (id: string, password: string) =>
    apiClient.post<void>(`/usuarios/${id}/restablecer-password`, { password }),
};
