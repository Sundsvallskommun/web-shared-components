import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SearchBar, SearchbarProps } from '../src/search-bar';

export default {
  title: 'Komponenter/Sök/Komponent',
  component: SearchBar,
  tags: ['autodocs'],
  args: {
    placeholder: 'Sök..',
  },
} as Meta<typeof SearchBar>;

export const Template: StoryObj<typeof SearchBar> = (args: SearchbarProps) => {
  const [term, setTerm] = useState('');

  const onChangeHandler = (event: React.BaseSyntheticEvent) => {
    setTerm(event.target.value);
  };
  const onCloseHandler = () => {
    console.log('onCloseHandler');
  };
  const onSearchHandler = (query: string) => {
    console.log('onSearchHandler', query);
  };

  return (
    <SearchBar {...args} value={term} onChange={onChangeHandler} onClose={onCloseHandler} onSearch={onSearchHandler} />
  );
};

Template.storyName = 'SearchBar';
