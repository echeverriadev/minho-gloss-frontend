import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { ClienteCard } from './ClienteCard';

const meta = {
  title: 'Clientes/ClienteCard',
  component: ClienteCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    cliente: {
      id: '652f1c2b9d1e8a0012345678',
      nombre: 'José',
      apellido: 'Pérez',
      telefono: '+351912345678',
      cedula: '123456789ZZ4',
    },
  },
} satisfies Meta<typeof ClienteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NombreLargo: Story = {
  args: {
    cliente: {
      id: '652f1c2b9d1e8a0012345679',
      nombre: 'María de los Ángeles',
      apellido: 'Fernandes da Silva Gonçalves',
      telefono: '+34612345678',
      cedula: 'X1234567L',
    },
  },
};
