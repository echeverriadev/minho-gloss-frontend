import { ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

// TODO(add-catalogo-servicios-ui, add-post-venta-ui): sumar tipos de servicio y post-venta.
const SECCIONES = [
  {
    to: '/ajustes/usuarios',
    titulo: 'Usuarios',
    descripcion: 'Crea las cuentas de tu equipo, cambia roles y restablece contraseñas',
    icono: Users,
  },
];

export function AjustesPage() {
  return (
    <>
      <PageHeader title="Ajustes" />
      <ul className="flex flex-col gap-2">
        {SECCIONES.map(({ to, titulo, descripcion, icono: Icono }) => (
          <li key={to}>
            <Link
              to={to}
              className="flex min-h-16 items-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <Icono className="text-brand-600 size-6 shrink-0" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">{titulo}</p>
                <p className="text-sm text-slate-600">{descripcion}</p>
              </div>
              <ChevronRight className="size-5 text-slate-400" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
