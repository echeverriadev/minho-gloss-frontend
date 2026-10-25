import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './Field';
import { inputClasses, inputStateClasses } from './fieldClasses';

const meta = {
  title: 'Shared/Field',
  component: Field,
  args: {
    id: 'campo',
    label: 'Dirección',
    children: <input id="campo" className={`${inputClasses} ${inputStateClasses()}`} />,
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const ConAyuda: Story = { args: { hint: 'Calle, número, código postal y ciudad' } };

export const ConError: Story = {
  args: {
    error: 'La dirección debe tener entre 5 y 200 caracteres',
    children: (
      <input id="campo" aria-invalid className={`${inputClasses} ${inputStateClasses('x')}`} />
    ),
  },
};
