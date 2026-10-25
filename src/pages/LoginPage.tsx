import { AuthCard, LoginForm } from '@/features/auth';
import { useTextos } from '@/shared/i18n/textos';

export function LoginPage() {
  const t = useTextos();
  return (
    <AuthCard title={t.auth.loginTitulo} description={t.auth.loginDescripcion}>
      <LoginForm />
    </AuthCard>
  );
}
