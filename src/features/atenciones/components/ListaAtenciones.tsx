import { useTextos } from '@/shared/i18n/textos';
import { Button } from '@/shared/ui/Button/Button';
import type { Atencion } from '../types';
import { AtencionCard } from './AtencionCard';

export interface ListaAtencionesProps {
  atenciones: Atencion[];
  conFecha?: boolean;
  hayMas?: boolean;
  cargando?: boolean;
  onVerMas?: () => void;
}

export function ListaAtenciones({
  atenciones,
  conFecha = false,
  hayMas = false,
  cargando = false,
  onVerMas,
}: ListaAtencionesProps) {
  const t = useTextos();
  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        {atenciones.map((atencion) => (
          <li key={atencion.id}>
            <AtencionCard atencion={atencion} conFecha={conFecha} />
          </li>
        ))}
      </ul>
      {hayMas && onVerMas && (
        <Button variant="secondary" onClick={onVerMas} isLoading={cargando}>
          {t.comun.verMas}
        </Button>
      )}
    </div>
  );
}
