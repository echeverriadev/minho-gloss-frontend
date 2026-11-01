import { ClipboardList, Plus } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { ListaAtenciones, ResumenDia, useAtencionesPaginadas } from '@/features/atenciones';
import { useIsAdmin } from '@/features/auth';
import { useTextos } from '@/shared/i18n/textos';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { diaAnterior, formatFechaCalendario, hoyIso } from '@/shared/lib/format';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';
import { Card } from '@/shared/ui/Card/Card';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { Input } from '@/shared/ui/Input/Input';
import { PageHeader } from '@/shared/ui/PageHeader/PageHeader';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

const DIA = /^\d{4}-\d{2}-\d{2}$/;

export function ServiciosPage() {
  const t = useTextos();
  const isAdmin = useIsAdmin();
  const [params, setParams] = useSearchParams();
  const hoy = hoyIso();
  // El empleado siempre ve hoy; el admin elige días que quedan en la URL.
  const leer = (clave: string) => {
    const valor = params.get(clave);
    return isAdmin && valor && DIA.test(valor) ? valor : hoy;
  };
  const desde = leer('desde');
  const hasta = leer('hasta') < desde ? desde : leer('hasta');
  const { data, error, isLoading, reload, hayMas, verMas } = useAtencionesPaginadas({
    desde,
    hasta,
  });

  const elegir = (nuevoDesde: string, nuevoHasta: string) =>
    setParams({ desde: nuevoDesde, hasta: nuevoHasta }, { replace: true });
  const unDia = desde === hasta;
  const ayer = diaAnterior(hoy);
  const titulo = unDia
    ? desde === hoy
      ? t.atenciones.hoy
      : formatFechaCalendario(desde)
    : `${formatFechaCalendario(desde)} – ${formatFechaCalendario(hasta)}`;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={t.atenciones.titulo}
        actions={
          <ButtonLink to="/servicios/nuevo" size="sm">
            <Plus className="size-5" aria-hidden />
            <span className="sr-only sm:not-sr-only">{t.atenciones.registrar}</span>
          </ButtonLink>
        }
      />
      {isAdmin && (
        <Card className="flex flex-col gap-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={unDia && desde === hoy ? 'primary' : 'secondary'}
              onClick={() => elegir(hoy, hoy)}
            >
              {t.atenciones.hoy}
            </Button>
            <Button
              size="sm"
              variant={unDia && desde === ayer ? 'primary' : 'secondary'}
              onClick={() => elegir(ayer, ayer)}
            >
              {t.atenciones.ayer}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label={t.atenciones.desde}
              type="date"
              max={hoy}
              value={desde}
              onChange={(event) =>
                event.target.value &&
                elegir(event.target.value, hasta < event.target.value ? event.target.value : hasta)
              }
            />
            <Input
              label={t.atenciones.hasta}
              type="date"
              min={desde}
              max={hoy}
              value={hasta}
              onChange={(event) => event.target.value && elegir(desde, event.target.value)}
            />
          </div>
        </Card>
      )}
      {!data && isLoading && <Skeleton className="h-48 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {data && (
        <>
          <ResumenDia titulo={titulo} resumen={data.resumen} mostrarTotal={isAdmin} />
          {data.items.length === 0 ? (
            <EmptyState
              icon={ClipboardList}
              title={desde === hoy && unDia ? t.atenciones.ninguna : t.atenciones.ningunaRango}
            />
          ) : (
            <ListaAtenciones
              atenciones={data.items}
              conFecha={!unDia}
              hayMas={hayMas}
              cargando={isLoading}
              onVerMas={verMas}
            />
          )}
        </>
      )}
    </div>
  );
}
