import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Checkbox, CheckboxProps } from '../src/checkbox';
import { FormControl, FormLabel } from '../src';
import { useForm } from 'react-hook-form';
import { expect, fn, userEvent, within } from '@storybook/test';

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

type Story = StoryObj<typeof Checkbox>;

export const ToggleTest: Story = {
  name: 'Test: Toggle',
  tags: ['dev-only', '!autodocs'],
  args: {
    children: 'Accept terms',
    onChange: fn(),
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Accept terms' });

    await step('Checkbox is unchecked initially', async () => {
      await expect(checkbox).not.toBeChecked();
    });

    await step('Click to check', async () => {
      await userEvent.click(checkbox);
      await expect(checkbox).toBeChecked();
      await expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await step('Click to uncheck', async () => {
      await userEvent.click(checkbox);
      await expect(checkbox).not.toBeChecked();
      await expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  },
};

export const DisabledTest: Story = {
  name: 'Test: Disabled',
  tags: ['dev-only', '!autodocs'],
  args: {
    children: 'Disabled checkbox',
    disabled: true,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Disabled checkbox' });

    await expect(checkbox).toBeDisabled();
    await userEvent.click(checkbox);
    await expect(args.onChange).not.toHaveBeenCalled();
  },
};

export const KeyboardTest: Story = {
  name: 'Test: Keyboard',
  tags: ['dev-only', '!autodocs'],
  args: {
    children: 'Keyboard checkbox',
    onChange: fn(),
  },
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: 'Keyboard checkbox' });

    await step('Focus with Tab', async () => {
      await userEvent.tab();
      await expect(checkbox).toHaveFocus();
    });

    await step('Press Space to check', async () => {
      await userEvent.keyboard(' ');
      await expect(checkbox).toBeChecked();
      await expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await step('Press Space to uncheck', async () => {
      await userEvent.keyboard(' ');
      await expect(checkbox).not.toBeChecked();
    });
  },
};

export const SizesTest: Story = {
  name: 'Test: Sizes',
  tags: ['dev-only', '!autodocs'],
  render: () => (
    <div className="flex gap-4 items-center">
      <Checkbox size="sm">Small</Checkbox>
      <Checkbox size="md">Medium</Checkbox>
      <Checkbox size="lg">Large</Checkbox>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Small checkbox has correct class', async () => {
      const smCheckbox = canvas.getByRole('checkbox', { name: 'Small' });
      await expect(smCheckbox).toHaveClass('sk-form-checkbox-sm');
    });

    await step('Medium checkbox has correct class', async () => {
      const mdCheckbox = canvas.getByRole('checkbox', { name: 'Medium' });
      await expect(mdCheckbox).toHaveClass('sk-form-checkbox-md');
    });

    await step('Large checkbox has correct class', async () => {
      const lgCheckbox = canvas.getByRole('checkbox', { name: 'Large' });
      await expect(lgCheckbox).toHaveClass('sk-form-checkbox-lg');
    });
  },
};
