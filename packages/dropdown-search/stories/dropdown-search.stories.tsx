import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import DropdownSearch from '../src/dropdown-search';
import { defaults } from 'autoprefixer';

export default {
  title: 'Komponenter/Dropdown/DropdownSearch',
  component: DropdownSearch,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = (args: any) => {
  const cleanState = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]

  const [value, setValue] = useState({ id: null, name: '' })

  const setValueHandler = (value: any) => {
    setValue(value)
  }

  return(
    <div style={{minHeight: 300}}>
      <DropdownSearch {...args } data={cleanState} onChange={setValueHandler} value={value}/>
    </div>
  );
}

Template.storyName = 'DropdownSearch';

Template.argTypes = {
  label: {
    type: { 
      name: 'string', 
      required: false 
    },
    description: 'Label',
    defaultValue: 'Filter label',
  },
  maxAmount: {
    type: {
      name: 'number',
      require: false,
    },
    description: 'Max options shown at one time (def: 10)',
    defaultValue: 10
  },
  className: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'Extra className',
    defaultValue: ''
  },
  listClassName: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'Extra className on list',
    defaultValue: ''
  },
  onChange: {
    type: {
      name: 'function',
      require: true,
    },
    description: 'onChange callback',
  },
  value: {
    type: {
      name: 'string',
      require: true,
    },
    description: 'Selected value',
  },
  placeholder: {
    type: {
      name: 'string',
      require: false,
    }, 
    description: 'Placeholder, You know what this is.',
    defaultValue: 'placeholder...'
  },
}