import { ShieldX, UserX } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { Button } from '@/shared/ui/Button/Button';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog/ConfirmDialog';
import { toast } from '@/shared/ui/Toast/store';
import { clientesApi } from '../api';
import { nombreCompleto, type Cliente } from '../types';

export interface ClienteAccionesAdminProps {
  cliente: Cliente;
}

type Accion = 'baja' | 'anonimizar' | null;

/** Dar de baja y borrar datos personales (RGPD): solo para admin. */
export function ClienteAccionesAdmin({ cliente }: ClienteAccionesAdminProps) {
  const navigate = useNavigate();
  const [accion, setAccion] = useState<Accion>(null);
  const [isEnviando, setIsEnviando] = useState(false);
  const nombre = nombreCompleto(cliente);

  const ejecutar = async (operacion: () => Promise<unknown>, aviso: string) => {
    setIsEnviando(true);
    try {
      await operacion();
      toast.success(aviso);
      await navigate('/clientes', { replace: true });
    } catch (error) {
      toast.error(mensajeDeError(error));
      setIsEnviando(false);
      setAccion(null);
    }
  };

  return (
    <section aria-labelledby="acciones-admin" className="flex flex-col gap-3">
      <h2 id="acciones-admin" className="text-sm font-semibold text-slate-500 uppercase">
        Administración
      </h2>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="secondary" onClick={() => setAccion('baja')}>
          <UserX className="size-5" aria-hidden />
          Dar de baja
        </Button>
        <Button variant="ghost" className="text-red-700" onClick={() => setAccion('anonimizar')}>
          <ShieldX className="size-5" aria-hidden />
          Borrar datos personales (RGPD)
        </Button>
      </div>

      <ConfirmDialog
        isOpen={accion === 'baja'}
        title={`¿Dar de baja a ${nombre}?`}
        description="Dejará de aparecer en la lista de clientes. Su historial de servicios se conserva."
        confirmLabel="Dar de baja"
        isLoading={isEnviando}
        onConfirm={() =>
          void ejecutar(() => clientesApi.darDeBaja(cliente.id), 'Cliente dado de baja')
        }
        onCancel={() => setAccion(null)}
      />
      <ConfirmDialog
        isOpen={accion === 'anonimizar'}
        title="Borrar datos personales"
        description={
          <p>
            Se borrarán para siempre el nombre, la cédula, el teléfono, el correo, la dirección y la
            fecha de nacimiento de <strong>{nombre}</strong>. Sus servicios seguirán contando en las
            métricas. <strong>Esta acción no se puede deshacer.</strong>
          </p>
        }
        confirmLabel="Borrar datos"
        confirmText={nombre}
        isLoading={isEnviando}
        onConfirm={() =>
          void ejecutar(() => clientesApi.anonimizar(cliente.id), 'Datos personales borrados')
        }
        onCancel={() => setAccion(null)}
      />
    </section>
  );
}
