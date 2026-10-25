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

export interface ClienteFormProps {
  cliente?: Cliente;
  onSubmit: (datos: ClienteRequest) => Promise<void>;
  onCancel: () => void;
}

type CampoConflicto = 'telefono' | 'cedula';

/** Alta y edición de un cliente con las reglas de `domain-model`. */
export function ClienteForm({ cliente, onSubmit, onCancel }: ClienteFormProps) {
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
        Ver cliente
      </Link>
    );

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-4">
      {errorApi && <FormAlert tipo="error">{errorApi}</FormAlert>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Nombre"
          autoComplete="given-name"
          error={errors.nombre?.message}
          {...register('nombre', {
            required: 'El nombre es obligatorio',
            validate: longitud(2, 60, 'El nombre debe tener entre 2 y 60 caracteres'),
          })}
        />
        <Input
          label="Apellido"
          autoComplete="family-name"
          error={errors.apellido?.message}
          {...register('apellido', {
            required: 'El apellido es obligatorio',
            validate: longitud(2, 60, 'El apellido debe tener entre 2 y 60 caracteres'),
          })}
        />
      </div>
      <Input
        label="Cédula"
        hint="NIF, Cartão de Cidadão, pasaporte u otro documento"
        autoComplete="off"
        error={errors.cedula?.message}
        errorAction={verCliente('cedula')}
        {...register('cedula', {
          required: 'La cédula es obligatoria',
          validate: validarCedula,
        })}
      />
      <Input
        label="Teléfono celular"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="912 345 678"
        hint="Sin código de país se usa +351 (Portugal)"
        error={errors.telefono?.message}
        errorAction={verCliente('telefono')}
        {...register('telefono', {
          required: 'El teléfono es obligatorio',
          validate: validarTelefono,
        })}
      />
      <Input
        label="Correo"
        type="email"
        inputMode="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email', {
          required: 'El correo es obligatorio',
          pattern: { value: EMAIL_PATTERN, message: 'El correo no es válido' },
        })}
      />
      <Input
        label="Dirección"
        autoComplete="street-address"
        placeholder="Rua do Souto 25, 4700-329 Braga"
        error={errors.direccion?.message}
        {...register('direccion', {
          required: 'La dirección es obligatoria',
          validate: longitud(5, 200, 'La dirección debe tener entre 5 y 200 caracteres'),
        })}
      />
      <Input
        label="Fecha de nacimiento"
        type="date"
        min={FECHA_MINIMA_NACIMIENTO}
        max={hoyIso()}
        autoComplete="bday"
        error={errors.fechaNacimiento?.message}
        {...register('fechaNacimiento', {
          required: 'La fecha de nacimiento es obligatoria',
          validate: validarFechaNacimiento,
        })}
      />
      <Checkbox
        label="Acepta recibir recordatorios por WhatsApp, llamada o correo"
        hint="Pregúntaselo al cliente: sin su autorización no se le envían mensajes (RGPD)"
        {...register('aceptaContacto')}
      />
      <Textarea
        label="Notas"
        hint="Opcional, hasta 500 caracteres"
        error={errors.notas?.message}
        {...register('notas', {
          maxLength: { value: 500, message: 'Las notas no pueden superar los 500 caracteres' },
        })}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          Guardar
        </Button>
      </div>
    </form>
  );
}
