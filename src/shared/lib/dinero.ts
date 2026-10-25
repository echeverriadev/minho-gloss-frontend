/** Texto del usuario ("15,5", "15.50") → céntimos (1550). */
export function parseCentimos(texto: string): number | null {
  const limpio = texto.replace(/[^\d,.]/g, '').replace(',', '.');
  if (!limpio) {
    return null;
  }
  const numero = Number(limpio);
  return Number.isFinite(numero) ? Math.round(numero * 100) : null;
}
