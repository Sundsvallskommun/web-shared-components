import React from 'react';
import { Calendar, CalendarProps } from '../src';
import { useState } from 'react';

export default {
  title: 'Komponenter/Kalender/Komponent',
  component: Calendar,
  tags: ['autodocs'],
};

export const Template = (args: CalendarProps) => {
  const [val, setVal] = useState<string>(args.value);
  return (
    <Calendar
      {...args}
      value={val}
      onChange={(value: string) => {
        console.log(value);
        setVal(value);
      }}
    />
  );
};

Template.storyName = 'Calendar';
