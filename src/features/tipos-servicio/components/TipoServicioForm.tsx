import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { ApiError, mensajeDeError } from '@/shared/lib/apiClient';
import { ETIQUETA_TIPO_VEHICULO, TIPOS_VEHICULO, type TipoVehiculo } from '@/shared/lib/vehiculos';
import { Button } from '@/shared/ui/Button/Button';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';
import { Input } from '@/shared/ui/Input/Input';
import { MoneyInput } from '@/shared/ui/MoneyInput/MoneyInput';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import type { CategoriaServicio, ModoPrecio, TipoServicio, TipoServicioRequest } from '../types';
import { OpcionesRadio } from './OpcionesRadio';
import { useTextos } from '@/shared/i18n/textos';

interface FormValues {
  nombre: string;
  descripcion: string;
  categoria: CategoriaServicio;
  modoPrecio: ModoPrecio;
  precios: Record<TipoVehiculo, number | null>;
  precioUnico: number | null;
  orden: number;
}

export interface TipoServicioFormProps {
  tipo?: TipoServicio;
  categoriaInicial?: CategoriaServicio;
  onSubmit: (datos: TipoServicioRequest) => Promise<void>;
  onCancel: () => void;
}

function toRequest(valores: FormValues): TipoServicioRequest {
  const base = {
    nombre: valores.nombre.trim(),
    descripcion: valores.descripcion.trim() || undefined,
    categoria: valores.categoria,
    modoPrecio: valores.modoPrecio,
    orden: valores.orden,
  };
  if (valores.modoPrecio === 'unico') {
    return { ...base, precioUnico: valores.precioUnico ?? 0 };
  }
  const { ligeiro, suv, monovolume, carrinha } = valores.precios;
  return {
    ...base,
    precios: {
      ligeiro: ligeiro ?? 0,
      suv: suv ?? 0,
      monovolume: monovolume ?? 0,
      carrinha: carrinha ?? 0,
    },
  };
}

/** Alta y edición de un servicio o extra del catálogo (spec catalogo-servicios). */
export function TipoServicioForm({
  tipo,
  categoriaInicial = 'servicio',
  onSubmit,
  onCancel,
}: TipoServicioFormProps) {
  const t = useTextos();
  const [errorApi, setErrorApi] = useState<string>();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      nombre: tipo?.nombre ?? '',
      descripcion: tipo?.descripcion ?? '',
      categoria: tipo?.categoria ?? categoriaInicial,
      modoPrecio: tipo?.modoPrecio ?? (categoriaInicial === 'extra' ? 'unico' : 'por-vehiculo'),
      precios: {
        ligeiro: tipo?.precios?.ligeiro ?? null,
        suv: tipo?.precios?.suv ?? null,
        monovolume: tipo?.precios?.monovolume ?? null,
        carrinha: tipo?.precios?.carrinha ?? null,
      },
      precioUnico: tipo?.precioUnico ?? null,
      orden: tipo?.orden ?? 0,
    },
  });
  const modoPrecio = useWatch({ control, name: 'modoPrecio' });
  const categoria = useWatch({ control, name: 'categoria' });

  const enviar = async (valores: FormValues) => {
    setErrorApi(undefined);
    try {
      await onSubmit(toRequest(valores));
    } catch (error) {
      if (error instanceof ApiError && error.status === 409) {
        setError('nombre', { message: error.message }, { shouldFocus: true });
      } else {
        setErrorApi(mensajeDeError(error));
      }
    }
  };

  const precioRequerido = (modo: ModoPrecio) => (valor: number | null) =>
    getValues('modoPrecio') !== modo || valor !== null || t.catalogo.v.precioObligatorio;

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-4">
      {errorApi && <FormAlert tipo="error">{errorApi}</FormAlert>}
      <Input
        label={t.catalogo.tituloCampo}
        placeholder="EXPRESS GLOSS"
        error={errors.nombre?.message}
        {...register('nombre', {
          validate: (valor) =>
            (valor.trim().length >= 2 && valor.trim().length <= 60) || t.catalogo.v.tituloLongitud,
        })}
      />
      <Textarea
        label={t.catalogo.descripcion}
        rows={2}
        hint={t.catalogo.descripcionAyuda}
        error={errors.descripcion?.message}
        {...register('descripcion', {
          maxLength: { value: 300, message: t.catalogo.v.descripcionLongitud },
        })}
      />
      <OpcionesRadio
        legend={t.catalogo.categoria}
        opciones={[
          { value: 'servicio', label: t.catalogo.categoriaServicio },
          { value: 'extra', label: t.catalogo.categoriaExtra },
        ]}
        valorActual={categoria}
        registro={register('categoria')}
      />
      <OpcionesRadio
        legend={t.catalogo.precio}
        opciones={[
          { value: 'por-vehiculo', label: t.catalogo.segunVehiculo },
          { value: 'unico', label: t.catalogo.precioUnico },
        ]}
        valorActual={modoPrecio}
        registro={register('modoPrecio')}
      />
      {modoPrecio === 'por-vehiculo' ? (
        <div className="grid grid-cols-2 gap-3">
          {TIPOS_VEHICULO.map((tipoVehiculo) => (
            <Controller
              key={tipoVehiculo}
              control={control}
              name={`precios.${tipoVehiculo}`}
              rules={{ validate: precioRequerido('por-vehiculo') }}
              render={({ field, fieldState }) => (
                <MoneyInput
                  label={ETIQUETA_TIPO_VEHICULO[tipoVehiculo]}
                  name={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                />
              )}
            />
          ))}
        </div>
      ) : (
        <Controller
          control={control}
          name="precioUnico"
          rules={{ validate: precioRequerido('unico') }}
          render={({ field, fieldState }) => (
            <MoneyInput
              label={t.catalogo.precioCualquierVehiculo}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
      )}
      <Input
        label={t.catalogo.orden}
        type="number"
        inputMode="numeric"
        min={0}
        hint={t.catalogo.ordenAyuda}
        error={errors.orden?.message}
        {...register('orden', {
          valueAsNumber: true,
          validate: (valor) =>
            (Number.isInteger(valor) && valor >= 0) || t.catalogo.v.ordenInvalido,
        })}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          {t.comun.cancelar}
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {t.comun.guardar}
        </Button>
      </div>
    </form>
  );
}
