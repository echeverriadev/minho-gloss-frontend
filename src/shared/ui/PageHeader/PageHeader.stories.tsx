import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Shared/PageHeader',
  component: PageHeader,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: { title: 'Clientes' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Principal: Story = {};
export const ConVolver: Story = {
  args: { title: 'Nuevo cliente', backTo: '/clientes', backLabel: 'Volver a clientes' },
};
