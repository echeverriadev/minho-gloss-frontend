import { useSearchParams } from 'react-router';
import { AuthCard, RestablecerPasswordForm } from '@/features/auth';

export function RestablecerPasswordPage() {
  const [searchParams] = useSearchParams();
  return (
    <AuthCard title="Elige una contraseña nueva">
      <RestablecerPasswordForm token={searchParams.get('token')} />
    </AuthCard>
  );
}
