import { useFormContext } from 'react-hook-form';
import { PasswordInput } from '@/shared/ui/PasswordInput/PasswordInput';
import { PASSWORD_MIN } from '../types';

export interface NuevaPasswordForm {
  passwordNueva: string;
  confirmacion: string;
}

/** Contraseña nueva y su confirmación, con las reglas de `domain-model`. Va dentro de un `FormProvider`. */
export function NuevaPasswordFields() {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<NuevaPasswordForm>();
  return (
    <>
      <PasswordInput
        label="Contraseña nueva"
        autoComplete="new-password"
        hint={`Al menos ${PASSWORD_MIN} caracteres`}
        error={errors.passwordNueva?.message}
        {...register('passwordNueva', {
          required: 'La contraseña nueva es obligatoria',
          minLength: {
            value: PASSWORD_MIN,
            message: `La contraseña debe tener al menos ${PASSWORD_MIN} caracteres`,
          },
        })}
      />
      <PasswordInput
        label="Repite la contraseña nueva"
        autoComplete="new-password"
        error={errors.confirmacion?.message}
        {...register('confirmacion', {
          required: 'Repite la contraseña nueva',
          validate: (valor) =>
            valor === getValues('passwordNueva') || 'Las contraseñas no coinciden',
        })}
      />
    </>
  );
}
