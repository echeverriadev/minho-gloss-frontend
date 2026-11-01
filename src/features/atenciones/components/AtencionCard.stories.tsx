import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { AtencionCard } from './AtencionCard';
import { ATENCION_EJEMPLO } from './ejemplos';

const meta = {
  title: 'Atenciones/AtencionCard',
  component: AtencionCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: { atencion: ATENCION_EJEMPLO },
} satisfies Meta<typeof AtencionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SinCliente: Story = {
  args: { atencion: { ...ATENCION_EJEMPLO, cliente: null, placa: null } },
};

export const ConFecha: Story = { args: { conFecha: true } };

export const Anulada: Story = {
  args: {
    atencion: {
      ...ATENCION_EJEMPLO,
      estado: 'anulada',
      anulacion: {
        motivo: 'Registrada dos veces',
        anuladoPor: { id: '1', nombre: 'Admin' },
        anuladoEn: '2026-10-25T12:00:00.000Z',
      },
    },
  },
};
