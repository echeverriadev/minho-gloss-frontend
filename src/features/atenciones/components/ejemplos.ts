import type { Atencion } from '../types';

/** Atención de ejemplo para las historias de Storybook. */
export const ATENCION_EJEMPLO: Atencion = {
  id: '652f1c2b9d1e8a0012345678',
  numero: 128,
  cliente: {
    id: '652f1c2b9d1e8a0012345679',
    nombre: 'Ana',
    apellido: 'Silva',
    cedula: '123456789',
    telefono: '+351912345678',
    email: 'ana.silva@example.com',
  },
  tipoVehiculo: 'suv',
  placa: 'AA12BB',
  items: [
    {
      tipoServicioId: '652f1c2b9d1e8a0012345680',
      nombre: 'FULL GLOSS',
      categoria: 'servicio',
      precioLista: 3000,
      precio: 2500,
    },
    {
      tipoServicioId: '652f1c2b9d1e8a0012345681',
      nombre: 'Higienização com ozono',
      categoria: 'extra',
      precioLista: 1500,
      precio: 1500,
    },
    {
      tipoServicioId: null,
      nombre: 'Limpieza de llantas',
      categoria: 'personalizado',
      precioLista: null,
      precio: 800,
    },
  ],
  total: 4800,
  metodoPago: 'mbway',
  realizadoEn: '2026-10-25T10:30:00.000Z',
  registradoPor: { id: '652f1c2b9d1e8a0012345682', nombre: 'Rui' },
  notas: null,
  estado: 'completada',
  anulacion: null,
  createdAt: '2026-10-25T10:30:00.000Z',
  updatedAt: '2026-10-25T10:30:00.000Z',
};
