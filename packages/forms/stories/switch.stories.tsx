import { FormControl, FormLabel } from '../src';
import { Switch, SwitchProps } from '../src/switch';
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';
import React from 'react';

export default {
  title: 'Komponenter/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    disabled: false,
  },
} as Meta;

export const Template = (args: SwitchProps) => (
  <div>
    <Switch aria-label="Aktivera" {...args}></Switch>
  </div>
);

Template.storyName = 'Switch';

interface Lamps {
  bedroom: boolean;
  kitchen: boolean;
}

export const WithForm = () => {
  const { register, watch, setValue } = useForm<Lamps>({ defaultValues: { kitchen: true, bedroom: false } });
  const allLamps = Object.values(watch()).some((value) => value === true);

  const handleAll = () => {
    if (allLamps) {
      setValue('kitchen', false);
      setValue('bedroom', false);
    } else {
      setValue('kitchen', true);
      setValue('bedroom', true);
    }
  };
  return (
    <div>
      <FormControl fieldset>
        <FormLabel>Lampor</FormLabel>
        <Switch color="gronsta" checked={allLamps} onChange={handleAll}>
          Alla lampor
        </Switch>
        <Switch color="gronsta" {...register('kitchen')}>
          Kök
        </Switch>
        <Switch color="gronsta" {...register('bedroom')}>
          Sovrum
        </Switch>
      </FormControl>
    </div>
  );
};
