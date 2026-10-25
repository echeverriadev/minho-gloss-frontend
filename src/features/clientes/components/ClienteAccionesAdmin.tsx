import { ShieldX, UserX } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { mensajeDeError } from '@/shared/lib/apiClient';
import { Button } from '@/shared/ui/Button/Button';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog/ConfirmDialog';
import { toast } from '@/shared/ui/Toast/store';
import { clientesApi } from '../api';
import { nombreCompleto, type Cliente } from '../types';
import { useTextos } from '@/shared/i18n/textos';

export interface ClienteAccionesAdminProps {
  cliente: Cliente;
}

type Accion = 'baja' | 'anonimizar' | null;

/** Dar de baja y borrar datos personales (RGPD): solo para admin. */
export function ClienteAccionesAdmin({ cliente }: ClienteAccionesAdminProps) {
  const navigate = useNavigate();
  const t = useTextos();
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
        {t.clientes.administracion}
      </h2>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button variant="secondary" onClick={() => setAccion('baja')}>
          <UserX className="size-5" aria-hidden />
          {t.clientes.darDeBaja}
        </Button>
        <Button variant="ghost" className="text-red-700" onClick={() => setAccion('anonimizar')}>
          <ShieldX className="size-5" aria-hidden />
          {t.clientes.borrarDatos}
        </Button>
      </div>

      <ConfirmDialog
        isOpen={accion === 'baja'}
        title={t.clientes.darDeBajaTitulo(nombre)}
        description={t.clientes.darDeBajaTexto}
        confirmLabel={t.clientes.darDeBaja}
        isLoading={isEnviando}
        onConfirm={() =>
          void ejecutar(() => clientesApi.darDeBaja(cliente.id), t.clientes.dadoDeBajaAviso)
        }
        onCancel={() => setAccion(null)}
      />
      <ConfirmDialog
        isOpen={accion === 'anonimizar'}
        title={t.clientes.borrarDatosTitulo}
        description={t.clientes.borrarDatosTexto(nombre)}
        confirmLabel={t.clientes.borrarDatosConfirmar}
        confirmText={nombre}
        isLoading={isEnviando}
        onConfirm={() =>
          void ejecutar(() => clientesApi.anonimizar(cliente.id), t.clientes.datosBorrados)
        }
        onCancel={() => setAccion(null)}
      />
    </section>
  );
}
