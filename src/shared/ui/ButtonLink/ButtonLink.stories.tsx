import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserPlus } from 'lucide-react';
import { MemoryRouter } from 'react-router';
import { ButtonLink } from './ButtonLink';

const meta = {
  title: 'Shared/ButtonLink',
  component: ButtonLink,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    to: '/clientes/nuevo',
    children: (
      <>
        <UserPlus className="size-5" aria-hidden />
        Agregar cliente
      </>
    ),
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'Editar' } };
