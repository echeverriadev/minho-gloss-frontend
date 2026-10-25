import { useAsync } from '@/shared/hooks/useAsync';
import { tiposServicioApi } from '../api';

/** Catálogo de servicios y extras (los inactivos solo si se piden, y solo los ve el admin). */
export function useTiposServicio(incluirInactivos = false) {
  return useAsync(() => tiposServicioApi.listar(incluirInactivos), [incluirInactivos]);
}
