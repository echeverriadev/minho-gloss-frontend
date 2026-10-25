import { Droplets } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router';
import { useUsuarioActual } from '@/features/auth';
import { useTextos } from '@/shared/i18n/textos';
import { cn } from '@/shared/lib/cn';
import { NAVEGACION } from './navegacion';

/** Layout con sesión: encabezado, barra inferior en el celular y lateral desde `md` (spec app-shell). */
export function AppLayout() {
  const usuario = useUsuarioActual();
  const t = useTextos();
  const items = NAVEGACION.filter((item) => !item.rol || item.rol === usuario.rol);

  return (
    <div className="min-h-dvh md:flex">
      <aside className="md:bg-surface hidden md:sticky md:top-0 md:flex md:h-dvh md:w-60 md:shrink-0 md:flex-col md:gap-6 md:border-r md:border-slate-200 md:p-4">
        <Link to="/" className="flex items-center gap-2 px-2 text-lg font-bold text-slate-900">
          <Droplets className="text-brand-600 size-7" aria-hidden />
          Minho Gloss
        </Link>
        <nav aria-label={t.nav.principal}>
          <ul className="flex flex-col gap-1">
            {items.map(({ to, etiqueta, icono: Icono }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex min-h-11 items-center gap-3 rounded-lg px-3 font-medium',
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100',
                    )
                  }
                >
                  <Icono className="size-5" aria-hidden />
                  {t.nav[etiqueta]}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-auto truncate px-2 text-sm text-slate-500">{usuario.nombre}</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-surface sticky top-0 z-20 flex h-14 items-center justify-between border-b border-slate-200 px-4 md:hidden">
          <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
            <Droplets className="text-brand-600 size-6" aria-hidden />
            Minho Gloss
          </Link>
          <Link to="/perfil" className="max-w-[50%] truncate text-sm text-slate-600">
            {usuario.nombre}
          </Link>
        </header>

        <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-4 pb-24 md:pt-8 md:pb-10">
          <Outlet />
        </main>
      </div>

      <nav
        aria-label={t.nav.principal}
        className="bg-surface fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="flex">
          {items.map(({ to, etiqueta, icono: Icono }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium',
                    isActive ? 'text-brand-700' : 'text-slate-600',
                  )
                }
              >
                <Icono className="size-6" aria-hidden />
                {t.nav[etiqueta]}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
