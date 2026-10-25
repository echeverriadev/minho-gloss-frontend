import { ChevronRight, IdCard, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { formatTelefono } from '@/shared/lib/format';
import { nombreCompleto, type Cliente } from '../types';

export interface ClienteCardProps {
  cliente: Pick<Cliente, 'id' | 'nombre' | 'apellido' | 'telefono' | 'cedula'>;
}

export function ClienteCard({ cliente }: ClienteCardProps) {
  return (
    <Link
      to={`/clientes/${cliente.id}`}
      className="focus-visible:outline-brand-600 bg-surface flex min-h-16 items-center gap-3 rounded-xl p-4 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 focus-visible:outline-2"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-900">{nombreCompleto(cliente)}</p>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
          {cliente.telefono && (
            <span className="inline-flex items-center gap-1">
              <Phone className="size-4" aria-hidden />
              {formatTelefono(cliente.telefono)}
            </span>
          )}
          {cliente.cedula && (
            <span className="inline-flex items-center gap-1">
              <IdCard className="size-4" aria-hidden />
              {cliente.cedula}
            </span>
          )}
        </div>
      </div>
      <ChevronRight className="size-5 shrink-0 text-slate-400" aria-hidden />
    </Link>
  );
}
