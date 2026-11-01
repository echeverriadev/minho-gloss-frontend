import { Check, Plus, Trash2 } from 'lucide-react';
import { type FormEvent, useReducer, useState } from 'react';
import { useIsAdmin } from '@/features/auth';
import {
  calcularPrecioLista,
  type TipoServicio,
  useTiposServicio,
} from '@/features/tipos-servicio';
import { useTextos } from '@/shared/i18n/textos';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { cn } from '@/shared/lib/cn';
import { aFechaHoraLocal, deFechaHoraLocal, formatMoneda } from '@/shared/lib/format';
import { ETIQUETA_TIPO_VEHICULO, TIPOS_VEHICULO, type TipoVehiculo } from '@/shared/lib/vehiculos';
import { Button } from '@/shared/ui/Button/Button';
import { Card } from '@/shared/ui/Card/Card';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';
import { IconButton } from '@/shared/ui/IconButton/IconButton';
import { Input } from '@/shared/ui/Input/Input';
import { MoneyInput } from '@/shared/ui/MoneyInput/MoneyInput';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import { atencionesApi } from '../api';
import { leerMetodoPago, recordarMetodoPago } from '../metodoPagoRecordado';
import {
  type Atencion,
  type ItemAtencionRequest,
  METODOS_PAGO,
  type MetodoPago,
  normalizarPlaca,
} from '../types';
import { type ClienteElegido, SelectorCliente } from './SelectorCliente';

/** Servicio elegido: del catálogo (precio `null` = el de lista) o personalizado por el admin. */
interface Linea {
  clave: string;
  tipoServicioId: string | null;
  nombre: string;
  precio: number | null;
}

interface Estado {
  cliente: ClienteElegido | null;
  tipoVehiculo: TipoVehiculo;
  placa: string;
  lineas: Linea[];
  metodoPago: MetodoPago;
  notas: string;
  /** Valor de `datetime-local`; vacío = ahora. Solo lo cambia el admin. */
  realizadoEn: string;
}

type Accion =
  | { tipo: 'cliente'; cliente: ClienteElegido | null }
  | { tipo: 'vehiculo'; tipoVehiculo: TipoVehiculo }
  | { tipo: 'placa'; placa: string }
  | { tipo: 'alternar'; servicio: TipoServicio }
  | { tipo: 'precio'; clave: string; precio: number | null }
  | { tipo: 'personalizado'; clave: string; nombre: string; precio: number }
  | { tipo: 'quitar'; clave: string }
  | { tipo: 'pago'; metodoPago: MetodoPago }
  | { tipo: 'notas'; notas: string }
  | { tipo: 'fecha'; realizadoEn: string };

let siguienteClave = 0;

/** Clave única de un servicio personalizado (se genera fuera del reducer, que debe ser puro). */
function nuevaClave(): string {
  siguienteClave += 1;
  return `personalizado-${siguienteClave}`;
}

function reducer(estado: Estado, accion: Accion): Estado {
  switch (accion.tipo) {
    case 'cliente':
      return { ...estado, cliente: accion.cliente };
    case 'vehiculo':
      return { ...estado, tipoVehiculo: accion.tipoVehiculo };
    case 'placa':
      return { ...estado, placa: accion.placa };
    case 'alternar': {
      const { servicio } = accion;
      const elegida = estado.lineas.some((linea) => linea.tipoServicioId === servicio.id);
      return {
        ...estado,
        lineas: elegida
          ? estado.lineas.filter((linea) => linea.tipoServicioId !== servicio.id)
          : [
              ...estado.lineas,
              {
                clave: servicio.id,
                tipoServicioId: servicio.id,
                nombre: servicio.nombre,
                precio: null,
              },
            ],
      };
    }
    case 'precio':
      return {
        ...estado,
        lineas: estado.lineas.map((linea) =>
          linea.clave === accion.clave ? { ...linea, precio: accion.precio } : linea,
        ),
      };
    case 'personalizado':
      return {
        ...estado,
        lineas: [
          ...estado.lineas,
          {
            clave: accion.clave,
            tipoServicioId: null,
            nombre: accion.nombre,
            precio: accion.precio,
          },
        ],
      };
    case 'quitar':
      return { ...estado, lineas: estado.lineas.filter((linea) => linea.clave !== accion.clave) };
    case 'pago':
      return { ...estado, metodoPago: accion.metodoPago };
    case 'notas':
      return { ...estado, notas: accion.notas };
    case 'fecha':
    default:
      return { ...estado, realizadoEn: accion.realizadoEn };
  }
}

