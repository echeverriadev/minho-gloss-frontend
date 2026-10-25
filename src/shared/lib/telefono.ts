/**
 * Misma normalización que la API (spec domain-model): quita separadores, `00` inicial → `+`
 * y agrega el código de país por defecto si falta. Devuelve `null` si no es válido.
 */
export function normalizarTelefono(texto: string, codigoPais = '351'): string | null {
  const limpio = texto.trim().replace(/[\s\-.()/]/g, '');
  const conMas = limpio.startsWith('00') ? `+${limpio.slice(2)}` : limpio;
  if (!/^\+?\d+$/.test(conMas)) {
    return null;
  }
  const completo = conMas.startsWith('+') ? conMas : `+${codigoPais}${conMas}`;
  const digitos = completo.length - 1;
  return digitos >= 8 && digitos <= 15 ? completo : null;
}

/** Documento de identidad en mayúsculas sin espacios, puntos ni guiones. */
export function normalizarCedula(texto: string): string {
  return texto
    .trim()
    .toUpperCase()
    .replace(/[\s.\-/]/g, '');
}
