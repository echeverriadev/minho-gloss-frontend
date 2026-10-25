/** Respuesta paginada estándar de la API (spec api-architecture del backend). */
export interface Paginado<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
