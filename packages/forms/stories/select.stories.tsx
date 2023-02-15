import React, { useState } from 'react';
import { Select } from '../src';

export default {
  title: 'Komponenter/Dropdown/Komponent',
  component: Select,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

export const Template = (args: any) => {
  const [selectedValue, setSelectedValue] = useState<{ label: string; data: any }>();
  const [selectedValues, setSelectedValues] = useState<{ label: string; data: any }[]>([]);
  return (
    <div className="h-80">
      <button
        className="mb-md"
        onClick={() =>
          args.multiple
            ? setSelectedValues([{ label: people[1].name, data: people[1] }])
            : setSelectedValue({ label: people[1].name, data: people[1] })
        }
      >
        Välj Kenton Towne
      </button>
      <Select
        {...args}
        onChange={(e) => {
          console.log('onchange on select:', e);
        }}
        value={args.multiple ? selectedValues : selectedValue}
        // dropDownIcon={<ArrowForwardIosOutlinedIcon className="!text-xl rotate-90" />}
      >
        {people.map((person, index) => (
          <Select.Option disabled={index === 2} key={person.id} value={{ label: person.name, data: person }} />
        ))}
      </Select>
    </div>
  );
};

Template.argTypes = {
  value: {
    type: { name: 'string', required: false },
    description: 'Sets value',
    table: {
      value: { summary: '' },
    },
    defaultValue: '',
  },
  placeholder: {
    type: { name: 'string', required: false },
    description: 'Sets placeholder',
    table: {
      defaultValue: { summary: '' },
    },
    defaultValue: 'Placeholder',
  },
  'aria-label': {
    type: { name: 'string', required: false },
    description: 'Sets aria-label',
    table: {
      defaultValue: { summary: '' },
    },
    defaultValue: 'Välj alternativ',
  },
  required: {
    type: { name: 'boolean', required: false },
    description: 'Sets required',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  invalid: {
    type: { name: 'boolean', required: false },
    description: 'Sets invalid',
    table: {
      defaultValue: { summary: undefined },
    },
    control: 'boolean',
    defaultValue: undefined,
  },
  disabled: {
    type: { name: 'boolean', required: false },
    description: 'Sets disabled',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  multiple: {
    type: { name: 'boolean', required: false },
    description: 'Sets if multichoice',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  size: {
    type: { name: 'string', required: false },
    description: 'Sets size',
    table: {
      defaultValue: { summary: 'md' },
    },
    options: ['sm', 'md', 'lg'],
    control: 'select',
    defaultValue: 'md',
  },
};

Template.storyName = 'Komponent';

export const Disabled = () => (
  <Select onChange={() => {}} disabled placeholder="Outline">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const Invalid = () => (
  <Select onChange={() => {}} invalid placeholder="Outline">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const Colored = () => (
  <Select onChange={() => {}} placeholder="Outline" color="orange">
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 3</option>
  </Select>
);

export const Size = () => (
  <div className="flex space-x-2">
    <Select onChange={() => {}} placeholder="Outline" size="sm">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>

    <Select onChange={() => {}} placeholder="Outline" size="md">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>

    <Select onChange={() => {}} placeholder="Outline" size="lg">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </Select>
  </div>
);
