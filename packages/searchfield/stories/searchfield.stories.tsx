import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SearchField, SearchFieldProps } from '../src';

export default {
  title: 'Komponenter/Searchfield',
  component: SearchField,
  tags: ['autodocs'],
  args: {
    placeholder: 'Sök',
  },
} as Meta<typeof SearchField>;

export const Template: StoryObj<typeof SearchField> = (args: SearchFieldProps) => {
  const [term, setTerm] = useState('');
  const [dirty, setDirty] = useState(false);

  const onChangeHandler = (event: React.BaseSyntheticEvent) => {
    setTerm(event.target.value);
    setDirty(true);
  };
  const onCloseHandler = () => {
    console.log('onCloseHandler');
    setDirty(false);
  };
  const onSearchHandler = (query: string) => {
    console.log('onSearchHandler', query);
    setDirty(false);
  };

  return (
    <SearchField
      {...args}
      value={term}
      showSeachButton={dirty}
      onChange={onChangeHandler}
      onClose={onCloseHandler}
      onSearch={onSearchHandler}
    />
  );
};

Template.storyName = 'SearchField';
