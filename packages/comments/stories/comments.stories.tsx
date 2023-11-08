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

  const edit = (comment: string, id: string | number) => {
    alert('Kommentar: ' + comment + ' id: ' + id);
  };

  const remove = (id: string | number) => {
    alert('tar bort id: ' + id);
  };
  return (
    <div className="max-w-[800px] h-[500px] w-full shadow-md pb-8">
      <Comments
        {...args}
        onSubmitCallback={submit}
        onEditCallback={edit}
        onDeleteCallback={remove}
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

  const editFunc = (comment: string, id: string | number) => {
    alert('Kommentar: ' + comment + ' ' + id);
  };
  const remove = (id: string | number) => {
    alert('tar bort id: ' + id);
  };
  return (
    <div className="max-w-[500px] w-full h-[800px] shadow-md pb-8">
      <Comments
        currentUserName={'And013And'}
        commentsData={commentsData}
        onSubmitCallback={submit}
        onDeleteCallback={remove}
        onEditCallback={editFunc}
        inputValue={input}
        setInputValue={setInput}
      />
    </div>
  );
};

CommentsWrapped.storyName = 'Basic comments high narrow wrapper';
