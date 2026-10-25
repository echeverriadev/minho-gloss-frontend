import { Mail, MessageCircle, Pencil, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { useIsAdmin } from '@/features/auth';
import { enlaceCorreo, enlaceLlamada, enlaceWhatsapp } from '@/shared/lib/contacto';
import {
  calcularEdad,
  formatFecha,
  formatFechaCalendario,
  formatTelefono,
} from '@/shared/lib/format';
import { Badge } from '@/shared/ui/Badge/Badge';
import { ButtonLink } from '@/shared/ui/ButtonLink/ButtonLink';
import { Card } from '@/shared/ui/Card/Card';
import {
  buttonBaseClasses,
  buttonSizeClasses,
  buttonVariantClasses,
} from '@/shared/ui/Button/buttonClasses';
import { cn } from '@/shared/lib/cn';
import { nombreCompleto, type Cliente } from '../types';
import { ClienteAccionesAdmin } from './ClienteAccionesAdmin';
import { useTextos } from '@/shared/i18n/textos';

export interface ClienteDetalleProps {
  cliente: Cliente;
}

const accionContacto = cn(
  buttonBaseClasses,
  buttonVariantClasses.secondary,
  buttonSizeClasses.sm,
  'flex-1',
);

function Dato({ etiqueta, children }: { etiqueta: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 py-2">
      <dt className="text-sm text-slate-500">{etiqueta}</dt>
      <dd className="break-words text-slate-900">{children}</dd>
    </div>
  );
}

export function ClienteDetalle({ cliente }: ClienteDetalleProps) {
  const isAdmin = useIsAdmin();
  const t = useTextos();
  const { telefono, email } = cliente;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-slate-900">{nombreCompleto(cliente)}</h2>
          <div className="mt-2 flex flex-wrap gap-1">
            {cliente.aceptaContacto ? (
              <Badge tone="success">{t.clientes.aceptaRecordatorios}</Badge>
            ) : (
              <Badge tone="warning">{t.clientes.noAceptaRecordatorios}</Badge>
            )}
            {!cliente.activo && <Badge tone="danger">{t.clientes.dadoDeBaja}</Badge>}
          </div>
        </div>
        {cliente.activo && (
          <ButtonLink to={`/clientes/${cliente.id}/editar`} variant="secondary" size="sm">
            <Pencil className="size-4" aria-hidden />
            {t.comun.editar}
          </ButtonLink>
        )}
      </div>

      {(telefono || email) && (
        <div className="flex gap-2">
          {telefono && (
            <a href={enlaceLlamada(telefono)} className={accionContacto}>
              <Phone className="size-4" aria-hidden />
              {t.clientes.llamar}
            </a>
          )}
          {telefono && (
            <a
              href={enlaceWhatsapp(telefono)}
              target="_blank"
              rel="noreferrer"
              className={accionContacto}
            >
              <MessageCircle className="size-4" aria-hidden />
              {t.clientes.whatsapp}
            </a>
          )}
          {email && (
            <a href={enlaceCorreo(email)} className={accionContacto}>
              <Mail className="size-4" aria-hidden />
              {t.clientes.enviarCorreo}
            </a>
          )}
        </div>
      )}

      <Card>
        <dl className="divide-y divide-slate-100">
          <Dato etiqueta={t.clientes.cedula}>{cliente.cedula ?? t.comun.sinDato}</Dato>
          <Dato etiqueta={t.clientes.telefono}>
            {telefono ? formatTelefono(telefono) : t.comun.sinDato}
          </Dato>
          <Dato etiqueta={t.clientes.correo}>{email ?? t.comun.sinDato}</Dato>
          <Dato etiqueta={t.clientes.direccion}>{cliente.direccion ?? t.comun.sinDato}</Dato>
          <Dato etiqueta={t.clientes.fechaNacimiento}>
            {cliente.fechaNacimiento
              ? `${formatFechaCalendario(cliente.fechaNacimiento)} (${t.clientes.edad(calcularEdad(cliente.fechaNacimiento))})`
              : '—'}
          </Dato>
          {cliente.notas && <Dato etiqueta={t.clientes.notas}>{cliente.notas}</Dato>}
        </dl>
      </Card>

      <Card className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-slate-500">{t.clientes.servicios}</p>
          <p className="text-2xl font-semibold text-slate-900">{cliente.totalServicios}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">{t.clientes.ultimoServicio}</p>
          <p className="text-lg font-medium text-slate-900">
            {cliente.ultimoServicioEn
              ? formatFecha(cliente.ultimoServicioEn)
              : t.clientes.sinServicios}
          </p>
        </div>
      </Card>

      {isAdmin && cliente.activo && <ClienteAccionesAdmin cliente={cliente} />}
    </div>
  );
}
