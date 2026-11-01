import { useAsync } from '@/shared/hooks/useAsync';
import { atencionesApi } from '../api';
import type { FiltroAtenciones } from '../types';

/** Atenciones de un filtro con su resumen; se vuelve a pedir cuando cambia el filtro. */
export function useAtenciones({ desde, hasta, clienteId, page, limit }: FiltroAtenciones) {
  return useAsync(
    () => atencionesApi.listar({ desde, hasta, clienteId, page, limit }),
    [desde, hasta, clienteId, page, limit],
  );
}
