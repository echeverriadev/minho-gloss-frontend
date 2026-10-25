import { apiClient } from '@/shared/lib/apiClient';
import type {
  Atencion,
  AtencionesPaginadas,
  AtencionRequest,
  FiltroAtenciones,
  MetodoPago,
} from './types';

export const ATENCIONES_POR_PAGINA = 20;
/** `limit` máximo que acepta la API (spec api-architecture del backend). */
export const LIMITE_MAXIMO_API = 100;

export const atencionesApi = {
  listar: ({
    desde,
    hasta,
    clienteId,
    page = 1,
    limit = ATENCIONES_POR_PAGINA,
  }: FiltroAtenciones) => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (desde) {
      params.set('desde', desde);
    }
    if (hasta) {
      params.set('hasta', hasta);
    }
    if (clienteId) {
      params.set('clienteId', clienteId);
    }
    return apiClient.get<AtencionesPaginadas>(`/atenciones?${params.toString()}`);
  },
  obtener: (id: string) => apiClient.get<Atencion>(`/atenciones/${id}`),
  registrar: (datos: AtencionRequest) => apiClient.post<Atencion>('/atenciones', datos),
  corregir: (id: string, datos: { metodoPago?: MetodoPago; notas?: string }) =>
    apiClient.patch<Atencion>(`/atenciones/${id}`, datos),
  anular: (id: string, motivo: string) =>
    apiClient.post<Atencion>(`/atenciones/${id}/anular`, { motivo }),
};
