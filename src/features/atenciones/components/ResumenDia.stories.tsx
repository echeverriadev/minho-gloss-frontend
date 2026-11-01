import type { Meta, StoryObj } from '@storybook/react-vite';
import { ResumenDia } from './ResumenDia';

const meta = {
  title: 'Atenciones/ResumenDia',
  component: ResumenDia,
  args: { titulo: 'Hoy', resumen: { cantidad: 14, total: 41500 }, mostrarTotal: true },
} satisfies Meta<typeof ResumenDia>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Admin: Story = {};

export const Empleado: Story = { args: { mostrarTotal: false } };

export const SinAtenciones: Story = { args: { resumen: { cantidad: 0, total: 0 } } };
