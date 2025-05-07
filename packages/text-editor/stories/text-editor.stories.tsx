import { Meta, StoryObj } from '@storybook/react';
import { TextEditor, TextEditorProps } from '../src';
import { useRef, useState } from 'react';
import Quill, { Delta } from 'quill';

export default {
  title: 'Komponenter/TextEditor',
  component: TextEditor,
  tags: ['autodocs'],
} as Meta<typeof TextEditor>;

export const Template: StoryObj<typeof TextEditor> = (args: TextEditorProps) => {
  const [lastChange, setLastChange] = useState<Delta | undefined>(undefined);
  const editorRef = useRef<Quill | null>(null);

  const handleTextChange = (delta: Delta, oldDelta: Delta, source: string) => {
    setLastChange(delta);
    console.log('Text changed:', delta);

    if (editorRef.current) {
      const content = editorRef.current.getText();
      const htmlContent = editorRef.current.root.innerHTML;
      console.log('Editor content: ', content);
      console.log('Editor HTML content: ', htmlContent);
    }
  };

  return <TextEditor ref={editorRef} onTextChange={handleTextChange} {...args} />;
};

Template.storyName = 'TextEditor';
