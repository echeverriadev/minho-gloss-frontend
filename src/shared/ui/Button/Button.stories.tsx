import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus } from 'lucide-react';
import { Button } from './Button';

const meta = {
  title: 'Shared/Button',
  component: Button,
  args: { children: 'Guardar' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancelar' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Dar de baja' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ver más' },
};

export const ConIcono: Story = {
  args: {
    children: (
      <>
        <Plus className="size-5" aria-hidden />
        Agregar cliente
      </>
    ),
  },
};

export const Cargando: Story = {
  args: { isLoading: true },
};

export const Deshabilitado: Story = {
  args: { disabled: true },
};

export const AnchoCompleto: Story = {
  args: { fullWidth: true },
};
