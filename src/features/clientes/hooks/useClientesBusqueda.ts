import { useCallback, useEffect, useMemo, useState } from 'react';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { clientesApi } from '../api';
import type { Cliente } from '../types';

export interface ClientesBusqueda {
  clientes: Cliente[];
  total: number;
  isLoading: boolean;
  error: string | undefined;
  hayMas: boolean;
  verMas: () => void;
  reintentar: () => void;
}

interface Pedido {
  q: string;
  page: number;
  intento: number;
}

interface Resultado {
  pedido: Pedido | null;
  q: string;
  clientes: Cliente[];
  total: number;
  error?: string;
}

/** Lista paginada de clientes para un texto de búsqueda, acumulando páginas con "Ver más". */
export function useClientesBusqueda(q: string): ClientesBusqueda {
  const [page, setPage] = useState(1);
  const [intento, setIntento] = useState(0);

  // Al cambiar la búsqueda se vuelve a la primera página (ajuste de estado durante el render).
  const [qAnterior, setQAnterior] = useState(q);
  if (q !== qAnterior) {
    setQAnterior(q);
    setPage(1);
  }

  const pedido = useMemo<Pedido>(() => ({ q, page, intento }), [q, page, intento]);
  const [resultado, setResultado] = useState<Resultado>({
    pedido: null,
    q,
    clientes: [],
    total: 0,
  });

  useEffect(() => {
    let vigente = true;
    clientesApi.listar(pedido.q, pedido.page).then(
      (respuesta) => {
        if (vigente) {
          setResultado((anterior) => ({
            pedido,
            q: pedido.q,
            clientes:
              pedido.page === 1 ? respuesta.items : [...anterior.clientes, ...respuesta.items],
            total: respuesta.total,
          }));
        }
        return undefined;
      },
      (error: unknown) => {
        if (vigente) {
          setResultado((anterior) => ({ ...anterior, pedido, error: mensajeDeError(error) }));
        }
      },
    );
    return () => {
      vigente = false;
    };
  }, [pedido]);

  const verMas = useCallback(() => setPage((actual) => actual + 1), []);
  const reintentar = useCallback(() => setIntento((actual) => actual + 1), []);

  const isLoading = resultado.pedido !== pedido;
  // Mientras llega una búsqueda nueva no se muestran los resultados de la anterior.
  const clientes = resultado.q === q ? resultado.clientes : [];

  return {
    clientes,
    total: resultado.total,
    isLoading,
    error: isLoading ? undefined : resultado.error,
    hayMas: clientes.length < resultado.total,
    verMas,
    reintentar,
  };
}
