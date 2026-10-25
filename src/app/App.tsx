import { RouterProvider } from 'react-router';
import { iniciarAuth } from '@/features/auth';
import { router } from './router';

// Antes del primer render: conecta la sesión con apiClient y descarta una sesión vencida.
iniciarAuth();

export function App() {
  return <RouterProvider router={router} />;
}
