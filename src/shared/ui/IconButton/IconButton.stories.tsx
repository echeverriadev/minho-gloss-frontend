import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pencil, Trash2 } from 'lucide-react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Shared/IconButton',
  component: IconButton,
  args: { 'aria-label': 'Editar', icon: <Pencil className="size-5" aria-hidden /> },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};

export const Secondary: Story = { args: { variant: 'secondary' } };

export const Danger: Story = {
  args: {
    variant: 'danger',
    'aria-label': 'Eliminar',
    icon: <Trash2 className="size-5" aria-hidden />,
  },
};

export const Deshabilitado: Story = { args: { disabled: true } };
