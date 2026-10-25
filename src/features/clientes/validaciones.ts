import { hoyIso } from '@/shared/lib/format';
import { normalizarCedula, normalizarTelefono } from '@/shared/lib/telefono';

// Mismas reglas que la entidad Cliente de domain-model; la API vuelve a validarlas.
export const FECHA_MINIMA_NACIMIENTO = '1900-01-01';

export function longitud(min: number, max: number, mensaje: string) {
  return (valor: string) => (valor.trim().length >= min && valor.trim().length <= max) || mensaje;
}

export function validarCedula(valor: string): true | string {
  return (
    /^[A-Z0-9]{4,20}$/.test(normalizarCedula(valor)) ||
    'La cédula debe tener entre 4 y 20 letras o números'
  );
}

export function validarTelefono(valor: string): true | string {
  return (
    normalizarTelefono(valor) !== null ||
    'El teléfono no es válido: usa entre 8 y 15 dígitos, por ejemplo 912 345 678'
  );
}

export function validarFechaNacimiento(valor: string): true | string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor) || valor < FECHA_MINIMA_NACIMIENTO) {
    return 'La fecha de nacimiento no es válida';
  }
  return valor <= hoyIso() || 'La fecha de nacimiento no puede ser futura';
}
