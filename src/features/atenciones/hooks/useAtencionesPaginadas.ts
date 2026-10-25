import { useState } from 'react';
import { LIMITE_MAXIMO_API } from '../api';
import type { FiltroAtenciones } from '../types';
import { useAtenciones } from './useAtenciones';

const POR_PAGINA = 20;

/**
 * Atenciones de un filtro mostrando de a 20 con "Ver más". Pide una sola página cada vez más
 * grande (hasta el máximo de la API) para que el resumen y la lista vengan siempre juntos.
 */
export function useAtencionesPaginadas(filtro: Omit<FiltroAtenciones, 'page' | 'limit'>) {
  const [limite, setLimite] = useState(POR_PAGINA);
  const clave = `${filtro.desde}|${filtro.hasta}|${filtro.clienteId}`;
  const [claveAnterior, setClaveAnterior] = useState(clave);
  if (clave !== claveAnterior) {
    setClaveAnterior(clave);
    setLimite(POR_PAGINA);
  }
  const estado = useAtenciones({ ...filtro, page: 1, limit: limite });
  const cargadas = estado.data?.items.length ?? 0;
  return {
    ...estado,
    hayMas: (estado.data?.total ?? 0) > cargadas && limite < LIMITE_MAXIMO_API,
    verMas: () => setLimite((actual) => Math.min(actual + POR_PAGINA, LIMITE_MAXIMO_API)),
  };
}
