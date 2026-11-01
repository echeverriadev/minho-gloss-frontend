import { Droplets } from 'lucide-react';
import { useTextos } from '@/shared/i18n/textos';
import { formatFechaHora, formatMoneda, formatTelefono } from '@/shared/lib/format';
import { ETIQUETA_TIPO_VEHICULO } from '@/shared/lib/vehiculos';
import { Badge } from '@/shared/ui/Badge/Badge';
import { ajustePrecios, type Atencion } from '../types';

export interface AtencionDetalleProps {
  atencion: Atencion;
}

/**
 * Detalle de lo realizado y lo cobrado en una atención. Es lo único que se imprime de la página:
 * sin fondos de color para que salga bien en cualquier impresora (design de add-atenciones-ui).
 */
export function AtencionDetalle({ atencion }: AtencionDetalleProps) {
  const t = useTextos();
  const { cliente, anulacion } = atencion;
  const subtotalLista = atencion.items.reduce(
    (suma, item) => suma + (item.precioLista ?? item.precio),
    0,
  );
  const ajuste = ajustePrecios(atencion.items);

  return (
    <article className="bg-surface flex flex-col gap-5 rounded-xl p-5 shadow-sm ring-1 ring-slate-200 print:p-0 print:shadow-none print:ring-0">
      <header className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <p className="flex items-center gap-2 text-lg font-bold text-slate-900">
            <Droplets className="text-brand-600 size-6" aria-hidden />
            Minho Gloss
          </p>
          <p className="text-sm text-slate-600">{t.atenciones.detalleDocumento}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-slate-900 tabular-nums">
            {t.atenciones.numero(atencion.numero)}
          </p>
          <p className="text-sm text-slate-600">{formatFechaHora(atencion.realizadoEn)}</p>
        </div>
      </header>

      {anulacion && (
        <div className="flex flex-col gap-1 rounded-lg border border-red-200 p-3">
          <div>
            <Badge tone="danger">{t.atenciones.anulada}</Badge>
          </div>
          <p className="text-sm text-slate-700">
            {t.atenciones.anuladaPor(
              anulacion.anuladoPor.nombre,
              formatFechaHora(anulacion.anuladoEn),
            )}
          </p>
          <p className="text-sm text-slate-900">
            {t.atenciones.motivo}: {anulacion.motivo}
          </p>
        </div>
      )}

      <dl className="grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-slate-500">{t.atenciones.cliente}</dt>
          <dd className="text-slate-900">
            {cliente ? (
              <>
                <span className="font-medium">
                  {cliente.nombre} {cliente.apellido}
                </span>
                {cliente.cedula && <span className="block text-sm">{cliente.cedula}</span>}
                {cliente.telefono && (
                  <span className="block text-sm">{formatTelefono(cliente.telefono)}</span>
                )}
                {cliente.email && <span className="block text-sm">{cliente.email}</span>}
              </>
            ) : (
              t.atenciones.sinCliente
            )}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">{t.atenciones.vehiculo}</dt>
          <dd className="text-slate-900">
            {ETIQUETA_TIPO_VEHICULO[atencion.tipoVehiculo]}
            {atencion.placa && <span className="block text-sm">{atencion.placa}</span>}
          </dd>
        </div>
      </dl>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-200 text-sm text-slate-500">
            <th scope="col" className="py-2 font-medium">
              {t.atenciones.servicios}
            </th>
            <th scope="col" className="py-2 pl-3 text-right font-medium">
              {t.atenciones.precioLista}
            </th>
            <th scope="col" className="py-2 pl-3 text-right font-medium">
              {t.atenciones.cobrado}
            </th>
          </tr>
        </thead>
        <tbody>
          {atencion.items.map((item, indice) => (
            <tr
              // Los ítems no tienen id propio y nunca cambian de orden.
              // oxlint-disable-next-line react/no-array-index-key
              key={indice}
              className="border-b border-slate-100 align-top"
            >
              <td className="py-2 pr-2 text-slate-900">
                {item.nombre}
                {item.categoria !== 'servicio' && (
                  <span className="block text-sm text-slate-500">
                    {item.categoria === 'extra' ? t.atenciones.extras : t.atenciones.personalizado}
                  </span>
                )}
              </td>
              <td className="py-2 pl-3 text-right whitespace-nowrap text-slate-600 tabular-nums">
                {item.precioLista === null ? t.comun.sinDato : formatMoneda(item.precioLista)}
              </td>
              <td className="py-2 pl-3 text-right whitespace-nowrap text-slate-900 tabular-nums">
                {formatMoneda(item.precio)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="ml-auto flex w-full max-w-xs flex-col gap-1 tabular-nums">
        {ajuste !== 0 && (
          <>
            <div className="flex justify-between text-slate-700">
              <dt>{t.atenciones.subtotal}</dt>
              <dd>{formatMoneda(subtotalLista)}</dd>
            </div>
            <div className="flex justify-between text-slate-700">
              <dt>{ajuste > 0 ? t.atenciones.descuentos : t.atenciones.ajustes}</dt>
              <dd>{formatMoneda(-ajuste)}</dd>
            </div>
          </>
        )}
        <div className="flex justify-between border-t border-slate-200 pt-2 text-lg font-bold text-slate-900">
          <dt>{t.atenciones.total}</dt>
          <dd>{formatMoneda(atencion.total)}</dd>
        </div>
      </dl>

      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">{t.atenciones.metodoPago}</dt>
          <dd className="text-slate-900">{t.atenciones.metodos[atencion.metodoPago]}</dd>
        </div>
        <div>
          <dt className="text-slate-500">{t.atenciones.atendidoPor}</dt>
          <dd className="text-slate-900">{atencion.registradoPor.nombre || t.comun.sinDato}</dd>
        </div>
        {atencion.notas && (
          <div className="sm:col-span-2">
            <dt className="text-slate-500">{t.atenciones.notas}</dt>
            <dd className="whitespace-pre-line text-slate-900">{atencion.notas}</dd>
          </div>
        )}
      </dl>

      <p className="border-t border-slate-200 pt-3 text-xs text-slate-500">
        {t.atenciones.noEsFactura}
      </p>
    </article>
  );
}
