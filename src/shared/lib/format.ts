import { env } from '@/shared/config/env';
import { LOCALE } from '@/shared/i18n/textos';
import { usePreferenciasStore } from '@/shared/preferencias/store';

// Formateadores únicos para que montos y fechas se vean igual en toda la app (spec code-style),
// creados una vez por idioma (es-ES o pt-PT según la preferencia del usuario).
interface Formateadores {
  moneda: Intl.NumberFormat;
  fecha: Intl.DateTimeFormat;
  fechaHora: Intl.DateTimeFormat;
  hora: Intl.DateTimeFormat;
  fechaCalendario: Intl.DateTimeFormat;
}

const cache = new Map<string, Formateadores>();

function formateadores(): Formateadores {
  const locale = LOCALE[usePreferenciasStore.getState().idioma];
  let actuales = cache.get(locale);
  if (!actuales) {
    actuales = {
      moneda: new Intl.NumberFormat(locale, { style: 'currency', currency: env.currency }),
      fecha: new Intl.DateTimeFormat(locale, { timeZone: env.timeZone, dateStyle: 'medium' }),
      fechaHora: new Intl.DateTimeFormat(locale, {
        timeZone: env.timeZone,
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      hora: new Intl.DateTimeFormat(locale, { timeZone: env.timeZone, timeStyle: 'short' }),
      fechaCalendario: new Intl.DateTimeFormat(locale, { timeZone: 'UTC', dateStyle: 'long' }),
    };
    cache.set(locale, actuales);
  }
  return actuales;
}

/** Formatea un monto en céntimos en la moneda del negocio, por ejemplo 2000 → "20,00 €". */
export function formatMoneda(centimos: number): string {
  return formateadores().moneda.format(centimos / 100);
}

/** Formatea una fecha ISO 8601 como día en la zona horaria del negocio. */
export function formatFecha(fechaIso: string): string {
  return formateadores().fecha.format(new Date(fechaIso));
}

/** Formatea una fecha ISO 8601 con día y hora en la zona horaria del negocio. */
export function formatFechaHora(fechaIso: string): string {
  return formateadores().fechaHora.format(new Date(fechaIso));
}

/** Formatea solo la hora de una fecha ISO 8601 en la zona horaria del negocio, por ejemplo "10:30". */
export function formatHora(fechaIso: string): string {
  return formateadores().hora.format(new Date(fechaIso));
}

/** Formatea una fecha de calendario `YYYY-MM-DD` (sin hora), por ejemplo una fecha de nacimiento. */
export function formatFechaCalendario(fecha: string): string {
  return formateadores().fechaCalendario.format(new Date(`${fecha}T00:00:00Z`));
}

/** Hoy como `YYYY-MM-DD` en la zona del negocio. */
export function hoyIso(ahora = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: env.timeZone }).format(ahora);
}

/** Fecha y hora ISO 8601 → valor de `<input type="datetime-local">` en la zona del negocio. */
export function aFechaHoraLocal(fechaIso: string): string {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: env.timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(new Date(fechaIso))
      .map((parte) => [parte.type, parte.value]),
  );
  return `${partes.year}-${partes.month}-${partes.day}T${partes.hour}:${partes.minute}`;
}

/** Valor de `<input type="datetime-local">` en la zona del negocio → fecha ISO 8601 en UTC. */
export function deFechaHoraLocal(valor: string): string {
  const comoUtc = new Date(`${valor}:00Z`);
  // Desfase de la zona en ese momento: se compara la hora local que resulta con la buscada.
  const desfase =
    new Date(`${aFechaHoraLocal(comoUtc.toISOString())}:00Z`).getTime() - comoUtc.getTime();
  return new Date(comoUtc.getTime() - desfase).toISOString();
}

/** Día anterior a `dia` (`YYYY-MM-DD`). */
export function diaAnterior(dia: string): string {
  const [anio, mes, diaMes] = dia.split('-').map(Number);
  return new Date(Date.UTC(anio, mes - 1, diaMes - 1)).toISOString().slice(0, 10);
}

/** Años cumplidos a hoy a partir de una fecha `YYYY-MM-DD`. */
export function calcularEdad(fechaNacimiento: string, hoy = hoyIso()): number {
  const [anio, mes, dia] = fechaNacimiento.split('-').map(Number);
  const [anioHoy, mesHoy, diaHoy] = hoy.split('-').map(Number);
  const yaCumplio = mesHoy > mes || (mesHoy === mes && diaHoy >= dia);
  return anioHoy - anio - (yaCumplio ? 0 : 1);
}

/** Muestra un teléfono E.164 portugués en grupos legibles: `+351 912 345 678`. */
export function formatTelefono(telefono: string): string {
  const match = /^\+351(\d{3})(\d{3})(\d{3})$/.exec(telefono);
  return match ? `+351 ${match[1]} ${match[2]} ${match[3]}` : telefono;
}
