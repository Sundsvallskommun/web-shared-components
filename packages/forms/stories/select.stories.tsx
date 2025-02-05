import { Meta } from '@storybook/react';
import { Select, SelectProps } from '../src';

export default {
  title: 'Komponenter/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
  },
} as Meta<typeof Select>;

const people = [
  { id: '1', name: 'Durward Reynolds', unavailable: false },
  { id: '2', name: 'Kenton Towne', unavailable: false },
  { id: '3', name: 'Therese Wunsch', unavailable: false },
  { id: '4', name: 'Benedict Kessler', unavailable: true },
  { id: '5', name: 'Katelyn Rohan', unavailable: false },
];

export const Template = (args: SelectProps) => {
  return (
    <Select {...args}>
      {people.map((person) => (
        <Select.Option key={person.id} value={person.id}>
          {person.name}
        </Select.Option>
      ))}
    </Select>
  );
};

Template.storyName = 'Select';

export const Inaktiverad = () => (
  <div className="flex space-x-12">
  <Select disabled>
    <Select.Option>Option 1</Select.Option>
    <Select.Option>Option 2</Select.Option>
    <Select.Option>Option 3</Select.Option>
  </Select>
    <Select readOnly>
    <Select.Option>Option 1</Select.Option>
    <Select.Option>Option 2</Select.Option>
    <Select.Option>Option 3</Select.Option>
  </Select>
  </div>
);

export const Invaliderad = () => (
  <div className="flex flex-col gap-8">
    <Select invalid>
      <Select.Option>Option 1</Select.Option>
      <Select.Option>Option 2</Select.Option>
      <Select.Option>Option 3</Select.Option>
    </Select>
    <Select>
      <Select.Option>Option 1</Select.Option>
      <Select.Option>Option 2</Select.Option>
      <Select.Option>Option 3</Select.Option>
    </Select>
  </div>
);

export const Storlekar = () => (
  <div className="flex gap-16">
    <Select size="sm">
      <Select.Option>Option 1</Select.Option>
      <Select.Option>Option 2</Select.Option>
      <Select.Option>Option 3</Select.Option>
    </Select>

    <Select size="md">
      <Select.Option>Option 1</Select.Option>
      <Select.Option>Option 2</Select.Option>
      <Select.Option>Option 3</Select.Option>
    </Select>

    <Select size="lg">
      <Select.Option>Option 1</Select.Option>
      <Select.Option>Option 2</Select.Option>
      <Select.Option>Option 3</Select.Option>
    </Select>
  </div>
);

export const Grupp = () => (
  <div className="flex gap-16">
    <Select>
      <Select.Optgroup label="Grupp 1"></Select.Optgroup>
      <Select.Option>Option 1</Select.Option>
      <Select.Option>Option 2</Select.Option>
      <Select.Option>Option 3</Select.Option>

      <Select.Optgroup label="Grupp 2"></Select.Optgroup>
      <Select.Option>Option 1</Select.Option>
      <Select.Option>Option 2</Select.Option>
      <Select.Option>Option 3</Select.Option>
    </Select>
  </div>
);
