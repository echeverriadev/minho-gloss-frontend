import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta = {
  title: 'Shared/Textarea',
  component: Textarea,
  args: { label: 'Notas', hint: 'Opcional, hasta 500 caracteres' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const ConError: Story = {
  args: { error: 'Las notas no pueden superar los 500 caracteres' },
};

export const Deshabilitado: Story = { args: { disabled: true } };
