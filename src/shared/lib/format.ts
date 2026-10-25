import { env } from '@/shared/config/env';

// Formateadores únicos para que montos y fechas se vean igual en toda la app (spec code-style).
const monedaFormatter = new Intl.NumberFormat(env.locale, {
  style: 'currency',
  currency: env.currency,
});

const fechaFormatter = new Intl.DateTimeFormat(env.locale, {
  timeZone: env.timeZone,
  dateStyle: 'medium',
});

const fechaHoraFormatter = new Intl.DateTimeFormat(env.locale, {
  timeZone: env.timeZone,
  dateStyle: 'medium',
  timeStyle: 'short',
});

/** Formatea un monto en céntimos en la moneda del negocio, por ejemplo 2000 → "20,00 €". */
export function formatMoneda(centimos: number): string {
  return monedaFormatter.format(centimos / 100);
}

/** Formatea una fecha ISO 8601 como día en la zona horaria del negocio. */
export function formatFecha(fechaIso: string): string {
  return fechaFormatter.format(new Date(fechaIso));
}

/** Formatea una fecha ISO 8601 con día y hora en la zona horaria del negocio. */
export function formatFechaHora(fechaIso: string): string {
  return fechaHoraFormatter.format(new Date(fechaIso));
}

const fechaCalendarioFormatter = new Intl.DateTimeFormat(env.locale, {
  timeZone: 'UTC',
  dateStyle: 'long',
});

/** Formatea una fecha de calendario `YYYY-MM-DD` (sin hora), por ejemplo una fecha de nacimiento. */
export function formatFechaCalendario(fecha: string): string {
  return fechaCalendarioFormatter.format(new Date(`${fecha}T00:00:00Z`));
}

/** Hoy como `YYYY-MM-DD` en la zona del negocio. */
export function hoyIso(ahora = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: env.timeZone }).format(ahora);
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
