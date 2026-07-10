import { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { TextEditor, TextEditorHandle, TextEditorProps, TextEditorTextChange } from '../src';
import Button from '@sk-web-gui/button';

export default {
  title: 'Komponenter/TextEditor',
  component: TextEditor,
  tags: ['autodocs'],
} as Meta<typeof TextEditor>;

export const Template: StoryObj<typeof TextEditor> = (args: TextEditorProps) => {
  const editorRef = useRef<TextEditorHandle | null>(null);

  const handleTextChange = (change: TextEditorTextChange) => {
    console.log('Text changed:', change);

    if (editorRef.current) {
      console.log('Editor value:', editorRef.current.getValue());
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

export const ReadOnly = () => (
  <TextEditor
    readOnly
    value={{
      markup:
        '<h2>Publicerad information</h2><p>Det här innehållet kan läsas men inte ändras.</p><ul><li>En punkt</li><li>En annan punkt</li></ul>',
    }}
  />
);

ReadOnly.storyName = 'Read only';
