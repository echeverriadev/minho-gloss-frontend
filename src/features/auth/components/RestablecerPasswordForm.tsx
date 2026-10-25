import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { ApiError, mensajeDeError } from '@/shared/lib/apiClient';
import { Button } from '@/shared/ui/Button/Button';
import { authApi } from '../api';
import { useSessionStore } from '../store';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';
import { type NuevaPasswordForm, NuevaPasswordFields } from './NuevaPasswordFields';
import { useTextos } from '@/shared/i18n/textos';

export interface RestablecerPasswordFormProps {
  token: string | null;
}

export function RestablecerPasswordForm({ token }: RestablecerPasswordFormProps) {
  const navigate = useNavigate();
  const t = useTextos();
  const [errorApi, setErrorApi] = useState<string | undefined>(
    token ? undefined : t.auth.enlaceInvalido,
  );
  const form = useForm<NuevaPasswordForm>({
    defaultValues: { passwordNueva: '', confirmacion: '' },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async ({ passwordNueva }: NuevaPasswordForm) => {
    if (!token) {
      return;
    }
    setErrorApi(undefined);
    try {
      await authApi.restablecerPassword({ token, password: passwordNueva });
      // Si había otra sesión abierta en este dispositivo, se cierra para entrar con la contraseña nueva.
      useSessionStore.getState().cerrarSesion('passwordActualizada');
      await navigate('/login', { replace: true });
    } catch (error) {
      setErrorApi(
        error instanceof ApiError && error.status === 400
          ? t.auth.enlaceInvalido
          : mensajeDeError(error),
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        {errorApi && (
          <FormAlert tipo="error">
            {errorApi}{' '}
            <Link to="/recuperar-password" className="font-medium underline">
              {t.auth.pedirOtroEnlace}
            </Link>
          </FormAlert>
        )}
        {token && (
          <>
            <NuevaPasswordFields />
            <Button type="submit" isLoading={isSubmitting} fullWidth>
              {t.auth.guardarPassword}
            </Button>
          </>
        )}
        <Link
          to="/login"
          className="text-brand-700 self-center py-2 text-sm font-medium hover:underline"
        >
          {t.auth.volverALogin}
        </Link>
      </form>
    </FormProvider>
  );
}
