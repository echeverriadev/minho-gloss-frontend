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
