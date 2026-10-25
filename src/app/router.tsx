import { createBrowserRouter } from 'react-router';
import { RedirectIfAuthenticated, RequireAuth, RequireRole } from '@/features/auth';
import { AppLayout } from './layout/AppLayout';
import { PageFallback, RootLayout } from './layout/RootLayout';

// Cada página se descarga recién al abrir su ruta (spec frontend-architecture).
export const router = createBrowserRouter([
  {
    Component: RootLayout,
    HydrateFallback: PageFallback,
    children: [
      {
        Component: RedirectIfAuthenticated,
        children: [
          {
            path: '/login',
            lazy: async () => ({ Component: (await import('@/pages/LoginPage')).LoginPage }),
          },
        ],
      },
      {
        path: '/recuperar-password',
        lazy: async () => ({
          Component: (await import('@/pages/RecuperarPasswordPage')).RecuperarPasswordPage,
        }),
      },
      {
        path: '/restablecer-password',
        lazy: async () => ({
          Component: (await import('@/pages/RestablecerPasswordPage')).RestablecerPasswordPage,
        }),
      },
      {
        Component: RequireAuth,
        children: [
          {
            Component: AppLayout,
            children: [
              {
                index: true,
                lazy: async () => ({ Component: (await import('@/pages/HomePage')).HomePage }),
              },
              {
                path: '/clientes',
                lazy: async () => ({
                  Component: (await import('@/pages/ClientesPage')).ClientesPage,
                }),
              },
              {
                path: '/clientes/nuevo',
                lazy: async () => ({
                  Component: (await import('@/pages/ClienteNuevoPage')).ClienteNuevoPage,
                }),
              },
              {
                path: '/clientes/:id',
                lazy: async () => ({
                  Component: (await import('@/pages/ClienteDetallePage')).ClienteDetallePage,
                }),
              },
              {
                path: '/clientes/:id/editar',
                lazy: async () => ({
                  Component: (await import('@/pages/ClienteEditarPage')).ClienteEditarPage,
                }),
              },
              {
                path: '/perfil',
                lazy: async () => ({ Component: (await import('@/pages/PerfilPage')).PerfilPage }),
              },
              {
                element: <RequireRole rol="admin" />,
                children: [
                  {
                    path: '/ajustes',
                    lazy: async () => ({
                      Component: (await import('@/pages/AjustesPage')).AjustesPage,
                    }),
                  },
                  {
                    path: '/ajustes/usuarios',
                    lazy: async () => ({
                      Component: (await import('@/pages/UsuariosPage')).UsuariosPage,
                    }),
                  },
                ],
              },
              {
                path: '*',
                lazy: async () => ({
                  Component: (await import('@/pages/NotFoundPage')).NotFoundPage,
                }),
              },
            ],
          },
        ],
      },
    ],
  },
]);
