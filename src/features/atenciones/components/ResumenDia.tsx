import { useTextos } from '@/shared/i18n/textos';
import { formatMoneda } from '@/shared/lib/format';
import { Card } from '@/shared/ui/Card/Card';
import type { ResumenAtenciones } from '../types';

export interface ResumenDiaProps {
  titulo: string;
  resumen: ResumenAtenciones;
  /** El total cobrado solo lo ve el admin (spec registro-atenciones). */
  mostrarTotal: boolean;
}

export function ResumenDia({ titulo, resumen, mostrarTotal }: ResumenDiaProps) {
  const t = useTextos();
  return (
    <Card className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm text-slate-600">{titulo}</p>
        <p className="text-2xl font-bold text-slate-900">
          {t.atenciones.cantidad(resumen.cantidad)}
        </p>
      </div>
      {mostrarTotal && (
        <div className="text-right">
          <p className="text-sm text-slate-600">{t.atenciones.totalCobrado}</p>
          <p className="text-brand-700 text-2xl font-bold tabular-nums">
            {formatMoneda(resumen.total)}
          </p>
        </div>
      )}
    </Card>
  );
}
