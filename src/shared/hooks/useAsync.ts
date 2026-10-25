import { type DependencyList, useCallback, useEffect, useMemo, useState } from 'react';

export interface AsyncState<T> {
  data: T | undefined;
  error: Error | undefined;
  isLoading: boolean;
  reload: () => void;
}

interface Resultado<T> {
  pedido: unknown;
  data?: T;
  error?: Error;
}

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

/**
 * Ejecuta una función asíncrona al montar y cuando cambian `deps`, ignorando respuestas viejas
 * o que llegan después de desmontar (spec app-shell). Mientras recarga conserva el último `data`.
 */
export function useAsync<T>(fn: () => Promise<T>, deps: DependencyList): AsyncState<T> {
  const [intento, setIntento] = useState(0);
  // oxlint-disable-next-line react/exhaustive-deps -- las dependencias las define quien llama
  const ejecutar = useCallback(fn, deps);
  // Cada pedido es un objeto nuevo: "cargando" significa que el último resultado es de otro pedido.
  const pedido = useMemo(() => ({ ejecutar, intento }), [ejecutar, intento]);
  const [resultado, setResultado] = useState<Resultado<T>>({ pedido: null });

  useEffect(() => {
    let vigente = true;
    pedido.ejecutar().then(
      (data) => {
        if (vigente) {
          setResultado({ pedido, data });
        }
        return undefined;
      },
      (error: unknown) => {
        if (vigente) {
          setResultado((anterior) => ({ pedido, data: anterior.data, error: toError(error) }));
        }
      },
    );
    return () => {
      vigente = false;
    };
  }, [pedido]);

  const isLoading = resultado.pedido !== pedido;
  const reload = useCallback(() => setIntento((valor) => valor + 1), []);

  return {
    data: resultado.data,
    error: isLoading ? undefined : resultado.error,
    isLoading,
    reload,
  };
}
