import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import DropdownFilter from '../src/dropdown-filter';

export default {
  title: 'Komponenter/Dropdown/DropdownFilter',
  component: DropdownFilter,
  parameters: { controls: { hideNoControlsWarning: true } },
} as Meta;

export const Template = (args: any) => {
  const cleanState = [
    {
      id: 1,
      name: 'filter 1',
      value: true,
    },
    {
      id: 2,
      name: 'filter 2',
      value: false,
      disabled: true,
    },
    {
      id: 3,
      name: 'filter 3',
      value: true,
      disabled: true,
    },
    {
      id: 4,
      name: 'filter 4',
      value: true,
    },
    {
      id: 5,
      name: 'filter 5',
      value: false,
    },
    {
      id: 6,
      name: 'filter 6',
      value: false,
      isShown: false,
    },
  ];

  const [filterData, setFilterData] = useState(cleanState);

  return (
    <div style={{ minHeight: 300 }}>
      <DropdownFilter {...args} filterData={filterData} onFilterChange={setFilterData} />
    </div>
  );
};

Template.storyName = 'DropdownFilter';

Template.argTypes = {
  label: {
    type: {
      name: 'string',
      required: false,
    },
    description: 'Label',
    defaultValue: 'Filter label',
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
