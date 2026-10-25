import { useState } from 'react';
import { type Path, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { ApiError, mensajeDeError } from '@/shared/lib/apiClient';
import { hoyIso } from '@/shared/lib/format';
import { EMAIL_PATTERN } from '@/shared/lib/validacion';
import { Button } from '@/shared/ui/Button/Button';
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';
import { Input } from '@/shared/ui/Input/Input';
import { Textarea } from '@/shared/ui/Textarea/Textarea';
import type { Cliente, ClienteRequest } from '../types';
import {
  FECHA_MINIMA_NACIMIENTO,
  longitud,
  validarCedula,
  validarFechaNacimiento,
  validarTelefono,
} from '../validaciones';
import { useTextos } from '@/shared/i18n/textos';

export interface ClienteFormProps {
  cliente?: Cliente;
  onSubmit: (datos: ClienteRequest) => Promise<void>;
  onCancel: () => void;
}

type CampoConflicto = 'telefono' | 'cedula';

/** Alta y edición de un cliente con las reglas de `domain-model`. */
export function ClienteForm({ cliente, onSubmit, onCancel }: ClienteFormProps) {
  const t = useTextos();
  const [errorApi, setErrorApi] = useState<string>();
  const [conflictos, setConflictos] = useState<Partial<Record<CampoConflicto, string>>>({});
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ClienteRequest>({
    defaultValues: {
      nombre: cliente?.nombre ?? '',
      apellido: cliente?.apellido ?? '',
      cedula: cliente?.cedula ?? '',
      telefono: cliente?.telefono ?? '',
      email: cliente?.email ?? '',
      direccion: cliente?.direccion ?? '',
      fechaNacimiento: cliente?.fechaNacimiento ?? '',
      aceptaContacto: cliente?.aceptaContacto ?? false,
      notas: cliente?.notas ?? '',
    },
  });

  const enviar = async (datos: ClienteRequest) => {
    setErrorApi(undefined);
    setConflictos({});
    try {
      await onSubmit({ ...datos, notas: datos.notas?.trim() || undefined });
    } catch (error) {
      const campo = error instanceof ApiError ? error.detalle.campo : undefined;
      if (error instanceof ApiError && (campo === 'telefono' || campo === 'cedula')) {
        setConflictos({ [campo]: error.detalle.clienteId });
        setError(
          campo satisfies Path<ClienteRequest>,
          { message: error.message },
          { shouldFocus: true },
        );
      } else {
        setErrorApi(mensajeDeError(error));
      }
    }
  };

  const verCliente = (campo: CampoConflicto) =>
    conflictos[campo] && (
      <Link
        to={`/clientes/${conflictos[campo]}`}
        className="text-brand-700 text-sm font-medium underline"
      >
        {t.clientes.verCliente}
      </Link>
    );

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-4">
      {errorApi && <FormAlert tipo="error">{errorApi}</FormAlert>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label={t.clientes.nombre}
          autoComplete="given-name"
          error={errors.nombre?.message}
          {...register('nombre', {
            required: t.clientes.v.nombreObligatorio,
            validate: longitud(2, 60, t.clientes.v.nombreLongitud),
          })}
        />
        <Input
          label={t.clientes.apellido}
          autoComplete="family-name"
          error={errors.apellido?.message}
          {...register('apellido', {
            required: t.clientes.v.apellidoObligatorio,
            validate: longitud(2, 60, t.clientes.v.apellidoLongitud),
          })}
        />
      </div>
      <Input
        label={t.clientes.cedula}
        hint={t.clientes.cedulaAyuda}
        autoComplete="off"
        error={errors.cedula?.message}
        errorAction={verCliente('cedula')}
        {...register('cedula', {
          required: t.clientes.v.cedulaObligatoria,
          validate: validarCedula(t.clientes.v),
        })}
      />
      <Input
        label={t.clientes.telefono}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="912 345 678"
        hint={t.clientes.telefonoAyuda}
        error={errors.telefono?.message}
        errorAction={verCliente('telefono')}
        {...register('telefono', {
          required: t.clientes.v.telefonoObligatorio,
          validate: validarTelefono(t.clientes.v),
        })}
      />
      <Input
        label={t.clientes.correo}
        type="email"
        inputMode="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email', {
          required: t.validacion.emailObligatorio,
          pattern: { value: EMAIL_PATTERN, message: t.validacion.emailInvalido },
        })}
      />
      <Input
        label={t.clientes.direccion}
        autoComplete="street-address"
        placeholder="Rua do Souto 25, 4700-329 Braga"
        error={errors.direccion?.message}
        {...register('direccion', {
          required: t.clientes.v.direccionObligatoria,
          validate: longitud(5, 200, t.clientes.v.direccionLongitud),
        })}
      />
      <Input
        label={t.clientes.fechaNacimiento}
        type="date"
        min={FECHA_MINIMA_NACIMIENTO}
        max={hoyIso()}
        autoComplete="bday"
        error={errors.fechaNacimiento?.message}
        {...register('fechaNacimiento', {
          required: t.clientes.v.fechaObligatoria,
          validate: validarFechaNacimiento(t.clientes.v),
        })}
      />
      <Checkbox
        label={t.clientes.aceptaContacto}
        hint={t.clientes.aceptaContactoAyuda}
        {...register('aceptaContacto')}
      />
      <Textarea
        label={t.clientes.notas}
        hint={t.clientes.notasAyuda}
        error={errors.notas?.message}
        {...register('notas', {
          maxLength: { value: 500, message: t.clientes.v.notasLongitud },
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
