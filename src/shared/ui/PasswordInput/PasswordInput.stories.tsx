import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordInput } from './PasswordInput';

const meta = {
  title: 'Shared/PasswordInput',
  component: PasswordInput,
  args: { label: 'Contraseña', autoComplete: 'current-password' },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const ConError: Story = {
  args: { error: 'La contraseña debe tener al menos 8 caracteres', defaultValue: '123' },
};

export const Deshabilitado: Story = { args: { disabled: true } };
