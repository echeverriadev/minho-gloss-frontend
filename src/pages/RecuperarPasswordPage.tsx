import { AuthCard, RecuperarPasswordForm } from '@/features/auth';
import { useTextos } from '@/shared/i18n/textos';

export function RecuperarPasswordPage() {
  const t = useTextos();
  return (
    <AuthCard title={t.auth.recuperarTitulo} description={t.auth.recuperarDescripcion}>
      <RecuperarPasswordForm />
    </AuthCard>
  );
}
