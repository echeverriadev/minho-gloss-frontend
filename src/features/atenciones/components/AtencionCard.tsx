import { Car, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useTextos } from '@/shared/i18n/textos';
import { formatFechaHora, formatHora, formatMoneda } from '@/shared/lib/format';
import { ETIQUETA_TIPO_VEHICULO } from '@/shared/lib/vehiculos';
import { Badge } from '@/shared/ui/Badge/Badge';
import type { Atencion } from '../types';

export interface AtencionCardProps {
  atencion: Atencion;
  /** Muestra la fecha completa en lugar de solo la hora (historial del cliente, rangos de días). */
  conFecha?: boolean;
}

/** Una atención en la lista del día: hora, cliente, vehículo, servicios y total. */
export function AtencionCard({ atencion, conFecha = false }: AtencionCardProps) {
  const t = useTextos();
  const { cliente } = atencion;
  return (
    <Link
      to={`/servicios/${atencion.id}`}
      className="focus-visible:outline-brand-600 bg-surface flex items-center gap-3 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:outline-2"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate font-medium text-slate-900">
            {cliente ? `${cliente.nombre} ${cliente.apellido}` : t.atenciones.sinCliente}
          </p>
          <p className="shrink-0 font-semibold text-slate-900 tabular-nums">
            {formatMoneda(atencion.total)}
          </p>
        </div>
        <p className="mt-1 truncate text-sm text-slate-700">
          {atencion.items.map((item) => item.nombre).join(' · ')}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
          <span className="tabular-nums">
            {t.atenciones.numero(atencion.numero)} ·{' '}
            {conFecha ? formatFechaHora(atencion.realizadoEn) : formatHora(atencion.realizadoEn)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Car className="size-4" aria-hidden />
            {ETIQUETA_TIPO_VEHICULO[atencion.tipoVehiculo]}
            {atencion.placa && ` · ${atencion.placa}`}
          </span>
          <Badge>{t.atenciones.metodos[atencion.metodoPago]}</Badge>
          {atencion.estado === 'anulada' && <Badge tone="danger">{t.atenciones.anulada}</Badge>}
        </div>
      </div>
      <ChevronRight className="size-5 shrink-0 text-slate-400" aria-hidden />
    </Link>
  );
}
