import { Meta } from '@storybook/react';
import DropdownSearch, { DropdownSearchProps } from '../src/dropdown-search';
import React from 'react';
export default {
  title: 'Komponenter/Dropdown/DropdownSearch',
  component: DropdownSearch,
  tags: ['autodocs'],
} as Meta;

export const Template = (args: DropdownSearchProps) => {
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
        onSearch={console.log}
      />
    </form>
  );
};

Template.storyName = 'DropdownSearch';
