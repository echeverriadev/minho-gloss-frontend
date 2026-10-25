export interface Cliente {
  id: string;
  nombre: string;
  apellido: string;
  /** `null` solo en clientes anonimizados (RGPD). */
  cedula: string | null;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  /** Fecha de calendario `YYYY-MM-DD`. */
  fechaNacimiento: string | null;
  aceptaContacto: boolean;
  notas: string | null;
  activo: boolean;
  anonimizado: boolean;
  ultimoServicioEn: string | null;
  totalServicios: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClienteRequest {
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaNacimiento: string;
  aceptaContacto: boolean;
  notas?: string;
}

export function nombreCompleto(cliente: Pick<Cliente, 'nombre' | 'apellido'>): string {
  return `${cliente.nombre} ${cliente.apellido}`;
}
