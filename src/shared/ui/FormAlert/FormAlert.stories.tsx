import type { Meta, StoryObj } from '@storybook/react-vite';
import { FormAlert } from './FormAlert';

const meta = {
  title: 'Shared/FormAlert',
  component: FormAlert,
  args: { tipo: 'error', children: 'Correo o contraseña incorrectos' },
} satisfies Meta<typeof FormAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {};
export const Exito: Story = {
  args: { tipo: 'success', children: 'Te enviamos un enlace para elegir una contraseña nueva.' },
};
export const Informacion: Story = {
  args: { tipo: 'info', children: 'Tu sesión venció, inicia sesión de nuevo' },
};