export interface RegistroAtencionFormProps {
  clienteInicial?: ClienteElegido | null;
  onRegistrada: (atencion: Atencion) => void | Promise<void>;
  onCancel: () => void;
}

const PLACA_VALIDA = /^[A-Z0-9]{2,12}$/;
const MAX_NOTAS = 300;

/** Registro de una atención en una sola pantalla, con el total siempre a la vista. */
export function RegistroAtencionForm({
  clienteInicial = null,
  onRegistrada,
  onCancel,
}: RegistroAtencionFormProps) {
  const t = useTextos();
  const isAdmin = useIsAdmin();
  const catalogo = useTiposServicio();
  const [estado, dispatch] = useReducer(reducer, undefined, () => ({
    cliente: clienteInicial,
    tipoVehiculo: 'ligeiro' as const,
    placa: '',
    lineas: [],
    metodoPago: leerMetodoPago(),
    notas: '',
    realizadoEn: '',
  }));
  const [errores, setErrores] = useState<{ form?: string; placa?: string; notas?: string }>({});
  const [guardando, setGuardando] = useState(false);
  const [ahoraLocal] = useState(() => aFechaHoraLocal(new Date().toISOString()));

  const tipos = new Map((catalogo.data ?? []).map((tipo) => [tipo.id, tipo]));
  const precioLista = (linea: Linea) => {
    const tipo = linea.tipoServicioId ? tipos.get(linea.tipoServicioId) : undefined;
    return tipo ? calcularPrecioLista(tipo, estado.tipoVehiculo) : null;
  };
  const precioCobrado = (linea: Linea) => linea.precio ?? precioLista(linea) ?? 0;
  const total = estado.lineas.reduce((suma, linea) => suma + precioCobrado(linea), 0);

  const guardar = async (event: FormEvent) => {
    event.preventDefault();
    const placa = normalizarPlaca(estado.placa);
    const nuevosErrores = {
      form: estado.lineas.length === 0 ? t.atenciones.elegirServicio : undefined,
      placa: placa && !PLACA_VALIDA.test(placa) ? t.atenciones.v.placaInvalida : undefined,
      notas: estado.notas.trim().length > MAX_NOTAS ? t.atenciones.v.notasLongitud : undefined,
    };
    setErrores(nuevosErrores);
    if (nuevosErrores.form || nuevosErrores.placa || nuevosErrores.notas) {
      return;
    }
    const items: ItemAtencionRequest[] = estado.lineas.map((linea) =>
      linea.tipoServicioId
        ? {
            tipoServicioId: linea.tipoServicioId,
            precio: isAdmin ? precioCobrado(linea) : undefined,
          }
        : { nombre: linea.nombre, precio: linea.precio ?? 0 },
    );
    setGuardando(true);
    try {
      const atencion = await atencionesApi.registrar({
        clienteId: estado.cliente?.id,
        tipoVehiculo: estado.tipoVehiculo,
        placa: placa || undefined,
        items,
        metodoPago: estado.metodoPago,
        notas: estado.notas.trim() || undefined,
        realizadoEn:
          isAdmin && estado.realizadoEn ? deFechaHoraLocal(estado.realizadoEn) : undefined,
      });
      recordarMetodoPago(estado.metodoPago);
      await onRegistrada(atencion);
    } catch (error) {
      // Se conserva todo lo elegido para reintentar (spec registro-atenciones).
      setErrores({ form: mensajeDeError(error) });
      setGuardando(false);
    }
  };

  const secciones = [
    { categoria: 'servicio', titulo: t.atenciones.servicios },
    { categoria: 'extra', titulo: t.atenciones.extras },
  ] as const;

  return (
    <form onSubmit={guardar} noValidate className="flex flex-col gap-4">
      <Card className="flex flex-col gap-3">
        <h2 className="font-semibold text-slate-900">{t.atenciones.cliente}</h2>
        <SelectorCliente
          cliente={estado.cliente}
          onChange={(cliente) => dispatch({ tipo: 'cliente', cliente })}
        />
      </Card>

      <Card className="flex flex-col gap-3">
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 font-semibold text-slate-900">{t.atenciones.vehiculo}</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TIPOS_VEHICULO.map((tipo) => (
              <label
                key={tipo}
                className={cn(
                  'has-focus-visible:outline-brand-600 flex min-h-12 cursor-pointer items-center justify-center rounded-lg px-3 font-medium ring-1 has-focus-visible:outline-2',
                  estado.tipoVehiculo === tipo
                    ? 'bg-brand-50 text-brand-700 ring-brand-600 ring-2'
                    : 'bg-surface text-slate-700 ring-slate-300',
                )}
              >
                <input
                  type="radio"
                  name="tipoVehiculo"
                  value={tipo}
                  checked={estado.tipoVehiculo === tipo}
                  onChange={() => dispatch({ tipo: 'vehiculo', tipoVehiculo: tipo })}
                  className="sr-only"
                />
                {ETIQUETA_TIPO_VEHICULO[tipo]}
              </label>
            ))}
          </div>
        </fieldset>
        <Input
          label={t.atenciones.placa}
          hint={t.atenciones.placaAyuda}
          value={estado.placa}
          onChange={(event) => dispatch({ tipo: 'placa', placa: event.target.value.toUpperCase() })}
          error={errores.placa}
          autoComplete="off"
          autoCapitalize="characters"
          placeholder="AA-12-BB"
        />
      </Card>

      {catalogo.isLoading && <Skeleton className="h-48 w-full" />}
      {catalogo.error && (
        <ErrorState message={mensajeDeError(catalogo.error)} onRetry={catalogo.reload} />
      )}
      {catalogo.data && (
        <Card className="flex flex-col gap-4">
          {catalogo.data.length === 0 && (
            <p className="text-slate-600">{t.atenciones.catalogoVacio}</p>
          )}
          {secciones.map(({ categoria, titulo }) => {
            const opciones = catalogo.data?.filter((tipo) => tipo.categoria === categoria) ?? [];
            if (opciones.length === 0) {
              return null;
            }
            return (
              <fieldset key={categoria} className="flex flex-col gap-2">
                <legend className="mb-2 font-semibold text-slate-900">{titulo}</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {opciones.map((tipo) => {
                    const elegido = estado.lineas.some((linea) => linea.tipoServicioId === tipo.id);
                    return (
                      <button
                        key={tipo.id}
                        type="button"
                        aria-pressed={elegido}
                        onClick={() => dispatch({ tipo: 'alternar', servicio: tipo })}
                        className={cn(
                          'focus-visible:outline-brand-600 flex min-h-14 items-center gap-3 rounded-lg px-3 py-2 text-left ring-1 focus-visible:outline-2',
                          elegido
                            ? 'bg-brand-50 ring-brand-600 ring-2'
                            : 'bg-surface ring-slate-300 hover:bg-slate-50',
                        )}
                      >
                        <span
                          className={cn(
                            'flex size-6 shrink-0 items-center justify-center rounded-md ring-1',
                            elegido ? 'bg-brand-600 ring-brand-600 text-white' : 'ring-slate-400',
                          )}
                          aria-hidden
                        >
                          {elegido && <Check className="size-4" />}
                        </span>
                        <span className="min-w-0 flex-1 font-medium text-slate-900">
                          {tipo.nombre}
                        </span>
                        <span className="shrink-0 text-slate-700 tabular-nums">
                          {formatMoneda(calcularPrecioLista(tipo, estado.tipoVehiculo))}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </Card>
      )}

      {isAdmin && (
        <Card className="flex flex-col gap-4">
          {estado.lineas.length > 0 && (
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-slate-900">{t.atenciones.elegidos}</h2>
              {estado.lineas.map((linea) => (
                <LineaEditable
                  key={`${linea.clave}-${estado.tipoVehiculo}`}
                  linea={linea}
                  precioLista={precioLista(linea)}
                  onPrecio={(precio) => dispatch({ tipo: 'precio', clave: linea.clave, precio })}
                  onQuitar={() => dispatch({ tipo: 'quitar', clave: linea.clave })}
                />
              ))}
            </div>
          )}
          <NuevoPersonalizado
            onAgregar={(nombre, precio) =>
              dispatch({ tipo: 'personalizado', clave: nuevaClave(), nombre, precio })
            }
          />
        </Card>
      )}

      <Card className="flex flex-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 font-semibold text-slate-900">{t.atenciones.metodoPago}</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {METODOS_PAGO.map((metodo) => (
              <label
                key={metodo}
                className={cn(
                  'has-focus-visible:outline-brand-600 flex min-h-11 cursor-pointer items-center justify-center rounded-lg px-3 text-sm font-medium ring-1 has-focus-visible:outline-2',
                  estado.metodoPago === metodo
                    ? 'bg-brand-50 text-brand-700 ring-brand-600 ring-2'
                    : 'bg-surface text-slate-700 ring-slate-300',
                )}
              >
                <input
                  type="radio"
                  name="metodoPago"
                  value={metodo}
                  checked={estado.metodoPago === metodo}
                  onChange={() => dispatch({ tipo: 'pago', metodoPago: metodo })}
                  className="sr-only"
                />
                {t.atenciones.metodos[metodo]}
              </label>
            ))}
          </div>
        </fieldset>
        <Textarea
          label={t.atenciones.notas}
          hint={t.atenciones.notasAyuda}
          value={estado.notas}
          error={errores.notas}
          onChange={(event) => dispatch({ tipo: 'notas', notas: event.target.value })}
          rows={2}
        />
        {isAdmin && (
          <Input
            label={t.atenciones.fechaHora}
            hint={t.atenciones.fechaHoraAyuda}
            type="datetime-local"
            max={ahoraLocal}
            value={estado.realizadoEn}
            onChange={(event) => dispatch({ tipo: 'fecha', realizadoEn: event.target.value })}
          />
        )}
      </Card>

      {errores.form && <FormAlert tipo="error">{errores.form}</FormAlert>}

      <div className="bg-surface sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-10 flex items-center gap-3 rounded-xl p-3 shadow-lg ring-1 ring-slate-200 md:bottom-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-600">{t.atenciones.total}</p>
          <p className="text-2xl font-bold text-slate-900 tabular-nums">{formatMoneda(total)}</p>
        </div>
        <Button variant="secondary" onClick={onCancel} disabled={guardando}>
          {t.comun.cancelar}
        </Button>
        <Button type="submit" isLoading={guardando}>
          {t.comun.guardar}
        </Button>
      </div>
    </form>
  );
}

interface LineaEditableProps {
  linea: Linea;
  precioLista: number | null;
  onPrecio: (precio: number | null) => void;
  onQuitar: () => void;
}

/** Precio editable de un servicio elegido, con el descuento o recargo respecto del de lista. */
function LineaEditable({ linea, precioLista, onPrecio, onQuitar }: LineaEditableProps) {
  const t = useTextos();
  const precio = linea.precio ?? precioLista;
  const diferencia = precioLista !== null && precio !== null ? precioLista - precio : 0;
  return (
    <div className="flex items-end gap-2">
      <div className="min-w-0 flex-1">
        <MoneyInput
          label={t.atenciones.precioDe(linea.nombre)}
          value={precio}
          onChange={(valor) => onPrecio(valor)}
          hint={
            linea.tipoServicioId === null
              ? t.atenciones.personalizado
              : diferencia > 0
                ? t.atenciones.descuento(formatMoneda(diferencia))
                : diferencia < 0
                  ? t.atenciones.recargo(formatMoneda(-diferencia))
                  : undefined
          }
        />
      </div>
      <IconButton
        aria-label={t.atenciones.quitar(linea.nombre)}
        icon={<Trash2 className="size-5" aria-hidden />}
        variant="ghost"
        onClick={onQuitar}
      />
    </div>
  );
}

/** Formulario corto para agregar un servicio fuera del catálogo (solo admin). */
function NuevoPersonalizado({
  onAgregar,
}: {
  onAgregar: (nombre: string, precio: number) => void;
}) {
  const t = useTextos();
  const [abierto, setAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState<number | null>(null);
  const [errores, setErrores] = useState<{ nombre?: string; precio?: string }>({});

  if (!abierto) {
    return (
      <Button variant="secondary" onClick={() => setAbierto(true)}>
        <Plus className="size-5" aria-hidden />
        {t.atenciones.agregarPersonalizado}
      </Button>
    );
  }

  const agregar = () => {
    const limpio = nombre.trim();
    const nuevos = {
      nombre: limpio.length < 2 || limpio.length > 60 ? t.atenciones.v.nombreLongitud : undefined,
      precio: precio === null ? t.atenciones.v.precioObligatorio : undefined,
    };
    setErrores(nuevos);
    if (nuevos.nombre || nuevos.precio || precio === null) {
      return;
    }
    onAgregar(limpio, precio);
    setNombre('');
    setPrecio(null);
    setAbierto(false);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg p-3 ring-1 ring-slate-200">
      <p className="text-sm text-slate-600">{t.atenciones.personalizadoAyuda}</p>
      <Input
        label={t.atenciones.nombreServicio}
        value={nombre}
        onChange={(event) => setNombre(event.target.value)}
        error={errores.nombre}
        autoComplete="off"
      />
      <MoneyInput
        label={t.atenciones.precio}
        value={precio}
        onChange={setPrecio}
        error={errores.precio}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => setAbierto(false)}>
          {t.comun.cancelar}
        </Button>
        <Button onClick={agregar}>{t.atenciones.agregar}</Button>
      </div>
    </div>
  );
}
