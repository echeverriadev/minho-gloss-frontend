import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const IDIOMAS = ['es', 'pt-PT'] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const TEMAS = ['claro', 'oscuro'] as const;
export type Tema = (typeof TEMAS)[number];

export interface Preferencias {
  idioma: Idioma;
  tema: Tema;
}

interface PreferenciasState extends Preferencias {
  aplicar: (preferencias: Partial<Preferencias>) => void;
}

function idiomaDelNavegador(): Idioma {
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt-PT' : 'es';
}

/**
 * Idioma y tema en uso. Con sesión vienen del usuario (spec preferencias); sin sesión se usan
 * los últimos de este dispositivo o, la primera vez, el idioma del navegador.
 */
export const usePreferenciasStore = create<PreferenciasState>()(
  persist(
    (set) => ({
      idioma: idiomaDelNavegador(),
      tema: 'claro',
      aplicar: (preferencias) => set(preferencias),
    }),
    {
      name: 'minho-gloss-preferencias',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ idioma, tema }) => ({ idioma, tema }),
    },
  ),
);

function reflejarEnDocumento({ idioma, tema }: Preferencias): void {
  document.documentElement.lang = idioma;
  document.documentElement.classList.toggle('dark', tema === 'oscuro');
}

/** Aplica el idioma y el tema al documento ahora y cada vez que cambien. */
export function iniciarPreferencias(): void {
  reflejarEnDocumento(usePreferenciasStore.getState());
  usePreferenciasStore.subscribe(reflejarEnDocumento);
}
