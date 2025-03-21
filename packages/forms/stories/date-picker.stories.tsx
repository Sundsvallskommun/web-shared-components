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
  return <DatePicker aria-label="Välj datum" {...args} />;
};

Template.storyName = 'DatePicker';

export const Disabled = () => (
  <div>
    <DatePicker disabled aria-label="Välj datum" />
  </div>
);
Disabled.storyName = 'Inaktiverad';

export const Invalid = () => (
  <div>
    <div className="flex gap-16">
      <DatePicker invalid aria-label="Välj datum" />
    </div>
  </div>
);
Invalid.storyName = 'Invaliderad';

export const Storlekar = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <DatePicker size="sm" aria-label="Välj datum" />
      <DatePicker size="md" aria-label="Välj datum" />
      <DatePicker size="lg" aria-label="Välj datum" />
    </div>
  </div>
);

export const Datum = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input size="sm" type="date" aria-label="Välj datum" />
      <Input size="md" type="date" aria-label="Välj datum" />
      <Input size="lg" type="date" aria-label="Välj datum" />
    </div>
  </div>
);

export const Tid = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input size="sm" type="time" aria-label="Välj tid" />
      <Input size="md" type="time" aria-label="Välj tid" />
      <Input size="lg" type="time" aria-label="Välj tid" />
    </div>
  </div>
);

export const DatumTid = () => (
  <div className="flex flex-col gap-16">
    <div className="flex gap-16">
      <Input size="sm" type="datetime-local" aria-label="Välj datum och tid" />
      <Input size="md" type="datetime-local" aria-label="Välj datum och tid" />
      <Input size="lg" type="datetime-local" aria-label="Välj datum och tid" />
    </div>
  </div>
);

export const WithForms = () => {
  const { register, watch } = useForm<{ date: string }>();

  const date = watch('date');

  React.useEffect(() => {
    console.log(date);
  }, [date]);

  return <DatePicker aria-label="Välj datum" {...register('date')} />;
};
