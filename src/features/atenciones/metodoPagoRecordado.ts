import { METODOS_PAGO, type MetodoPago } from './types';

const CLAVE = 'minho-gloss:ultimo-metodo-pago';

/** Último método de pago usado en este dispositivo; el almacenamiento puede no estar disponible. */
export function leerMetodoPago(): MetodoPago {
  try {
    const guardado = localStorage.getItem(CLAVE);
    return METODOS_PAGO.find((metodo) => metodo === guardado) ?? 'efectivo';
  } catch {
    return 'efectivo';
  }
}

export function recordarMetodoPago(metodo: MetodoPago): void {
  try {
    localStorage.setItem(CLAVE, metodo);
  } catch {
    // Sin almacenamiento (modo privado): la próxima vez empieza en efectivo.
  }
}
