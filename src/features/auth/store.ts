import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { setAuthHandlers } from '@/shared/lib/apiClient';
import type { LoginResponse, UsuarioSesion } from './types';

export const MENSAJE_SESION_VENCIDA = 'Tu sesión venció, inicia sesión de nuevo';

interface SessionState {
  token: string | null;
  /** Milisegundos desde 1970 en que vence el token. */
  expiresAt: number | null;
  usuario: UsuarioSesion | null;
  /** Aviso para mostrar en el login (por ejemplo, sesión vencida). Se borra al leerlo. */
  avisoLogin: string | null;
  iniciarSesion: (respuesta: LoginResponse) => void;
  cerrarSesion: (aviso?: string) => void;
  tomarAvisoLogin: () => string | null;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      token: null,
      expiresAt: null,
      usuario: null,
      avisoLogin: null,
      iniciarSesion: ({ accessToken, expiresIn, usuario }) =>
        set({
          token: accessToken,
          expiresAt: Date.now() + expiresIn * 1000,
          usuario,
          avisoLogin: null,
        }),
      cerrarSesion: (aviso) =>
        set({ token: null, expiresAt: null, usuario: null, avisoLogin: aviso ?? null }),
      tomarAvisoLogin: () => {
        const aviso = get().avisoLogin;
        if (aviso) {
          set({ avisoLogin: null });
        }
        return aviso;
      },
    }),
    {
      name: 'minho-gloss-sesion',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ token, expiresAt, usuario }) => ({ token, expiresAt, usuario }),
    },
  ),
);

export function isSesionVigente(expiresAt: number | null, ahora = Date.now()): boolean {
  return expiresAt !== null && expiresAt > ahora;
}

/** Conecta la sesión con `apiClient` y descarta una sesión guardada que ya venció. */
export function iniciarAuth(): void {
  const { token, expiresAt, cerrarSesion } = useSessionStore.getState();
  if (token && !isSesionVigente(expiresAt)) {
    cerrarSesion(MENSAJE_SESION_VENCIDA);
  }
  setAuthHandlers({
    getToken: () => {
      const estado = useSessionStore.getState();
      return estado.token && isSesionVigente(estado.expiresAt) ? estado.token : undefined;
    },
    onUnauthorized: () => useSessionStore.getState().cerrarSesion(MENSAJE_SESION_VENCIDA),
  });
}

/** Usuario de la sesión; solo usar dentro de rutas protegidas. */
export function useUsuarioActual(): UsuarioSesion {
  const usuario = useSessionStore((state) => state.usuario);
  if (!usuario) {
    throw new Error('useUsuarioActual se usó fuera de una ruta con sesión');
  }
  return usuario;
}

export function useIsAdmin(): boolean {
  return useSessionStore((state) => state.usuario?.rol === 'admin');
}
