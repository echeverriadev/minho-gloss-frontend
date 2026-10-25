import { create } from 'zustand';

export type ToastTipo = 'success' | 'error';

export interface ToastItem {
  id: number;
  tipo: ToastTipo;
  mensaje: string;
}

interface ToastState {
  toasts: ToastItem[];
  mostrar: (tipo: ToastTipo, mensaje: string) => void;
  cerrar: (id: number) => void;
}

const DURACION_MS = 4000;
let siguienteId = 1;

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  mostrar: (tipo, mensaje) => {
    const id = siguienteId++;
    set({ toasts: [...get().toasts, { id, tipo, mensaje }] });
    setTimeout(() => get().cerrar(id), DURACION_MS);
  },
  cerrar: (id) => set({ toasts: get().toasts.filter((toast) => toast.id !== id) }),
}));

/** Atajos para mostrar avisos desde cualquier pantalla. */
export const toast = {
  success: (mensaje: string) => useToastStore.getState().mostrar('success', mensaje),
  error: (mensaje: string) => useToastStore.getState().mostrar('error', mensaje),
};
