import type { TipoVehiculo } from '@/shared/lib/vehiculos';

export const CATEGORIAS_SERVICIO = ['servicio', 'extra'] as const;
export type CategoriaServicio = (typeof CATEGORIAS_SERVICIO)[number];

export const MODOS_PRECIO = ['por-vehiculo', 'unico'] as const;
export type ModoPrecio = (typeof MODOS_PRECIO)[number];

export type PreciosPorVehiculo = Record<TipoVehiculo, number>;

export interface TipoServicio {
  id: string;
  nombre: string;
  descripcion: string | null;
  categoria: CategoriaServicio;
  modoPrecio: ModoPrecio;
  /** Céntimos por tipo de vehículo; solo con `modoPrecio` `por-vehiculo`. */
  precios: PreciosPorVehiculo | null;
  /** Céntimos; solo con `modoPrecio` `unico`. */
  precioUnico: number | null;
  orden: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TipoServicioRequest {
  nombre: string;
  descripcion?: string;
  categoria: CategoriaServicio;
  modoPrecio: ModoPrecio;
  precios?: PreciosPorVehiculo;
  precioUnico?: number;
  orden: number;
}

/** Precio de lista para un tipo de vehículo, con la misma regla que la API (domain-model). */
export function calcularPrecioLista(
  tipo: Pick<TipoServicio, 'modoPrecio' | 'precios' | 'precioUnico'>,
  tipoVehiculo: TipoVehiculo,
): number {
  return tipo.modoPrecio === 'unico'
    ? (tipo.precioUnico ?? 0)
    : (tipo.precios?.[tipoVehiculo] ?? 0);
}
