import { env } from '@/shared/config/env';

/** Error de la API con el código HTTP y el mensaje en español que devuelve el backend. */
export class ApiError extends Error {
  readonly status: number;
  readonly messages: string[];
  /** Datos extra de algunos errores, por ejemplo el campo y el cliente de un 409 por duplicado. */
  readonly detalle: { campo?: string; clienteId?: string };

  constructor(status: number, messages: string[], detalle: ApiError['detalle'] = {}) {
    super(messages.join('. ') || `Error HTTP ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.messages = messages;
    this.detalle = detalle;
  }
}

/** Mensaje en español para mostrar al usuario a partir de cualquier error. */
export function mensajeDeError(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  return 'Ocurrió un error inesperado, intenta de nuevo';
}

interface ApiErrorBody {
  message?: string | string[];
  campo?: string;
  clienteId?: string;
}

async function toApiError(response: Response): Promise<ApiError> {
  try {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- formato de error definido en la spec api-architecture del backend
    const body = (await response.json()) as ApiErrorBody;
    const messages = Array.isArray(body.message) ? body.message : [body.message ?? ''];
    return new ApiError(response.status, messages.filter(Boolean), {
      campo: body.campo,
      clienteId: body.clienteId,
    });
  } catch {
    return new ApiError(response.status, []);
  }
}

interface AuthHandlers {
  getToken: () => string | undefined;
  onUnauthorized: () => void;
}

let authHandlers: AuthHandlers = {
  getToken: () => undefined,
  onUnauthorized: () => undefined,
};

/**
 * La sesión vive en la feature `auth`; la registra aquí para que `shared` no dependa de ella.
 */
export function setAuthHandlers(handlers: AuthHandlers): void {
  authHandlers = handlers;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  const token = authHandlers.getToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${env.apiUrl}${path}`, { ...init, headers });
  } catch {
    throw new ApiError(0, ['No hay conexión con el servidor']);
  }

  if (!response.ok) {
    const error = await toApiError(response);
    // Un 401 con sesión significa que venció o el usuario fue desactivado: se cierra la sesión.
    if (response.status === 401 && token) {
      authHandlers.onUnauthorized();
    }
    throw error;
  }

  if (response.status === 204) {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- las respuestas 204 no tienen cuerpo
    return undefined as T;
  }

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- límite con la API: el contrato lo define el backend
  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body ?? {}) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T = void>(path: string) => request<T>(path, { method: 'DELETE' }),
};
