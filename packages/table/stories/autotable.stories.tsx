import { Meta } from '@storybook/react';
import React from 'react';
import { AutoTableHeader } from '../src/auto-table';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { AutoTable, AutoTableProps } from '../src/auto-table';

export default {
  title: 'Komponenter/Table/AutoTable',
  component: AutoTable,
  tags: ['autodocs'],
} as Meta<typeof AutoTable>;

const ongoingCases = {
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

const headers: Array<AutoTableHeader | string> = [
  {
    label: 'Ärende',
    property: 'caseType',
    sticky: true,
    renderColumn: (value) => <strong>{value}</strong>,
  },
  'handler.name',
  'id',
  'status',
  {
    label: 'Ärendeknapp',
    screenReaderOnly: true,
    renderColumn: (value, item) => (
      <div className="text-right">
        <Button
          aria-label={`Till ärende ${item.id}`}
          variant="tertiary"
          onClick={() => console.log(item)}
          size="sm"
          iconButton
        >
          <Icon name="more-horizontal" />
        </Button>
      </div>
    ),
    isColumnSortable: false,
  },
];

export const Template = (args: AutoTableProps) => (
  <AutoTable {...args} autodata={ongoingCases.data} autoheaders={headers} />
);

Template.story = { name: 'Table' };
