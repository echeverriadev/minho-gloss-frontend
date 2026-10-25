import { apiClient } from '@/shared/lib/apiClient';
import type { Paginado } from '@/shared/lib/paginado';
import type { Cliente, ClienteRequest } from './types';

export const CLIENTES_POR_PAGINA = 20;

export const clientesApi = {
  listar: (q: string, page: number) => {
    const params = new URLSearchParams({ page: String(page), limit: String(CLIENTES_POR_PAGINA) });
    if (q.trim()) {
      params.set('q', q.trim());
    }
    return apiClient.get<Paginado<Cliente>>(`/clientes?${params.toString()}`);
  },
  obtener: (id: string) => apiClient.get<Cliente>(`/clientes/${id}`),
  crear: (datos: ClienteRequest) => apiClient.post<Cliente>('/clientes', datos),
  editar: (id: string, datos: Partial<ClienteRequest>) =>
    apiClient.patch<Cliente>(`/clientes/${id}`, datos),
  darDeBaja: (id: string) => apiClient.delete(`/clientes/${id}`),
  anonimizar: (id: string) => apiClient.post<void>(`/clientes/${id}/anonimizar`),
};
