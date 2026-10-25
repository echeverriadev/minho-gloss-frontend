import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ErrorState } from './ErrorState';

const meta = {
  title: 'Shared/ErrorState',
  component: ErrorState,
  args: { message: 'No hay conexión con el servidor', onRetry: fn() },
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConReintento: Story = {};

export const SinReintento: Story = {
  args: { onRetry: undefined, message: 'Cliente no encontrado' },
};
