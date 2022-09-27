import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import { TextEditor } from '../src/text-editor';

export default {
  title: 'Komponenter/TextRedigerare/Komponent',
  component: TextEditor,
  argTypes: {},
} as Meta;

export const Template = ({ text, ...args }: any) => {
  const [value, setValue] = useState('Text from State!');

  return (
    <>
      <TextEditor {...args} value={value} onChange={setValue} />
      <p>Example output:</p>
      <p>
        <code>{value}</code>
      </p>
    </>
  );
};

Template.storyName = 'Komponent';

Template.argTypes = {
  advanced: {
    type: {
      name: 'boolean',
      required: false,
    },
    description: 'Make advanced formatting options available',
    control: 'boolean',
    defaultValue: false,
  },
};
