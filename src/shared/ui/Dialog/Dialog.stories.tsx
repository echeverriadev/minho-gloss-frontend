import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Dialog } from './Dialog';

const meta = {
  title: 'Shared/Dialog',
  component: Dialog,
  args: {
    isOpen: true,
    title: 'Agregar usuario',
    onClose: fn(),
    children: <p>Contenido del formulario</p>,
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Abierto: Story = {};
