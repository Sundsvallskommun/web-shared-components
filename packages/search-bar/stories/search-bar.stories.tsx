import React, { useState } from 'react';
import { ISearchBarProps, SearchBar } from '../src/search-bar';

export default {
  title: 'Komponenter/Sök',
  component: SearchBar,
};

export const Template = (args: ISearchBarProps) => {

  const [term, setTerm] = useState('')
  
  const onChangeHandler = (event) => {
    setTerm(event.target.value)
  }

  return (
    <SearchBar {...args} value={term} onChange={onChangeHandler} /> 
  )
}

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
