import { Plus, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { Button } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog/ConfirmDialog';
import { Dialog } from '@/shared/ui/Dialog/Dialog';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { toast } from '@/shared/ui/Toast/store';
import { tiposServicioApi } from '../api';
import { useTiposServicio } from '../hooks/useTiposServicio';
import type { CategoriaServicio, TipoServicio, TipoServicioRequest } from '../types';
import { TipoServicioCard } from './TipoServicioCard';
import { TipoServicioForm } from './TipoServicioForm';

type Accion =
  | { tipo: 'crear'; categoria: CategoriaServicio }
  | { tipo: 'editar' | 'baja'; entrada: TipoServicio }
  | null;

const SECCIONES: { categoria: CategoriaServicio; titulo: string; agregar: string }[] = [
  { categoria: 'servicio', titulo: 'Servicios', agregar: 'Agregar servicio' },
  { categoria: 'extra', titulo: 'Extras', agregar: 'Agregar extra' },
];

/** Catálogo de servicios y extras para el admin (spec catalogo-servicios). */
export function TiposServicioGestion() {
  const [incluirInactivos, setIncluirInactivos] = useState(false);
  const [accion, setAccion] = useState<Accion>(null);
  const [isEnviando, setIsEnviando] = useState(false);
  const { data, error, isLoading, reload } = useTiposServicio(incluirInactivos);
  const cerrar = () => setAccion(null);

  const handleGuardar = async (datos: TipoServicioRequest) => {
    if (accion?.tipo === 'editar') {
      await tiposServicioApi.editar(accion.entrada.id, datos);
    } else {
      await tiposServicioApi.crear(datos);
    }
    toast.success('Servicio guardado');
    cerrar();
    reload();
  };

  const handleBaja = async () => {
    if (accion?.tipo !== 'baja') {
      return;
    }
    setIsEnviando(true);
    try {
      await tiposServicioApi.darDeBaja(accion.entrada.id);
      toast.success('Servicio dado de baja');
      cerrar();
      reload();
    } catch (error_) {
      toast.error(mensajeDeError(error_));
    } finally {
      setIsEnviando(false);
    }
  };

  const vacio = data?.length === 0;

  return (
    <div className="flex flex-col gap-6">
      <Checkbox
        label="Ver también los dados de baja"
        checked={incluirInactivos}
        onChange={(event) => setIncluirInactivos(event.target.checked)}
      />
      {isLoading && !data && <Skeleton className="h-40 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {vacio && (
        <EmptyState
          icon={Sparkles}
          title="Agrega tu primer servicio para poder registrar trabajos"
          action={
            <Button onClick={() => setAccion({ tipo: 'crear', categoria: 'servicio' })}>
              Agregar servicio
            </Button>
          }
        />
      )}
      {data &&
        !vacio &&
        SECCIONES.map(({ categoria, titulo, agregar }) => (
          <section
            key={categoria}
            aria-labelledby={`seccion-${categoria}`}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 id={`seccion-${categoria}`} className="text-lg font-semibold text-slate-900">
                {titulo}
              </h2>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setAccion({ tipo: 'crear', categoria })}
              >
                <Plus className="size-4" aria-hidden />
                {agregar}
              </Button>
            </div>
            <ul className="flex flex-col gap-2">
              {data
                .filter((entrada) => entrada.categoria === categoria)
                .map((entrada) => (
                  <li key={entrada.id}>
                    <TipoServicioCard
                      tipo={entrada}
                      onEditar={() => setAccion({ tipo: 'editar', entrada })}
                      onDarDeBaja={() => setAccion({ tipo: 'baja', entrada })}
                    />
                  </li>
                ))}
            </ul>
          </section>
        ))}

      <Dialog
        isOpen={accion?.tipo === 'crear' || accion?.tipo === 'editar'}
        title={
          accion?.tipo === 'editar' ? `Editar ${accion.entrada.nombre}` : 'Agregar al catálogo'
        }
        onClose={cerrar}
      >
        <TipoServicioForm
          tipo={accion?.tipo === 'editar' ? accion.entrada : undefined}
          categoriaInicial={accion?.tipo === 'crear' ? accion.categoria : undefined}
          onSubmit={handleGuardar}
          onCancel={cerrar}
        />
      </Dialog>
      <ConfirmDialog
        isOpen={accion?.tipo === 'baja'}
        title={accion?.tipo === 'baja' ? `¿Dar de baja ${accion.entrada.nombre}?` : ''}
        description="Dejará de ofrecerse al registrar servicios. El historial y las métricas pasadas no cambian."
        confirmLabel="Dar de baja"
        isLoading={isEnviando}
        onConfirm={() => void handleBaja()}
        onCancel={cerrar}
      />
    </div>
  );
}
