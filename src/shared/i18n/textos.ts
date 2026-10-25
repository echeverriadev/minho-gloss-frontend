import { type Idioma, usePreferenciasStore } from '@/shared/preferencias/store';
import { es, type Textos } from './textos/es';
import { ptPT } from './textos/pt';

const TEXTOS: Record<Idioma, Textos> = { es, 'pt-PT': ptPT };

/** Locale de `Intl` para cada idioma (montos y fechas). */
export const LOCALE: Record<Idioma, string> = { es: 'es-ES', 'pt-PT': 'pt-PT' };

/** Textos del idioma elegido; la pantalla se vuelve a dibujar al cambiarlo. */
export function useTextos(): Textos {
  return TEXTOS[usePreferenciasStore((state) => state.idioma)];
}

/** Para código fuera de componentes (por ejemplo `apiClient`). */
export function getTextos(): Textos {
  return TEXTOS[usePreferenciasStore.getState().idioma];
}

export type { Textos };
