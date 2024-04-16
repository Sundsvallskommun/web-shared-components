import React, {useState} from 'react';
import { RichTextEditor, RichTextEditorProps } from '../src';
import { Meta } from '@storybook/react';

export default {
  title: 'Komponenter/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
} as Meta<typeof RichTextEditor>;

export const Template = (args: RichTextEditorProps) => {

  const [richText, setRichText] = useState<string>('');

  const handleChange = (value) => {
    setRichText(value);
  }

  return (
    <div className="h-[40rem]">
        <RichTextEditor {...args} onChange={(value, delta, source, editor) => {
          handleChange(value)
        }} value={richText} label="RichTextEditor" />
    </div>
  );
}

Template.storyName = 'RichTextEditor';