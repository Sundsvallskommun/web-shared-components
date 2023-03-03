import React, { useState } from 'react';
import { ISearchBarProps, SearchBar } from '../src/search-bar';

export default {
  title: 'Komponenter/Sök',
  component: SearchBar,
};

export const Template = (args: ISearchBarProps) => {
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

  return <SearchBar {...args} onChange={onChangeHandler} onClose={onCloseHandler} onSearch={onSearchHandler} />;
};

Template.argTypes = {
  value: {
    type: {
      name: 'string',
      required: true,
    },
    description: 'Search bar value',
    defaultValue: null,
  },
  onChange: {
    type: {
      name: 'function',
      required: true,
    },
    description: 'Simple onChange event',
    defaultValue: null,
  },
  placeholder: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Placeholder text',
    defaultValue: 'Search bar placeholder...',
  },
  smallIcon: {
    type: {
      name: 'boolean',
      required: false,
    },
    description: 'Small search icon',
    defaultValue: false,
  },
  onSearch: {
    type: {
      name: 'function',
      required: true,
    },
    description: 'Simple search call',
    defaultValue: null,
  },
  rounded: {
    type: {
      name: 'boolean',
      required: false,
    },
    description: 'Round corners',
    defaultValue: false,
  },
  size: {
    type: { name: 'string', required: false },
    description: 'Sets size',
    table: {
      defaultValue: { summary: 'md' },
    },
    options: ['sm', 'md', 'lg'],
    control: 'select',
    defaultValue: 'md',
  },
};

Template.storyName = 'SearchBar';
