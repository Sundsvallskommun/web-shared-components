import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import DropdownFilter, { DropdownFilterProps, IFilterData } from '../src/dropdown-filter';

export default {
  title: 'Komponenter/Dropdown/DropdownFilter',
  component: DropdownFilter,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: DropdownFilterProps) => {
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

  const [filterData, setFilterData] = useState<IFilterData[]>(cleanState);

  return (
    <div style={{ minHeight: 300 }}>
      <DropdownFilter {...args} filterData={filterData} onFilterChange={setFilterData} />
    </div>
  );
};

Template.storyName = 'DropdownFilter';
