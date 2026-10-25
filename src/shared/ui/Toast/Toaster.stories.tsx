import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { toast } from './store';
import { Toaster } from './Toaster';

const meta = {
  title: 'Shared/Toast',
  component: Toaster,
  render: () => (
    <div className="flex gap-2">
      <Button onClick={() => toast.success('Cliente guardado')}>Aviso de éxito</Button>
      <Button variant="danger" onClick={() => toast.error('No se pudo guardar el cliente')}>
        Aviso de error
      </Button>
      <Toaster />
    </div>
  ),
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
