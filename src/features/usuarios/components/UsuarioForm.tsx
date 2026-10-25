import { useForm } from 'react-hook-form';
import { PASSWORD_MIN, ROLES, type Rol } from '@/features/auth';
import { ApiError, mensajeDeError } from '@/shared/lib/apiClient';
import { EMAIL_PATTERN } from '@/shared/lib/validacion';
import { Button } from '@/shared/ui/Button/Button';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';
import { Input } from '@/shared/ui/Input/Input';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { Select } from '@/shared/ui/Select/Select';
import { useState } from 'react';
import type { Usuario } from '../types';
import { useTextos } from '@/shared/i18n/textos';

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

export function UsuarioForm({ usuario, onSubmit, onCancel }: UsuarioFormProps) {
  const t = useTextos();
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
        label={t.usuarios.nombre}
        autoComplete="name"
        error={errors.nombre?.message}
        {...register('nombre', {
          required: t.clientes.v.nombreObligatorio,
          validate: (valor) =>
            (valor.trim().length >= 2 && valor.trim().length <= 80) ||
            t.validacion.nombreLongitud(2, 80),
        })}
      />
      {!esEdicion && (
        <>
          <Input
            label={t.usuarios.correo}
            type="email"
            autoComplete="off"
            inputMode="email"
            error={errors.email?.message}
            {...register('email', {
              required: t.validacion.emailObligatorio,
              pattern: { value: EMAIL_PATTERN, message: t.validacion.emailInvalido },
            })}
          />
          <PasswordInput
            label={t.usuarios.passwordInicial}
            autoComplete="new-password"
            hint={t.usuarios.passwordInicialAyuda}
            error={errors.password?.message}
            {...register('password', {
              required: t.validacion.passwordObligatoria,
              minLength: {
                value: PASSWORD_MIN,
                message: t.validacion.passwordMinimo(PASSWORD_MIN),
              },
            })}
          />
        </>
      )}
      <Select
        label={t.usuarios.rol}
        options={ROLES.map((rol) => ({ value: rol, label: t.roles[rol] }))}
        error={errors.rol?.message}
        {...register('rol')}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          {t.comun.cancelar}
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {esEdicion ? t.usuarios.guardarCambios : t.usuarios.crear}
        </Button>
      </div>
    </form>
  );
}
