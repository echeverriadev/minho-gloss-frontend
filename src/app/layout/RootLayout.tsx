import { Outlet } from 'react-router';
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import { Toaster } from '@/shared/ui/Toast/Toaster';

export function RootLayout() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

/** Se muestra mientras se descarga el código de una página (carga diferida por ruta). */
export function PageFallback() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <Spinner />
    </div>
  );
}
