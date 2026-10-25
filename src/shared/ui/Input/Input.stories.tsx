import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Shared/Input',
  component: Input,
  args: { label: 'Teléfono celular', placeholder: '912 345 678', inputMode: 'tel' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const ConAyuda: Story = { args: { hint: 'Sin código de país se asume +351' } };

export const ConError: Story = {
  args: { error: 'El teléfono no es válido', defaultValue: '12' },
};

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: '912 345 678' } };
