import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Shared/Select',
  component: Select,
  args: {
    label: 'Rol',
    options: [
      { value: 'empleado', label: 'Empleado' },
      { value: 'admin', label: 'Administrador' },
    ],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const ConError: Story = { args: { error: 'El rol debe ser admin o empleado' } };

export const Deshabilitado: Story = { args: { disabled: true } };
