import { Meta } from '@storybook/react';
import React, { useEffect } from 'react';
import { Checkbox } from '../src/checkbox';
import { FormControl, FormLabel } from '../src';
import { useForm } from 'react-hook-form';

export default {
  title: 'Komponenter/Checkbox/Checkbox.Group',
  component: Checkbox.Group,
  tags: ['autodocs'],
} as Meta<typeof Checkbox.Group>;

export const Template = (args: React.ComponentProps<typeof Checkbox.Group>) => (
  <Checkbox.Group {...args} defaultValue={['one', 'three']}>
    <Checkbox value="one" onChange={(e) => console.log(e)}>
      One
    </Checkbox>
    <Checkbox value="two">Two</Checkbox>
    <Checkbox value="three">Three</Checkbox>
  </Checkbox.Group>
);

Template.storyName = 'Checkbox.Group';

export const ExampleWithForm = () => {
  const { register, watch } = useForm<{ toppings: string[] }>();
  const allToppings = ['Skinka', 'Ost', 'Tomat'];

  const value = watch().toppings;

  useEffect(() => {
    console.log('value', value);
  }, [value]);

  return (
    <FormControl fieldset>
      <FormLabel>Pålägg</FormLabel>
      <Checkbox.Group>
        {allToppings.map((topping) => (
          <Checkbox key={topping} {...register('toppings')} value={topping}>
            {topping}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </FormControl>
  );
};

export const ExampleWithState = () => {
  const allToppings = ['Skinka', 'Ost', 'Tomat'];
  const [value, setValue] = React.useState<Array<React.ComponentProps<typeof Checkbox.Component>['value']>>([]);

  return (
    <FormControl fieldset>
      <FormLabel>Pålägg</FormLabel>
      <Checkbox.Group value={value} onChange={setValue}>
        {allToppings.map((topping) => (
          <Checkbox key={topping} value={topping}>
            {topping}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </FormControl>
  );
};

export const ExampleWithIndeterminate = () => {
  const allToppings = ['Skinka', 'Ost', 'Tomat'];
  const [value, setValue] = React.useState<Array<React.ComponentProps<typeof Checkbox.Component>['value']>>([]);

  const indeterminate =
    allToppings.some((topping) => value.includes(topping)) && !allToppings.every((topping) => value.includes(topping));

  const handleChange = () => {
    if (value.length === allToppings.length) {
      setValue([]);
    } else {
      setValue(allToppings);
    }
  };

  return (
    <FormControl fieldset>
      <FormLabel>Pålägg</FormLabel>
      <Checkbox.Group value={value} onChange={setValue}>
        <Checkbox value="" checked={value.length > 0} indeterminate={indeterminate} onChange={handleChange}>
          Alla
        </Checkbox>
        {allToppings.map((topping) => (
          <Checkbox key={topping} value={topping}>
            {topping}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </FormControl>
  );
};
