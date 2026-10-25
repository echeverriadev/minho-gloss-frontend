import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Shared/Badge',
  component: Badge,
  args: { children: 'Empleado' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {};
export const Brand: Story = { args: { tone: 'brand', children: 'Administrador' } };
export const Success: Story = { args: { tone: 'success', children: 'Acepta contacto' } };
export const Warning: Story = { args: { tone: 'warning', children: 'Sin contacto' } };
export const Danger: Story = { args: { tone: 'danger', children: 'Inactivo' } };
