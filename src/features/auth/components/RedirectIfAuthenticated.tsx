import { Navigate, Outlet } from 'react-router';
import { isSesionVigente, useSessionStore } from '../store';

/** Con sesión iniciada, abrir `/login` lleva al inicio. */
export function RedirectIfAuthenticated() {
  const hasSesion = useSessionStore(
    (state) => state.token !== null && isSesionVigente(state.expiresAt),
  );
  return hasSesion ? <Navigate to="/" replace /> : <Outlet />;
}
