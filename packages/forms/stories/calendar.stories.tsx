import React from 'react';
import { InputProps, Calendar } from '../src';
import dayjsLocale from 'dayjs/locale/sv';
import { useState } from 'react';

export default {
  title: 'Komponenter/Kalender/Komponent',
  component: Calendar,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = (args: any) => {
  const [val, setVal] = useState(args.value);
  return (
    <Calendar
      {...args}
      value={val}
      onChange={(value: any) => {
        console.log(value);
        setVal(value);
      }}
      // localeInstance={args.localeInstance}
    />
  );
};

Template.argTypes = {
  value: {
    type: { name: 'string', required: true },
    description: 'Sets value',
    defaultValue: '2022-07-15',
  },
  onChange: {
    type: { name: 'function', required: true },
    description: 'Runs on value change, expected to manually handle value',
  },
  localeInstance: {
    type: { name: 'string | object', required: false },
    description: 'Sets locale instance for dayjs, defaults to English',
    defaultValue: dayjsLocale,
  },
  inputFormat: {
    type: { name: 'string', required: false },
    description: 'Sets input format for date. Other formats might not be supported by certain browsers',
    defaultValue: 'YYYY-MM-DD',
  },
  minDate: {
    type: { name: 'string', required: false },
    description: 'Sets minimum date string',
    defaultValue: undefined,
  },
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
};

Template.storyName = 'Calendar';
