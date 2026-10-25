import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MoneyInput } from './MoneyInput';

const meta = {
  title: 'Shared/MoneyInput',
  component: MoneyInput,
  args: { label: 'Precio cobrado', value: 1500, onChange: fn() },
} satisfies Meta<typeof MoneyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const Vacio: Story = { args: { value: null } };

export const ConError: Story = { args: { error: 'El precio no puede ser negativo' } };

export const Deshabilitado: Story = { args: { disabled: true } };
