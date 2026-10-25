import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ConfirmDialog } from './ConfirmDialog';

const meta = {
  title: 'Shared/ConfirmDialog',
  component: ConfirmDialog,
  args: {
    isOpen: true,
    title: '¿Dar de baja a José Pérez?',
    description: 'Dejará de aparecer en la lista. Su historial de servicios se conserva.',
    confirmLabel: 'Dar de baja',
    onConfirm: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const ConTextoDeConfirmacion: Story = {
  args: {
    title: 'Borrar datos personales',
    description: 'Esta acción es irreversible.',
    confirmLabel: 'Borrar datos',
    confirmText: 'José Pérez',
  },
};

export const Cargando: Story = { args: { isLoading: true } };
