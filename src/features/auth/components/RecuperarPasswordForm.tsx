import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { authApi } from '../api';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';
import { EMAIL_PATTERN } from '@/shared/lib/validacion';
import { useTextos } from '@/shared/i18n/textos';

interface RecuperarForm {
  email: string;
}

export function RecuperarPasswordForm() {
  const [enviado, setEnviado] = useState(false);
  const t = useTextos();
  const [errorApi, setErrorApi] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecuperarForm>({ defaultValues: { email: '' } });

  const onSubmit = async ({ email }: RecuperarForm) => {
    setErrorApi(undefined);
    try {
      await authApi.recuperarPassword(email);
      setEnviado(true);
    } catch (error) {
      setErrorApi(mensajeDeError(error));
    }
  };

  if (enviado) {
    return (
      <div className="flex flex-col gap-4">
        <FormAlert tipo="success">{t.auth.enlaceEnviado}</FormAlert>
        <Link
          to="/login"
          className="text-brand-700 self-center py-2 text-sm font-medium hover:underline"
        >
          {t.auth.volverALogin}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {errorApi && <FormAlert tipo="error">{errorApi}</FormAlert>}
      <Input
        label={t.auth.correo}
        type="email"
        autoComplete="email"
        inputMode="email"
        error={errors.email?.message}
        {...register('email', {
          required: t.validacion.emailObligatorio,
          pattern: { value: EMAIL_PATTERN, message: t.validacion.emailInvalido },
        })}
      />
      <Button type="submit" isLoading={isSubmitting} fullWidth>
        {t.auth.enviarEnlace}
      </Button>
      <Link
        to="/login"
        className="text-brand-700 self-center py-2 text-sm font-medium hover:underline"
      >
        {t.auth.volverALogin}
      </Link>
    </form>
  );
}
