import { env } from '@/shared/config/env';

/** Error de la API con el código HTTP y el mensaje en español que devuelve el backend. */
export class ApiError extends Error {
  readonly status: number;
  readonly messages: string[];

  constructor(status: number, messages: string[]) {
    super(messages.join('. ') || `Error HTTP ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.messages = messages;
  }
}

interface ApiErrorBody {
  message?: string | string[];
}

async function toApiError(response: Response): Promise<ApiError> {
  try {
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- formato de error definido en la spec api-architecture del backend
    const body = (await response.json()) as ApiErrorBody;
    const messages = Array.isArray(body.message) ? body.message : [body.message ?? ''];
    return new ApiError(response.status, messages.filter(Boolean));
  } catch {
    return new ApiError(response.status, []);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');

  let response: Response;
  try {
    response = await fetch(`${env.apiUrl}${path}`, { ...init, headers });
  } catch {
    throw new ApiError(0, ['No hay conexión con el servidor']);
  }

  if (!response.ok) {
    throw await toApiError(response);
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
