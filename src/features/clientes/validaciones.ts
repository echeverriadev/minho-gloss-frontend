import type { Textos } from '@/shared/i18n/textos';
import { hoyIso } from '@/shared/lib/format';
import { normalizarCedula, normalizarTelefono } from '@/shared/lib/telefono';

// Mismas reglas que la entidad Cliente de domain-model; la API vuelve a validarlas.
export const FECHA_MINIMA_NACIMIENTO = '1900-01-01';

type Mensajes = Textos['clientes']['v'];

export function longitud(min: number, max: number, mensaje: string) {
  return (valor: string) => (valor.trim().length >= min && valor.trim().length <= max) || mensaje;
}

export function validarCedula(v: Mensajes) {
  return (valor: string): true | string =>
    /^[A-Z0-9]{4,20}$/.test(normalizarCedula(valor)) || v.cedulaInvalida;
}

export function validarTelefono(v: Mensajes) {
  return (valor: string): true | string => normalizarTelefono(valor) !== null || v.telefonoInvalido;
}

export function validarFechaNacimiento(v: Mensajes) {
  return (valor: string): true | string => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor) || valor < FECHA_MINIMA_NACIMIENTO) {
      return v.fechaInvalida;
    }
    return valor <= hoyIso() || v.fechaFutura;
  };
}
