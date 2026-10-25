import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Shared/Checkbox',
  component: Checkbox,
  args: { label: 'Acepta recibir recordatorios por WhatsApp, llamada o correo' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const Marcado: Story = { args: { defaultChecked: true } };

export const ConError: Story = { args: { error: 'Debes indicar si acepta el contacto' } };

export const Deshabilitado: Story = { args: { disabled: true } };
