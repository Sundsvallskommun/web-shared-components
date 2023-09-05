import { Meta } from '@storybook/react';
import React from 'react';
import { DataTable, DataTableHeader, DataTableProps } from '../src/datatable';

export default {
  title: 'Komponenter/Tabeller/DataTable',
  component: DataTable,
  tags: ['autodocs'],
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
    label: 'Ärendeknapp',
    screenReaderOnly: true,
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

Template.story = { name: 'DataTable' };
