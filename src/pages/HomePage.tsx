import { Droplets } from 'lucide-react';
import { useEffect, useState } from 'react';
import { apiClient } from '@/shared/lib/apiClient';
import { Button } from '@/shared/ui/Button/Button';

type HealthStatus = 'checking' | 'ok' | 'error';

export function HomePage() {
  const [status, setStatus] = useState<HealthStatus>('checking');

  const fetchHealth = () =>
    apiClient
      .get<{ status: string }>('/health')
      .then(() => setStatus('ok'))
      .catch(() => setStatus('error'));

  useEffect(() => {
    fetchHealth();
  }, []);

  const retry = () => {
    setStatus('checking');
    fetchHealth();
  };

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 p-6 text-center">
      <Droplets className="text-brand-600 size-12" aria-hidden />
      <h1 className="text-2xl font-bold">Minho Gloss</h1>
      <p className="text-slate-600">
        API:{' '}
        <span className="font-medium">
          {status === 'checking' && 'verificando…'}
          {status === 'ok' && 'conectada'}
          {status === 'error' && 'sin conexión'}
        </span>
      </p>
      <Button onClick={retry}>Reintentar</Button>
    </main>
  );
}
