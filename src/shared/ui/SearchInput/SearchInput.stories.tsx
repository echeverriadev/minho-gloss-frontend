import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Shared/SearchInput',
  component: SearchInput,
  args: {
    label: 'Buscar clientes',
    placeholder: 'Nombre, cédula o teléfono',
    value: '',
    onChange: fn(),
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vacio: Story = {};

export const ConTexto: Story = { args: { value: 'jose' } };

export const Deshabilitado: Story = { args: { disabled: true } };
