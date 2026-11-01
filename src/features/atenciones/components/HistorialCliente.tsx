import { History } from 'lucide-react';
import { useTextos } from '@/shared/i18n/textos';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useAtencionesPaginadas } from '../hooks/useAtencionesPaginadas';
import { ListaAtenciones } from './ListaAtenciones';

/** Atenciones de un cliente, de la más reciente a la más antigua (ficha del cliente). */
export function HistorialCliente({ clienteId }: { clienteId: string }) {
  const t = useTextos();
  const { data, error, isLoading, reload, hayMas, verMas } = useAtencionesPaginadas({ clienteId });

  return (
    <section className="flex flex-col gap-3" aria-labelledby="historial-titulo">
      <h2 id="historial-titulo" className="text-lg font-semibold text-slate-900">
        {t.atenciones.historial}
      </h2>
      {!data && isLoading && <Skeleton className="h-24 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {data && data.items.length === 0 && (
        <EmptyState icon={History} title={t.atenciones.sinHistorial} />
      )}
      {data && data.items.length > 0 && (
        <ListaAtenciones
          atenciones={data.items}
          conFecha
          hayMas={hayMas}
          cargando={isLoading}
          onVerMas={verMas}
        />
      )}
    </section>
  );
}
