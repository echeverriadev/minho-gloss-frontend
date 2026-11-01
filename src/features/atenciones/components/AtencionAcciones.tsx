import { Ban, Pencil, Printer } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useIsAdmin } from '@/features/auth';
import { useTextos } from '@/shared/i18n/textos';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { hoyIso } from '@/shared/lib/format';
import { Button } from '@/shared/ui/Button/Button';
import { Dialog } from '@/shared/ui/Dialog/Dialog';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';
import { Select } from '@/shared/ui/Select/Select';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import { toast } from '@/shared/ui/Toast/store';
import { atencionesApi } from '../api';
import { type Atencion, METODOS_PAGO, type MetodoPago } from '../types';

export interface AtencionAccionesProps {
  atencion: Atencion;
  onActualizada: (atencion: Atencion) => void;
}

/** Imprimir, corregir pago o notas y anular (admin). No se imprimen (`print:hidden`). */
export function AtencionAcciones({ atencion, onActualizada }: AtencionAccionesProps) {
  const t = useTextos();
  const isAdmin = useIsAdmin();
  const [abierto, setAbierto] = useState<'corregir' | 'anular' | null>(null);
  const completada = atencion.estado === 'completada';
  const esDeHoy = hoyIso(new Date(atencion.realizadoEn)) === hoyIso();

  const cerrar = (actualizada?: Atencion) => {
    setAbierto(null);
    if (actualizada) {
      onActualizada(actualizada);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 print:hidden">
      <Button variant="secondary" onClick={() => window.print()}>
        <Printer className="size-5" aria-hidden />
        {t.atenciones.imprimir}
      </Button>
      {completada && (isAdmin || esDeHoy) && (
        <Button variant="secondary" onClick={() => setAbierto('corregir')}>
          <Pencil className="size-5" aria-hidden />
          {t.atenciones.corregir}
        </Button>
      )}
      {completada && isAdmin && (
        <Button variant="danger" onClick={() => setAbierto('anular')}>
          <Ban className="size-5" aria-hidden />
          {t.atenciones.anular}
        </Button>
      )}

      <Dialog
        isOpen={abierto === 'corregir'}
        title={t.atenciones.corregir}
        onClose={() => cerrar()}
      >
        <CorregirForm atencion={atencion} onListo={cerrar} />
      </Dialog>
      <Dialog
        isOpen={abierto === 'anular'}
        title={t.atenciones.anularTitulo(atencion.numero)}
        onClose={() => cerrar()}
      >
        <AnularForm atencion={atencion} onListo={cerrar} />
      </Dialog>
    </div>
  );
}

interface FormProps {
  atencion: Atencion;
  onListo: (actualizada?: Atencion) => void;
}

function CorregirForm({ atencion, onListo }: FormProps) {
  const t = useTextos();
  const [metodoPago, setMetodoPago] = useState<MetodoPago>(atencion.metodoPago);
  const [notas, setNotas] = useState(atencion.notas ?? '');
  const [error, setError] = useState<string>();
  const [guardando, setGuardando] = useState(false);

  const guardar = async (event: FormEvent) => {
    event.preventDefault();
    if (notas.trim().length > 300) {
      setError(t.atenciones.v.notasLongitud);
      return;
    }
    setGuardando(true);
    try {
      const actualizada = await atencionesApi.corregir(atencion.id, {
        metodoPago,
        notas: notas.trim(),
      });
      toast.success(t.atenciones.corregida);
      onListo(actualizada);
    } catch (errorApi) {
      setError(mensajeDeError(errorApi));
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={guardar} noValidate className="flex flex-col gap-4">
      {error && <FormAlert tipo="error">{error}</FormAlert>}
      <Select
        label={t.atenciones.metodoPago}
        value={metodoPago}
        onChange={(event) => {
          const elegido = METODOS_PAGO.find((metodo) => metodo === event.target.value);
          if (elegido) {
            setMetodoPago(elegido);
          }
        }}
        options={METODOS_PAGO.map((metodo) => ({
          value: metodo,
          label: t.atenciones.metodos[metodo],
        }))}
      />
      <Textarea
        label={t.atenciones.notas}
        hint={t.atenciones.notasAyuda}
        value={notas}
        onChange={(event) => setNotas(event.target.value)}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={() => onListo()} disabled={guardando}>
          {t.comun.cancelar}
        </Button>
        <Button type="submit" isLoading={guardando}>
          {t.comun.guardar}
        </Button>
      </div>
    </form>
  );
}

function AnularForm({ atencion, onListo }: FormProps) {
  const t = useTextos();
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState<string>();
  const [errorApi, setErrorApi] = useState<string>();
  const [guardando, setGuardando] = useState(false);

  const anular = async (event: FormEvent) => {
    event.preventDefault();
    const limpio = motivo.trim();
    if (limpio.length < 3 || limpio.length > 200) {
      setError(t.atenciones.v.motivoLongitud);
      return;
    }
    setError(undefined);
    setGuardando(true);
    try {
      const anulada = await atencionesApi.anular(atencion.id, limpio);
      toast.success(t.atenciones.anuladaAviso);
      onListo(anulada);
    } catch (fallo) {
      setErrorApi(mensajeDeError(fallo));
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={anular} noValidate className="flex flex-col gap-4">
      <p className="text-slate-700">{t.atenciones.anularTexto}</p>
      {errorApi && <FormAlert tipo="error">{errorApi}</FormAlert>}
      <Textarea
        label={t.atenciones.motivo}
        value={motivo}
        error={error}
        onChange={(event) => setMotivo(event.target.value)}
        rows={2}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={() => onListo()} disabled={guardando}>
          {t.comun.cancelar}
        </Button>
        <Button type="submit" variant="danger" isLoading={guardando}>
          {t.atenciones.anular}
        </Button>
      </div>
    </form>
  );
}
