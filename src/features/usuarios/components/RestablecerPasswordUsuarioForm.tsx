import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PASSWORD_MIN } from '@/features/auth';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { Button } from '@/shared/ui/Button/Button';
import { FormAlert } from '@/shared/ui/FormAlert/FormAlert';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { useTextos } from '@/shared/i18n/textos';

export interface RestablecerPasswordUsuarioFormProps {
  nombre: string;
  onSubmit: (password: string) => Promise<void>;
  onCancel: () => void;
}

export function RestablecerPasswordUsuarioForm({
  nombre,
  onSubmit,
  onCancel,
}: RestablecerPasswordUsuarioFormProps) {
  const t = useTextos();
  const [errorApi, setErrorApi] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ password: string }>({ defaultValues: { password: '' } });

  const enviar = async ({ password }: { password: string }) => {
    setErrorApi(undefined);
    try {
      await onSubmit(password);
    } catch (error) {
      setErrorApi(mensajeDeError(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(enviar)} noValidate className="flex flex-col gap-4">
      <p className="text-slate-700">{t.usuarios.restablecerTexto(nombre)}</p>
      {errorApi && <FormAlert tipo="error">{errorApi}</FormAlert>}
      <PasswordInput
        label={t.auth.passwordNueva}
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password', {
          required: t.validacion.passwordObligatoria,
          minLength: {
            value: PASSWORD_MIN,
            message: t.validacion.passwordMinimo(PASSWORD_MIN),
          },
        })}
      />
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          {t.comun.cancelar}
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {t.usuarios.restablecer}
        </Button>
      </div>
    </form>
  );
}
