import type { TipoVehiculo } from '@/shared/lib/vehiculos';
import type { Paginado } from '@/shared/lib/paginado';

export const METODOS_PAGO = ['efectivo', 'tarjeta', 'mbway', 'transferencia', 'otro'] as const;
export type MetodoPago = (typeof METODOS_PAGO)[number];

export type EstadoAtencion = 'completada' | 'anulada';
export type CategoriaItem = 'servicio' | 'extra' | 'personalizado';

/** Un servicio prestado dentro de la atención (domain-model). */
export interface ItemAtencion {
  tipoServicioId: string | null;
  nombre: string;
  categoria: CategoriaItem;
  /** Céntimos; `null` en los servicios personalizados. */
  precioLista: number | null;
  /** Precio cobrado en céntimos. */
  precio: number;
}

export interface ClienteAtencion {
  id: string;
  nombre: string;
  apellido: string;
  cedula: string | null;
  telefono: string | null;
  email: string | null;
}

export interface UsuarioAtencion {
  id: string;
  nombre: string;
}

export interface Atencion {
  id: string;
  numero: number;
  cliente: ClienteAtencion | null;
  tipoVehiculo: TipoVehiculo;
  placa: string | null;
  items: ItemAtencion[];
  total: number;
  metodoPago: MetodoPago;
  realizadoEn: string;
  registradoPor: UsuarioAtencion;
  notas: string | null;
  estado: EstadoAtencion;
  anulacion: { motivo: string; anuladoPor: UsuarioAtencion; anuladoEn: string } | null;
  createdAt: string;
  updatedAt: string;
}

export interface ResumenAtenciones {
  cantidad: number;
  total: number;
}

export interface AtencionesPaginadas extends Paginado<Atencion> {
  resumen: ResumenAtenciones;
}

export interface ItemAtencionRequest {
  tipoServicioId?: string;
  nombre?: string;
  precio?: number;
}

export interface AtencionRequest {
  clienteId?: string;
  tipoVehiculo: TipoVehiculo;
  placa?: string;
  items: ItemAtencionRequest[];
  metodoPago: MetodoPago;
  realizadoEn?: string;
  notas?: string;
}

export interface FiltroAtenciones {
  desde?: string;
  hasta?: string;
  clienteId?: string;
  page?: number;
  limit?: number;
}

/** Diferencia entre el precio de lista y el cobrado de los servicios del catálogo. */
export function ajustePrecios(items: readonly Pick<ItemAtencion, 'precioLista' | 'precio'>[]) {
  return items.reduce(
    (suma, item) => (item.precioLista === null ? suma : suma + item.precioLista - item.precio),
    0,
  );
}

/** Placa en mayúsculas sin espacios, puntos ni guiones, como la guarda la API. */
export function normalizarPlaca(texto: string): string {
  return texto.toUpperCase().replace(/[\s.\-/]/g, '');
}
