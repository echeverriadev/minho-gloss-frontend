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
import { useTextos } from '@/shared/i18n/textos';

type Accion =
  | { tipo: 'crear'; categoria: CategoriaServicio }
  | { tipo: 'editar' | 'baja'; entrada: TipoServicio }
  | null;

const SECCIONES: {
  categoria: CategoriaServicio;
  titulo: 'servicios' | 'extras';
  agregar: 'agregarServicio' | 'agregarExtra';
}[] = [
  { categoria: 'servicio', titulo: 'servicios', agregar: 'agregarServicio' },
  { categoria: 'extra', titulo: 'extras', agregar: 'agregarExtra' },
];

/** Catálogo de servicios y extras para el admin (spec catalogo-servicios). */
export function TiposServicioGestion() {
  const t = useTextos();
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
    toast.success(t.catalogo.guardado);
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
      toast.success(t.catalogo.dadoDeBaja);
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
        label={t.catalogo.verInactivos}
        checked={incluirInactivos}
        onChange={(event) => setIncluirInactivos(event.target.checked)}
      />
      {isLoading && !data && <Skeleton className="h-40 w-full" />}
      {error && <ErrorState message={mensajeDeError(error)} onRetry={reload} />}
      {vacio && (
        <EmptyState
          icon={Sparkles}
          title={t.catalogo.vacio}
          action={
            <Button onClick={() => setAccion({ tipo: 'crear', categoria: 'servicio' })}>
              {t.catalogo.agregarServicio}
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
                {t.catalogo[titulo]}
              </h2>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setAccion({ tipo: 'crear', categoria })}
              >
                <Plus className="size-4" aria-hidden />
                {t.catalogo[agregar]}
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
          accion?.tipo === 'editar'
            ? t.catalogo.editar(accion.entrada.nombre)
            : t.catalogo.agregarAlCatalogo
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
        title={accion?.tipo === 'baja' ? t.catalogo.darDeBajaTitulo(accion.entrada.nombre) : ''}
        description={t.catalogo.darDeBajaTexto}
        confirmLabel={t.catalogo.darDeBaja}
        isLoading={isEnviando}
        onConfirm={() => void handleBaja()}
        onCancel={cerrar}
      />
    </div>
  );
}
