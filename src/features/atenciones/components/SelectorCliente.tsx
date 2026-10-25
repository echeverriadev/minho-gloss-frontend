import { UserPlus, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { type Cliente, ClienteForm, type ClienteRequest, clientesApi } from '@/features/clientes';
import { useAsync } from '@/shared/hooks/useAsync';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { useTextos } from '@/shared/i18n/textos';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { formatTelefono } from '@/shared/lib/format';
import { Button } from '@/shared/ui/Button/Button';
import { Dialog } from '@/shared/ui/Dialog/Dialog';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

export type ClienteElegido = Pick<Cliente, 'id' | 'nombre' | 'apellido' | 'telefono'>;

export interface SelectorClienteProps {
  cliente: ClienteElegido | null;
  onChange: (cliente: ClienteElegido | null) => void;
}

const MIN_CARACTERES_BUSQUEDA = 2;
const MAX_RESULTADOS = 5;

/** Cliente opcional de la atención: sin cliente, uno existente o uno nuevo creado en un diálogo. */
export function SelectorCliente({ cliente, onChange }: SelectorClienteProps) {
  const t = useTextos();
  const [q, setQ] = useState('');
  const [creando, setCreando] = useState(false);
  const busqueda = useDebouncedValue(q.trim());
  const buscar = busqueda.length >= MIN_CARACTERES_BUSQUEDA && !cliente;
  const resultados = useAsync(
    () => (buscar ? clientesApi.listar(busqueda, 1) : Promise.resolve(null)),
    [buscar, busqueda],
  );

  const elegir = (elegido: ClienteElegido) => {
    onChange(elegido);
    setQ('');
  };

  const crear = async (datos: ClienteRequest) => {
    const creado = await clientesApi.crear(datos);
    setCreando(false);
    elegir(creado);
  };

  if (cliente) {
    return (
      <div className="bg-brand-50 flex items-center gap-3 rounded-lg p-3">
        <UserRound className="text-brand-700 size-6 shrink-0" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-slate-900">
            {cliente.nombre} {cliente.apellido}
          </p>
          {cliente.telefono && (
            <p className="text-sm text-slate-600">{formatTelefono(cliente.telefono)}</p>
          )}
        </div>
        <IconButton
          aria-label={t.atenciones.quitarCliente}
          icon={<X className="size-5" aria-hidden />}
          variant="ghost"
          onClick={() => onChange(null)}
        />
      </div>
    );
  }

  const items = resultados.data?.items.slice(0, MAX_RESULTADOS) ?? [];

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-slate-600">{t.atenciones.clienteAyuda}</p>
      <div className="flex gap-2">
        <div className="flex-1">
          <SearchInput
            label={t.atenciones.buscarCliente}
            placeholder={t.atenciones.buscarClientePlaceholder}
            value={q}
            onChange={setQ}
          />
        </div>
        <Button variant="secondary" onClick={() => setCreando(true)}>
          <UserPlus className="size-5" aria-hidden />
          <span className="sr-only sm:not-sr-only">{t.atenciones.clienteNuevo}</span>
        </Button>
      </div>
      {buscar && resultados.isLoading && (
        <div className="flex justify-center py-2">
          <Spinner />
        </div>
      )}
      {buscar && resultados.error && (
        <p className="text-sm text-red-700">{mensajeDeError(resultados.error)}</p>
      )}
      {buscar && !resultados.isLoading && resultados.data && items.length === 0 && (
        <p className="text-sm text-slate-600">{t.atenciones.sinResultados(busqueda)}</p>
      )}
      {items.length > 0 && !resultados.isLoading && (
        <ul className="flex flex-col divide-y divide-slate-200 rounded-lg ring-1 ring-slate-200">
          {items.map((encontrado) => (
            <li key={encontrado.id}>
              <button
                type="button"
                onClick={() => elegir(encontrado)}
                aria-label={t.atenciones.elegir(`${encontrado.nombre} ${encontrado.apellido}`)}
                className="flex min-h-12 w-full flex-col items-start px-3 py-2 text-left hover:bg-slate-50"
              >
                <span className="font-medium text-slate-900">
                  {encontrado.nombre} {encontrado.apellido}
                </span>
                <span className="text-sm text-slate-600">
                  {[encontrado.telefono && formatTelefono(encontrado.telefono), encontrado.cedula]
                    .filter(Boolean)
                    .join(' · ')}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {/*
        El registro es un <form>: el alta del cliente se dibuja fuera de él (portal) y su envío no
        sube por el árbol de React, para no registrar la atención al guardar el cliente.
      */}
      {createPortal(
        <div onSubmit={(event) => event.stopPropagation()}>
          <Dialog
            isOpen={creando}
            title={t.atenciones.clienteNuevo}
            onClose={() => setCreando(false)}
          >
            <ClienteForm onSubmit={crear} onCancel={() => setCreando(false)} />
          </Dialog>
        </div>,
        document.body,
      )}
    </div>
  );
}
