import { Pencil, Trash2 } from 'lucide-react';
import { formatMoneda } from '@/shared/lib/format';
import { ETIQUETA_TIPO_VEHICULO, TIPOS_VEHICULO } from '@/shared/lib/vehiculos';
import { Badge } from '@/shared/ui/Badge/Badge';
import { Card } from '@/shared/ui/Card/Card';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import type { TipoServicio } from '../types';

export interface TipoServicioCardProps {
  tipo: TipoServicio;
  onEditar?: () => void;
  onDarDeBaja?: () => void;
}

export function TipoServicioCard({ tipo, onEditar, onDarDeBaja }: TipoServicioCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900">
            {tipo.nombre} {!tipo.activo && <Badge tone="danger">Inactivo</Badge>}
          </p>
          {tipo.descripcion && <p className="text-sm text-slate-600">{tipo.descripcion}</p>}
        </div>
        {onEditar && (
          <IconButton
            aria-label={`Editar ${tipo.nombre}`}
            icon={<Pencil className="size-5" aria-hidden />}
            onClick={onEditar}
          />
        )}
        {onDarDeBaja && tipo.activo && (
          <IconButton
            aria-label={`Dar de baja ${tipo.nombre}`}
            icon={<Trash2 className="size-5 text-red-700" aria-hidden />}
            onClick={onDarDeBaja}
          />
        )}
      </div>
      {tipo.modoPrecio === 'unico' ? (
        <p className="text-lg font-semibold text-slate-900">
          {formatMoneda(tipo.precioUnico ?? 0)}
        </p>
      ) : (
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TIPOS_VEHICULO.map((tipoVehiculo) => (
            <div key={tipoVehiculo} className="rounded-lg bg-slate-50 px-3 py-2">
              <dt className="text-xs text-slate-500">{ETIQUETA_TIPO_VEHICULO[tipoVehiculo]}</dt>
              <dd className="font-semibold text-slate-900">
                {formatMoneda(tipo.precios?.[tipoVehiculo] ?? 0)}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </Card>
  );
}
