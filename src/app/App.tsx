import { RouterProvider } from 'react-router';
import { iniciarAuth } from '@/features/auth';
import { iniciarPreferencias } from '@/shared/preferencias/store';
import { router } from './router';

// Antes del primer render: aplica idioma y tema, conecta la sesión con apiClient y descarta
// una sesión vencida.
iniciarPreferencias();
iniciarAuth();

export function App() {
  return <RouterProvider router={router} />;
}
