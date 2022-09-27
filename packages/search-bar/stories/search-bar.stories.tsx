import React from 'react';
import SearchBar, { ISearchBarProps } from '../src/search-bar';

export default {
  title: 'Komponenter/Sök',
  component: SearchBar,
};

export const Template = (args: ISearchBarProps) => (
  <SearchBar {...args} />
);

Template.argTypes = {
  value: {
    type: { 
      name: 'string', 
      required: true 
    },
    description: 'Search bar value',
    defaultValue: null,
  },
  onChange: {
    type: { 
      name: 'function', 
      required: true 
    },
    description: 'Simple onChange event',
    defaultValue: null,
  },
  placeholder: {
    type: { 
      name: 'string', 
      required: false 
    },
    description: 'Placeholder text',
    defaultValue: "Search bar placeholder...",
  },
  smallIcon: {
    type: { 
      name: 'boolean', 
      required: false 
    },
    description: 'Icon is small?',
    defaultValue: false,
  },
  onSearch: {
    type: { 
      name: 'function', 
      required: true 
    },
    description: 'Simple search call',
    defaultValue: null,
  },
};

Template.storyName = 'SearchBar';
