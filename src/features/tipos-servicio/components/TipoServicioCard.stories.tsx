import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TipoServicioCard } from './TipoServicioCard';

const BASE = {
  id: '1',
  orden: 1,
  activo: true,
  createdAt: '2026-10-25T10:00:00.000Z',
  updatedAt: '2026-10-25T10:00:00.000Z',
};

const meta = {
  title: 'TiposServicio/TipoServicioCard',
  component: TipoServicioCard,
  args: {
    onEditar: fn(),
    onDarDeBaja: fn(),
    tipo: {
      ...BASE,
      nombre: 'FULL GLOSS',
      descripcion: 'Lavagem completa do veículo',
      categoria: 'servicio',
      modoPrecio: 'por-vehiculo',
      precios: { ligeiro: 2500, suv: 3000, monovolume: 3500, carrinha: 4000 },
      precioUnico: null,
    },
  },
} satisfies Meta<typeof TipoServicioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SegunVehiculo: Story = {};

export const PrecioUnico: Story = {
  args: {
    tipo: {
      ...BASE,
      nombre: 'Higienização com ozono',
      descripcion: null,
      categoria: 'extra',
      modoPrecio: 'unico',
      precios: null,
      precioUnico: 1000,
    },
  },
};

export const Inactivo: Story = {
  args: {
    tipo: {
      ...BASE,
      activo: false,
      nombre: 'PREMIUM GLOSS',
      descripcion: 'Limpeza detalhada do veículo',
      categoria: 'servicio',
      modoPrecio: 'por-vehiculo',
      precios: { ligeiro: 6000, suv: 6500, monovolume: 7000, carrinha: 7500 },
      precioUnico: null,
    },
  },
};
