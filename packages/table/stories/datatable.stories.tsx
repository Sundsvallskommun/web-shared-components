import React, { Fragment } from 'react';
import { Meta } from '@storybook/react';
import { DataTable, DataTableHeader, DataTableProps } from '../src/datatable';

export default {
  title: 'Komponenter/Tabeller/DataTable',
  component: DataTable,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta;

const ongoingCases: any = {
  data: [
    {
      caseType: 'Trasig bänk',
      id: '000-0005',
      status: 'Inskickat',
      handler: {
        id: 1,
        name: 'Peter',
      },
    },
    {
      caseType: 'Skräp i parken',
      id: '000-0006',
      status: 'Avslutat',
      handler: {
        id: 2,
        name: 'Eva',
      },
    },
    {
      caseType: 'Tillstånd',
      id: '000-0007',
      status: 'Pågående',
      handler: {
        id: 1,
        name: 'Peter',
      },
    },
    {
      caseType: 'Trasig bänk',
      id: '000-0001',
      status: 'Inskickat',
      handler: {
        id: 3,
        name: 'Jörgen',
      },
    },
    {
      caseType: 'Skräp i parken',
      id: '000-0002',
      status: 'Avslutat',
      handler: {
        id: 1,
        name: 'Peter',
      },
    },
    {
      caseType: 'Tillstånd',
      id: '000-0003',
      status: 'Pågående',
      handler: {
        id: 2,
        name: 'Eva',
      },
    },
  ],
  message: 'success',
};

const headers: Array<string | DataTableHeader> = [
  {
    label: 'Ärende',
    property: 'caseType',
    renderColumn: (value) => <strong>{value}</strong>,
  },
  'handler.name',
  'id',
  'status',
  {
    renderColumn: (value, item) => (
      <button
        aria-label={`Till ärende ${item.id}`}
        color="primary"
        className="w-full bg-primary p-3 text-white lg:w-64 rounded-lg"
        onClick={() => console.log(item)}
      >
        Till ärendet
      </button>
    ),
    isColumnSortable: false,
  },
];

export const Template = (args: DataTableProps) => <DataTable {...args} data={ongoingCases.data} headers={headers} />;

Template.argTypes = {
  captionTitle: {
    type: { name: 'string', required: false },
    description: 'Sets caption title for screen readers',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    defaultValue: '',
  },
  captionBody: {
    type: { name: 'string', required: false },
    description: 'Sets caption body for screen readers',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    defaultValue: '',
  },
  summary: {
    type: { name: 'string', required: false },
    description: 'Sets summary attribute on table for screen readers',
    table: {
      defaultValue: { summary: '' },
    },
    control: 'text',
    defaultValue: '',
  },
  pageSize: {
    type: { name: 'string', required: false },
    description: 'Number of entries per page',
    table: {
      defaultValue: { summary: '5' },
    },
    control: 'number',
    defaultValue: 5,
  },
  page: {
    type: { name: 'string', required: false },
    description: 'Page number',
    table: {
      defaultValue: { summary: '1' },
    },
    control: 'number',
    defaultValue: 1,
  },
  tableSortable: {
    type: { name: 'string', required: false },
    description: 'Sets table to be sortable',
    table: {
      defaultValue: { summary: 'true' },
    },
    control: 'boolean',
    defaultValue: 'true',
  },
};

Template.story = { name: 'DataTable' };
