import { SearchX, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue';
import { Button } from '@/shared/ui/Button/Button';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState';
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { useClientesBusqueda } from '../hooks/useClientesBusqueda';
import { ClienteCard } from './ClienteCard';
import { useTextos } from '@/shared/i18n/textos';

function AgregarClienteLink() {
  const t = useTextos();
  return (
    <ButtonLink to="/clientes/nuevo">
      <UserPlus className="size-5" aria-hidden />
      {t.clientes.agregar}
    </ButtonLink>
  );
}

/** Lista de clientes con buscador; el texto buscado vive en la URL (`?q=`). */
export function ClientesList() {
  const t = useTextos();
  const [searchParams, setSearchParams] = useSearchParams();
  const [texto, setTexto] = useState(() => searchParams.get('q') ?? '');
  const q = useDebouncedValue(texto.trim(), 300);
  const { clientes, total, isLoading, error, hayMas, verMas, reintentar } = useClientesBusqueda(q);

  const handleBuscar = (valor: string) => {
    setTexto(valor);
    setSearchParams(valor.trim() ? { q: valor } : {}, { replace: true });
  };

  const sinResultados = !isLoading && !error && clientes.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-14 z-10 -mx-4 flex flex-col gap-3 bg-slate-50 px-4 pt-1 pb-3 sm:flex-row md:top-0">
        <div className="flex-1">
          <SearchInput
            label={t.clientes.buscar}
            placeholder={t.clientes.buscarPlaceholder}
            value={texto}
            onChange={handleBuscar}
            autoComplete="off"
          />
        </div>
        <AgregarClienteLink />
      </div>

      {!isLoading && !error && clientes.length > 0 && (
        <p className="text-sm text-slate-600" aria-live="polite">
          {t.clientes.cantidad(total)}
        </p>
      )}

      {error && <ErrorState message={error} onRetry={reintentar} />}

      {sinResultados && q && (
        <EmptyState
          icon={SearchX}
          title={t.clientes.sinResultados(q)}
          action={<AgregarClienteLink />}
        />
      )}
      {sinResultados && !q && (
        <EmptyState
          icon={Users}
          title={t.clientes.vacio}
          description={t.clientes.vacioDescripcion}
          action={<AgregarClienteLink />}
        />
      )}

      <ul className="flex flex-col gap-2">
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <ClienteCard cliente={cliente} />
          </li>
        ))}
      </ul>

      {isLoading && (
        <div className="flex flex-col gap-2" aria-hidden>
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}

      {hayMas && !isLoading && (
        <Button variant="secondary" onClick={verMas} fullWidth>
          {t.comun.verMas}
        </Button>
      )}
    </div>
  );
}
