import { AuthCard, LoginForm } from '@/features/auth';

export function LoginPage() {
  return (
    <AuthCard title="Inicia sesión" description="Gestión de clientes y servicios del autolavado">
      <LoginForm />
    </AuthCard>
  );
}
