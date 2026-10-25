import { useFormContext } from 'react-hook-form';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { PASSWORD_MIN } from '../types';
import { useTextos } from '@/shared/i18n/textos';

export interface NuevaPasswordForm {
  passwordNueva: string;
  confirmacion: string;
}

/** Contraseña nueva y su confirmación, con las reglas de `domain-model`. Va dentro de un `FormProvider`. */
export function NuevaPasswordFields() {
  const t = useTextos();
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<NuevaPasswordForm>();
  return (
    <>
      <PasswordInput
        label={t.auth.passwordNueva}
        autoComplete="new-password"
        hint={t.auth.alMenosCaracteres(PASSWORD_MIN)}
        error={errors.passwordNueva?.message}
        {...register('passwordNueva', {
          required: t.auth.passwordNuevaObligatoria,
          minLength: {
            value: PASSWORD_MIN,
            message: t.validacion.passwordMinimo(PASSWORD_MIN),
          },
        })}
      />
      <PasswordInput
        label={t.auth.repitePassword}
        autoComplete="new-password"
        error={errors.confirmacion?.message}
        {...register('confirmacion', {
          required: t.auth.repitePasswordObligatoria,
          validate: (valor) => valor === getValues('passwordNueva') || t.auth.passwordsNoCoinciden,
        })}
      />
    </>
  );
}
