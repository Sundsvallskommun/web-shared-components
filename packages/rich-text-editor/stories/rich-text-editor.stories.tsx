import React, { useState } from 'react';
import { RichTextEditor, RichTextEditorProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
} as Meta<typeof RichTextEditor>;

export const Template = (args: RichTextEditorProps) => {
  const [richText, setRichText] = useState<string>('');

  return (
    <div className="h-[40rem]">
      <RichTextEditor
        {...args}
        value={richText}
        label="RichTextEditor"
      />
    </div>
  );
};

Template.storyName = 'RichTextEditor';
