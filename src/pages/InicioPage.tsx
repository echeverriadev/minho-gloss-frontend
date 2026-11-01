import { ClipboardList, Plus } from 'lucide-react';
import { Link } from 'react-router';
import { ListaAtenciones, ResumenDia, useAtencionesPaginadas } from '@/features/atenciones';
import { useIsAdmin, useUsuarioActual } from '@/features/auth';
import { useTextos } from '@/shared/i18n/textos';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { hoyIso } from '@/shared/lib/format';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

const ULTIMAS = 5;

export function InicioPage() {
  const usuario = useUsuarioActual();
  const isAdmin = useIsAdmin();
  const t = useTextos();
  const hoy = hoyIso();
  const { data, error, isLoading, reload } = useAtencionesPaginadas({ desde: hoy, hasta: hoy });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-slate-900">
        {t.inicio.saludo(usuario.nombre.split(' ')[0])}
      </h1>
      <ButtonLink to="/servicios/nuevo" fullWidth className="min-h-14 text-lg">
        <Plus className="size-6" aria-hidden />
        {t.atenciones.registrar}
      </ButtonLink>

      {!data && isLoading && <Skeleton className="h-20 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {data && (
        <>
          <ResumenDia titulo={t.inicio.hoy} resumen={data.resumen} mostrarTotal={isAdmin} />
          {data.items.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title={t.atenciones.ninguna}
              description={t.atenciones.ningunaDescripcion}
            />
          ) : (
            <section className="flex flex-col gap-3" aria-labelledby="ultimas-titulo">
              <h2 id="ultimas-titulo" className="text-lg font-semibold text-slate-900">
                {t.inicio.ultimas}
              </h2>
              <ListaAtenciones atenciones={data.items.slice(0, ULTIMAS)} />
              <Link to="/servicios" className="text-brand-700 text-center font-medium underline">
                {t.inicio.verTodos}
              </Link>
            </section>
          )}
        </>
      )}
    </div>
  );
}
