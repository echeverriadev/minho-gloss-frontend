import { ChevronRight, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router';
import { useTextos } from '@/shared/i18n/textos';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';

// TODO(add-post-venta-ui): sumar la configuración de post-venta.
const SECCIONES = [
  {
    to: '/ajustes/tipos-servicio',
    titulo: 'serviciosTitulo',
    descripcion: 'serviciosDescripcion',
    icono: Sparkles,
  },
  {
    to: '/ajustes/usuarios',
    titulo: 'usuariosTitulo',
    descripcion: 'usuariosDescripcion',
    icono: Users,
  },
] as const;

export function AjustesPage() {
  const t = useTextos();
  return (
    <>
      <PageHeader title={t.ajustes.titulo} />
      <ul className="flex flex-col gap-2">
        {SECCIONES.map(({ to, titulo, descripcion, icono: Icono }) => (
          <li key={to}>
            <Link
              to={to}
              className="bg-surface flex min-h-16 items-center gap-3 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <Icono className="text-brand-600 size-6 shrink-0" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900">{t.ajustes[titulo]}</p>
                <p className="text-sm text-slate-600">{t.ajustes[descripcion]}</p>
              </div>
              <ChevronRight className="size-5 text-slate-400" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
