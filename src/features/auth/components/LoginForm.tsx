import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { ApiError, mensajeDeError } from '@/shared/lib/apiClient';
import { EMAIL_PATTERN } from '@/shared/lib/validacion';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { authApi } from '../api';
import { useSessionStore } from '../store';
import type { LoginRequest } from '../types';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';

interface LocationState {
  from?: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const iniciarSesion = useSessionStore((state) => state.iniciarSesion);
  const [aviso] = useState(() => useSessionStore.getState().tomarAvisoLogin());
  const [errorApi, setErrorApi] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (datos: LoginRequest) => {
    setErrorApi(undefined);
    try {
      iniciarSesion(await authApi.login(datos));
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- el estado lo pone RequireAuth
      const from = (location.state as LocationState | null)?.from;
      await navigate(from ?? '/', { replace: true });
    } catch (error) {
      setErrorApi(
        error instanceof ApiError && error.status === 401
          ? 'Correo o contraseña incorrectos'
          : mensajeDeError(error),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {aviso && !errorApi && <FormAlert tipo="info">{aviso}</FormAlert>}
      {errorApi && <FormAlert tipo="error">{errorApi}</FormAlert>}
      <Input
        label="Correo"
        type="email"
        autoComplete="email"
        inputMode="email"
        error={errors.email?.message}
        {...register('email', {
          required: 'El correo es obligatorio',
          pattern: { value: EMAIL_PATTERN, message: 'El correo no es válido' },
        })}
      />
      <PasswordInput
        label="Contraseña"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password', { required: 'La contraseña es obligatoria' })}
      />
      <Button type="submit" isLoading={isSubmitting} fullWidth>
        Iniciar sesión
      </Button>
      <Link
        to="/recuperar-password"
        className="text-brand-700 self-center py-2 text-sm font-medium hover:underline"
      >
        ¿Olvidaste tu contraseña?
      </Link>
    </form>
  );
}
