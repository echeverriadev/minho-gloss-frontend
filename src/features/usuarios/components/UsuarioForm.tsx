import { useForm } from 'react-hook-form';
import { ETIQUETA_ROL, PASSWORD_MIN, ROLES, type Rol } from '@/features/auth';
import { ApiError, mensajeDeError } from '@/shared/lib/apiClient';
import { EMAIL_PATTERN } from '@/shared/lib/validacion';
import { Button } from '@/shared/ui/Button/Button';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';
import { Input } from '@/shared/ui/Input/Input';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { Select } from '@/shared/ui/Select/Select';
import { useState } from 'react';
import type { Usuario } from '../types';

export interface UsuarioFormValues {
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
}

export interface UsuarioFormProps {
  /** Si viene, el formulario edita nombre y rol; si no, crea un usuario. */
  usuario?: Usuario;
  onSubmit: (valores: UsuarioFormValues) => Promise<void>;
  onCancel: () => void;
}

const OPCIONES_ROL = ROLES.map((rol) => ({ value: rol, label: ETIQUETA_ROL[rol] }));

export function UsuarioForm({ usuario, onSubmit, onCancel }: UsuarioFormProps) {
  const esEdicion = usuario !== undefined;
  const [errorApi, setErrorApi] = useState<string>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UsuarioFormValues>({
    defaultValues: {
      nombre: usuario?.nombre ?? '',
      email: usuario?.email ?? '',
      password: '',
      rol: usuario?.rol ?? 'empleado',
    },
  });

  const enviar = async (valores: UsuarioFormValues) => {
    setErrorApi(undefined);
    try {
      await onSubmit(valores);
    } catch (error) {
      if (error instanceof ApiError && error.status === 409 && !esEdicion) {
        setError('email', { message: error.message }, { shouldFocus: true });
      } else {
        setErrorApi(mensajeDeError(error));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-4">
      {errorApi && <FormAlert tipo="error">{errorApi}</FormAlert>}
      <Input
        label="Nombre"
        autoComplete="name"
        error={errors.nombre?.message}
        {...register('nombre', {
          required: 'El nombre es obligatorio',
          validate: (valor) =>
            (valor.trim().length >= 2 && valor.trim().length <= 80) ||
            'El nombre debe tener entre 2 y 80 caracteres',
        })}
      />
      {!esEdicion && (
        <>
          <Input
            label="Correo"
            type="email"
            autoComplete="off"
            inputMode="email"
            error={errors.email?.message}
            {...register('email', {
              required: 'El correo es obligatorio',
              pattern: { value: EMAIL_PATTERN, message: 'El correo no es válido' },
            })}
          />
          <PasswordInput
            label="Contraseña inicial"
            autoComplete="new-password"
            hint="Compártela con la persona; luego puede cambiarla desde su perfil"
            error={errors.password?.message}
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: PASSWORD_MIN,
                message: `La contraseña debe tener al menos ${PASSWORD_MIN} caracteres`,
              },
            })}
          />
        </>
      )}
      <Select label="Rol" options={OPCIONES_ROL} error={errors.rol?.message} {...register('rol')} />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {esEdicion ? 'Guardar cambios' : 'Crear usuario'}
        </Button>
      </div>
    </form>
  );
}
