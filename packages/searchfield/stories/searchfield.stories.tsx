import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SearchField, SearchFieldProps } from '../src';

export default {
  title: 'Komponenter/Searchfield',
  component: SearchField.Component,
  tags: ['autodocs'],
  args: {
    placeholder: 'Sök',
  },
} as Meta<typeof SearchField.Component>;

export const Template: StoryObj<typeof SearchField> = (args: SearchFieldProps) => {
  const [term, setTerm] = useState('');
  const [dirty, setDirty] = useState(false);

  const onChangeHandler = (event: React.BaseSyntheticEvent) => {
    setTerm(event.target.value);
    setDirty(true);
  };
  const onResetHandler = () => {
    console.log('onResetHandler');
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
      showSearchButton={dirty}
      // showResetButton={!dirty}
      onChange={onChangeHandler}
      onReset={onResetHandler}
      onSearch={onSearchHandler}
    />
  );
};

Template.storyName = 'SearchField';
