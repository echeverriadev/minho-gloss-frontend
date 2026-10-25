import { apiClient } from '@/shared/lib/apiClient';
import type { TipoServicio, TipoServicioRequest } from './types';

export const tiposServicioApi = {
  listar: (incluirInactivos = false) =>
    apiClient.get<TipoServicio[]>(
      `/tipos-servicio${incluirInactivos ? '?incluirInactivos=true' : ''}`,
    ),
  crear: (datos: TipoServicioRequest) => apiClient.post<TipoServicio>('/tipos-servicio', datos),
  editar: (id: string, datos: TipoServicioRequest) =>
    apiClient.patch<TipoServicio>(`/tipos-servicio/${id}`, datos),
  darDeBaja: (id: string) => apiClient.delete(`/tipos-servicio/${id}`),
};
