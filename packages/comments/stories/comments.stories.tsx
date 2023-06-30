import { Meta } from '@storybook/react';
import React, { useState } from 'react';
import { Comments, CommentsProps } from '../src';
import commentsData from './commentsData.json';

export default {
  title: 'Komponenter/Kommentarer/Komponent',
  component: Comments,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: CommentsProps) => {
  const [input, setInput] = useState('');

  const submit = (comment: string) => {
    alert('Kommentar: ' + comment);
  };
  return (
    <div className="max-w-[800px] h-[500px] w-full shadow-md pb-8">
      <Comments
        {...args}
        submitFunction={submit}
        commentsData={commentsData}
        inputValue={input}
        setInputValue={setInput}
      />
    </div>
  );
};

Template.storyName = 'Kommentarer';

export const CommentsWrapped = () => {
  const [input, setInput] = useState('');

  const submit = () => {
    alert('Kommentar: ' + input);
    setInput('');
  };
  return (
    <div className="max-w-[500px] w-full h-[800px] shadow-md pb-8">
      <Comments commentsData={commentsData} submitFunction={submit} inputValue={input} setInputValue={setInput} />
    </div>
  );
};

CommentsWrapped.storyName = 'Basic comments high narrow wrapper';
