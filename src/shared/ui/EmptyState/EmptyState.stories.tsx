import type { Meta, StoryObj } from '@storybook/react-vite';
import { Users } from 'lucide-react';
import { Button } from '../Button/Button';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Shared/EmptyState',
  component: EmptyState,
  args: { icon: Users, title: 'Aún no hay clientes' },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SoloMensaje: Story = {};

export const ConAccion: Story = {
  args: {
    description: 'Registra al primer cliente para empezar.',
    action: <Button>Agregar cliente</Button>,
  },
};
