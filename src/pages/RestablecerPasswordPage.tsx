import { useSearchParams } from 'react-router';
import { AuthCard, RestablecerPasswordForm } from '@/features/auth';
import { useTextos } from '@/shared/i18n/textos';

export function RestablecerPasswordPage() {
  const [searchParams] = useSearchParams();
  const t = useTextos();
  return (
    <AuthCard title={t.auth.restablecerTitulo}>
      <RestablecerPasswordForm token={searchParams.get('token')} />
    </AuthCard>
  );
}
