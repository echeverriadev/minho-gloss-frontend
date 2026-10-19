export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  locale: import.meta.env.VITE_APP_LOCALE ?? 'es-CO',
  currency: import.meta.env.VITE_APP_CURRENCY ?? 'COP',
  timeZone: import.meta.env.VITE_APP_TIMEZONE ?? 'America/Bogota',
};
