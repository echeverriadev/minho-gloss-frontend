import { AuthCard, RecuperarPasswordForm } from '@/features/auth';

export function RecuperarPasswordPage() {
  return (
    <AuthCard
      title="Recupera tu contraseña"
      description="Escribe el correo de tu cuenta y te enviaremos un enlace para elegir una nueva."
    >
      <RecuperarPasswordForm />
    </AuthCard>
  );
}
