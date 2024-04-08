import { Meta } from '@storybook/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, RadioButton } from '../src';

export default {
  title: 'Komponenter/RadioButton/RadioButton.Group',
  component: RadioButton.Group,
  tags: ['autodocs'],
} as Meta<typeof RadioButton.Group>;

export const Template = (args: React.ComponentProps<typeof RadioButton.Group>) => (
  <div className="flex flex-col space-y-4">
    <RadioButton.Group {...args}>
      <RadioButton value="1" name="sk-example">
        Exempel 1
      </RadioButton>
      <RadioButton value="2" name="sk-example">
        Exempel 2
      </RadioButton>
      <RadioButton value="3" name="sk-example">
        Exempel 3
      </RadioButton>
    </RadioButton.Group>
  </div>
);

Template.storyName = 'Grupp';

export const ExampleWithForm = () => {
  const { register, watch } = useForm<{ topping: string }>();
  const allToppings = ['Skinka', 'Ost', 'Tomat'];

  const value = watch().topping;

  useEffect(() => {
    console.log('value', value);
  }, [value]);

  return (
    <FormControl fieldset>
      <FormLabel>Pålägg</FormLabel>
      <RadioButton.Group>
        {allToppings.map((topping) => (
          <RadioButton key={topping} {...register('topping')} value={topping}>
            {topping}
          </RadioButton>
        ))}
      </RadioButton.Group>
    </FormControl>
  );
};
