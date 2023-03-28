import { Meta } from '@storybook/react';
import DropdownSearch from '../src/dropdown-search';
import React from 'react';
export default {
  title: 'Komponenter/Dropdown/DropdownSearch',
  component: DropdownSearch,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = (args: any) => {
  const cleanState = [
    { id: 1, orgName: 'Durward Reynolds' },
    { id: 2, orgName: 'Kenton Towne' },
    { id: 3, orgName: 'Therese Wunsch' },
    {
      id: 4,
      orgName:
        'Benedict Kessler asd asd asd das dsa ew sdccsdcsdc e dwe csdcsdcsd ewcwec sdc sc cwe wec wec sdcsc scdc ew cwe csd sdc sdccwe c',
    },
    { id: 5, orgName: 'Katelyn Rohan', moreData: { test: '' } },
    { id: 6, orgName: 'Reynolds Kenton' },
    { id: 7, orgName: 'Rohan Towne' },
    { id: 8, orgName: 'Wunsch Benedict' },
    { id: 9, orgName: 'Kessler Therese' },
    { id: 10, orgName: 'Durward Katelyn', moreData: { test: '' } },
  ];

  return (
    <form
      style={{ minHeight: 300 }}
      onSubmit={(e) => {
        e.preventDefault();
        console.log('submit');
      }}
    >
      <DropdownSearch
        {...args}
        data={cleanState}
        labelProperty="orgName"
        defaultList={cleanState.slice(2, 6)}
        useDeleteButton
        notFoundLabel="Inga resultat..."
        onSelect={console.log}
      />
    </form>
  );
};

Template.storyName = 'DropdownSearch';

Template.argTypes = {
  maxAmount: {
    type: {
      name: 'number',
      require: false,
    },
    description: 'Max options shown at one time (def: 10)',
    defaultValue: 10,
  },
  className: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'Extra className',
    defaultValue: '',
  },
  listClassName: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'Extra className on list',
    defaultValue: '',
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
    defaultValue: 'placeholder...',
  },
  labelProperty: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'To specify which object property to use as label',
    defaultValue: 'label',
  },
  idProperty: {
    type: {
      name: 'string',
      require: false,
    },
    description: 'To specify which object property to use as unique identifier (used when multichoice)',
    defaultValue: 'id',
  },
  render: {
    type: {
      name: 'function',
      require: false,
    },
    description: 'Render function',
    defaultValue: '',
  },
  filterFunction: {
    type: {
      name: 'function',
      require: false,
    },
    description: 'Filter function',
    defaultValue: '',
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
  multiple: {
    type: { name: 'string', required: false },
    description: 'Sets if multiple choice',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
};
