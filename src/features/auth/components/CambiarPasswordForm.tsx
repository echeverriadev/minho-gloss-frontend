import { FormProvider, useForm } from 'react-hook-form';
import { ApiError, mensajeDeError } from '@/shared/lib/apiClient';
import { Button } from '@/shared/ui/Button/Button';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { toast } from '@/shared/ui/Toast/store';
import { authApi } from '../api';
import { type NuevaPasswordForm, NuevaPasswordFields } from './NuevaPasswordFields';
import { useTextos } from '@/shared/i18n/textos';

interface CambiarForm extends NuevaPasswordForm {
  passwordActual: string;
}

export function CambiarPasswordForm() {
  const t = useTextos();
  const form = useForm<CambiarForm>({
    defaultValues: { passwordActual: '', passwordNueva: '', confirmacion: '' },
  });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async ({ passwordActual, passwordNueva }: CambiarForm) => {
    try {
      await authApi.cambiarPassword({ passwordActual, passwordNueva });
      reset();
      toast.success(t.auth.passwordCambiada);
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        setError('passwordActual', { message: error.message }, { shouldFocus: true });
      } else {
        toast.error(mensajeDeError(error));
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <PasswordInput
          label={t.auth.passwordActual}
          autoComplete="current-password"
          error={errors.passwordActual?.message}
          {...register('passwordActual', { required: t.auth.passwordActualObligatoria })}
        />
        <NuevaPasswordFields />
        <Button type="submit" isLoading={isSubmitting}>
          {t.auth.cambiarPassword}
        </Button>
      </form>
    </FormProvider>
  );
}
