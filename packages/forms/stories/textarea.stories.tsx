import { Meta } from '@storybook/react';
import React, { useEffect } from 'react';
import { FormControl, FormLabel, Textarea, TextareaProps } from '../src';
import { useForm } from 'react-hook-form';
import Button from '@sk-web-gui/button';

export default {
  title: 'Komponenter/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} as Meta<typeof Textarea>;

export const Template = (args: TextareaProps) => <Textarea {...args} placeholder="Beskriv ditt ärende..." />;

Template.storyName = 'Textarea';

export const Disabled = () => <Textarea disabled placeholder="Beskriv ditt ärende..." />;

export const Readonly = () => <Textarea readOnly placeholder="Beskriv ditt ärende..." />;

export const Invalid = () => <Textarea invalid placeholder="Beskriv ditt ärende..." />;

export const Counter = () => (
  <Textarea
    placeholder="Beskriv ditt ärende..."
    color="secondary"
    showCount={true}
    maxLength={50}
    maxLengthWarningText="Some text"
  />
);

Template.argTypes = {
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
  rows: {
    type: { name: 'string', required: false },
    description: 'Sets number of rows showm',
    table: {
      defaultValue: { summary: 'unset' },
    },
    control: 'number',
    defaultValue: 1,
  },
};

export const WithUseForm = () => {
  const { register, watch, reset } = useForm<{ message: string }>({
    defaultValues: {
      message: 'Laddar data',
    },
  });

  const message = watch('message');
  useEffect(() => {
    console.log('message: ', message);
  }, [message]);

  useEffect(() => {
    setTimeout(() => {
      reset({
        message: 'Det här är ett meddelande',
      });
    }, 1000);
  }, []);

  return (
    <FormControl>
      <FormLabel>Meddelande</FormLabel>
      <Textarea {...register('message')} showCount maxLength={150} />
      <Button variant="secondary" onClick={() => reset({ message: 'Meddelande återställt' })}>
        Reset
      </Button>
    </FormControl>
  );
};
