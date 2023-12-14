import { Meta } from '@storybook/react';
import React from 'react';
import { Checkbox, CheckboxProps } from '../src/checkbox';
import { FormControl, FormLabel } from '../src';
import { useForm } from 'react-hook-form';

export default {
  title: 'Komponenter/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} as Meta<typeof Checkbox>;

export const Template = (args: CheckboxProps) => (
  <div className="space-x-8">
    <Checkbox {...args}>Checkbox</Checkbox>
  </div>
);

Template.storyName = 'Checkbox';

export const ExampleWithForm = () => {
  const { register } = useForm<{ toppings: string[] }>();
  const allToppings = ['Skinka', 'Ost', 'Tomat'];

  return (
    <div className="flex flex-col">
      <FormControl fieldset>
        <FormLabel>Pålägg</FormLabel>
        {allToppings.map((topping) => (
          <Checkbox key={topping} {...register('toppings')} value={topping}>
            {topping}
          </Checkbox>
        ))}
      </FormControl>
    </div>
  );
};
