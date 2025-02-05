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
  const { register, watch, setValue } = useForm<{ toppings: string[] }>({ defaultValues: { toppings: [] } });
  const allToppings = ['Skinka', 'Ost', 'Tomat'];
  const pickToppings = watch('toppings');

  const handleChangeAll = () => {
    if (allToppings.every((topping) => pickToppings.includes(topping))) {
      setValue('toppings', []);
    } else {
      setValue('toppings', allToppings);
    }
  };

  const isIndeterminate = pickToppings.length > 0 && !allToppings.every((topping) => pickToppings.includes(topping));

  return (
    <div className="flex flex-col">
      <FormControl fieldset>
        <FormLabel>Pålägg</FormLabel>
        <Checkbox checked={pickToppings.length > 0} onChange={handleChangeAll} indeterminate={isIndeterminate}>
          Alla
        </Checkbox>
        {allToppings.map((topping) => (
          <Checkbox key={topping} {...register('toppings')} value={topping}>
            {topping}
          </Checkbox>
        ))}
      </FormControl>
    </div>
  );
};

export const Inaktiverad = () => {
  const { register, watch} = useForm<{ toppings: string[] }>({ defaultValues: { toppings: [] } });
  const allToppings = ['Skinka', 'Ost', 'Tomat'];
  const pickToppings = watch('toppings');


  return (
      <div className="flex space-x-12">
        <Checkbox disabled>First</Checkbox>
        <Checkbox defaultChecked disabled>Second</Checkbox>
        <Checkbox readOnly>First</Checkbox>
        <Checkbox defaultChecked readOnly>Second</Checkbox>
      </div>
  );
};
