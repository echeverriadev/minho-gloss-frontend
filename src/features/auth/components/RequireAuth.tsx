import { Navigate, Outlet, useLocation } from 'react-router';
import { isSesionVigente, useSessionStore } from '../store';

/** Rutas con sesión: sin sesión lleva a `/login` recordando a dónde se quería ir. */
export function RequireAuth() {
  const location = useLocation();
  const hasSesion = useSessionStore(
    (state) => state.token !== null && isSesionVigente(state.expiresAt),
  );
  if (!hasSesion) {
    return (
      <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
    );
  }
  return <Outlet />;
}
