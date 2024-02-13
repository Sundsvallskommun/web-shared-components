import { Meta } from '@storybook/react';
import React from 'react';
import { Table, TableProps } from '../src';
import { AutoTableHeader } from '../src/table';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';

export default {
  title: 'Komponenter/Table/Table',
  component: Table,
  tags: ['autodocs'],
} as Meta<typeof Table>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headerLabels = [
  { label: 'Frukt', screenReaderOnly: false, sortable: true },
  { label: 'Pris', screenReaderOnly: false, sortable: true },
  { label: 'Land', screenReaderOnly: false, sortable: true },
];

const data = [
  {
    id: 1,
    fruit: 'banan',
    price: '14 kr',
    country: 'Brazilien',
  },
  {
    id: 2,
    fruit: 'Melon',
    price: '25 kr',
    country: 'Brazilien',
  },
  {
    id: 3,
    fruit: 'Kiwi',
    price: '12 kr',
    country: 'Brazilien',
  },
  {
    id: 4,
    fruit: 'Citron',
    price: '8 kr',
    country: 'Brazilien',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rows: any = data.map((d, idx: number) => {
  return (
    <Table.TableRow key={`row-${idx}`}>
      <Table.TableRowColumn className="">
        <span>{d.fruit}</span>
      </Table.TableRowColumn>
      <Table.TableRowColumn>
        <span>{d.price}</span>
      </Table.TableRowColumn>
      <Table.TableRowColumn>
        <span>{d.country}</span>
      </Table.TableRowColumn>
    </Table.TableRow>
  );
});

export const Template = (args: TableProps) => (
  <div className="flex flex-col gap-16">
    <Table className="table-column-group" {...args}>
      <Table.Header>
        {headerLabels.map((l, idx) => {
          return (
            <Table.HeaderColumn key={`header-${idx}`}>
              <span>{l.label}</span>
            </Table.HeaderColumn>
          );
        })}
      </Table.Header>
      <tbody>
        {rows.map((row) => {
          return row;
        })}
      </tbody>
    </Table>
  </div>
);

Template.story = { name: 'Table' };

export const AutoTable = (args: TableProps) => {
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

  return <Table {...args} footer variant="autotable" autodata={ongoingCases.data} autoheaders={headers} />;
};
