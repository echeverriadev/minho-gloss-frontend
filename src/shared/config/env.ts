// Sin VITE_API_URL, la API se busca en el mismo host desde el que se abrió la app (puerto 3000):
// así funciona igual con localhost, 127.0.0.1 o la IP de la red local desde el celular.
const apiUrlPorDefecto = `${window.location.protocol}//${window.location.hostname}:3000/api`;

export const env = {
  apiUrl: import.meta.env.VITE_API_URL || apiUrlPorDefecto,
  locale: import.meta.env.VITE_APP_LOCALE ?? 'es-ES',
  currency: import.meta.env.VITE_APP_CURRENCY ?? 'EUR',
  timeZone: import.meta.env.VITE_APP_TIMEZONE ?? 'Europe/Lisbon',
};
