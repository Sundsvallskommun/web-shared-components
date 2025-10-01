import { Meta, StoryObj } from '@storybook/react';
import Quill, { Delta } from 'quill';
import { useRef, useState } from 'react';
import { TextEditor, TextEditorProps } from '../src';
import Button from '@sk-web-gui/button';

export default {
  title: 'Komponenter/TextEditor',
  component: TextEditor,
  tags: ['autodocs'],
} as Meta<typeof TextEditor>;

export const Template: StoryObj<typeof TextEditor> = (args: TextEditorProps) => {
  const editorRef = useRef<Quill | null>(null);

  const handleTextChange = (delta: Delta) => {
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

export const InsertText = () => {
  const text = '<p>London is the capital city of England.</p><br><b>Paris is the capital of France.</b>';
  const [plain, setPlain] = useState<string | undefined>();
  const [mark, setMark] = useState<string | undefined>();

  return (
    <>
      <TextEditor
        value={{ plainText: plain, markup: mark }}
        onChange={(e) => {
          console.log('Plaintext value', e.target.value.plainText);
          console.log('Markup value', e.target.value.markup);
          setPlain(e.target.value.plainText);
          setMark(e.target.value.markup);
        }}
      />
      <div className="mt-10">
        <Button onClick={() => setPlain(text)}>Plaintext</Button>
        <Button onClick={() => setMark(text)}>Markup</Button>
      </div>
    </>
  );
};

InsertText.storyName = 'Insert text into editor';
