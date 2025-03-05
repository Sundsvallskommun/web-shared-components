import React from 'react';
import { Input } from '../src';
import { Meta } from '@storybook/react';
import { DatePicker, DatePickerProps } from '../src/date-picker/date-picker';
import { useForm } from 'react-hook-form';

export default {
  title: 'Komponenter/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} as Meta<typeof DatePicker>;

export const Template = (args: DatePickerProps) => {
  return <DatePicker {...args} />;
};

Template.storyName = 'DatePicker';

export const Disabled = () => (
  <div>
    <DatePicker disabled />
  </div>
);
Disabled.storyName = 'Inaktiverad';

export const Invalid = () => (
  <div>
    <div className="flex gap-16">
      <DatePicker invalid />
    </div>
  </div>
);
Invalid.storyName = 'Invaliderad';

export const Storlekar = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <DatePicker size="sm" />
      <DatePicker size="md" />
      <DatePicker size="lg" />
    </div>
  </div>
);

export const Datum = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input size="sm" type="date" aria-label="datepicker" />
      <Input size="md" type="date" aria-label="datepicker" />
      <Input size="lg" type="date" aria-label="datepicker" />
    </div>
  </div>
);

export const Tid = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input size="sm" type="time" aria-label="datepicker" />
      <Input size="md" type="time" aria-label="datepicker" />
      <Input size="lg" type="time" aria-label="datepicker" />
    </div>
  </div>
);

export const DatumTid = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input size="sm" type="datetime-local" aria-label="datepicker" />
      <Input size="md" type="datetime-local" aria-label="datepicker" />
      <Input size="lg" type="datetime-local" aria-label="datepicker" />
    </div>
  </div>
);

export const WithForms = () => {
  const { register, watch } = useForm<{ date: string }>();

  const date = watch('date');

  React.useEffect(() => {
    console.log(date);
  }, [date]);

  return <DatePicker {...register('date')} />;
};
