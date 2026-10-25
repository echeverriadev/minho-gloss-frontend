import { useState } from 'react';
import { useParams } from 'react-router';
import {
  type Atencion,
  AtencionAcciones,
  AtencionDetalle,
  atencionesApi,
} from '@/features/atenciones';
import { useAsync } from '@/shared/hooks/useAsync';
import { useTextos } from '@/shared/i18n/textos';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export function AtencionDetallePage() {
  const { id = '' } = useParams();
  const t = useTextos();
  const { data, error, isLoading, reload } = useAsync(() => atencionesApi.obtener(id), [id]);
  // Tras corregir o anular se muestra la respuesta de la API sin volver a pedirla.
  const [actualizada, setActualizada] = useState<Atencion>();
  const atencion = actualizada?.id === id ? actualizada : data;

  return (
    <>
      <div className="print:hidden">
        <PageHeader
          title={atencion ? t.atenciones.detalleTitulo(atencion.numero) : t.atenciones.titulo}
          backTo="/servicios"
          backLabel={t.atenciones.volverALista}
        />
      </div>
      {isLoading && !atencion && <Skeleton className="h-96 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {atencion && (
        <div className="flex flex-col gap-4">
          <AtencionAcciones atencion={atencion} onActualizada={setActualizada} />
          <AtencionDetalle atencion={atencion} />
        </div>
      )}
    </>
  );
}
