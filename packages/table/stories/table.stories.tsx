import { Meta } from '@storybook/react';
import React from 'react';
import { Table, TableProps } from '../src';
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
    price: 14,
    country: 'Brazilien',
  },
  {
    id: 2,
    fruit: 'Melon',
    price: 25,
    country: 'Brazilien',
  },
  {
    id: 3,
    fruit: 'Kiwi',
    price: 12,
    country: 'Brazilien',
  },
  {
    id: 4,
    fruit: 'Avocado',
    price: null,
    country: 'Chile',
  },
  {
    id: 5,
    fruit: 'Granatäpple',
    price: null,
    country: 'Thailand',
  },
  {
    id: 6,
    fruit: 'Citron',
    price: 8,
    country: 'Brazilien',
  },

  {
    id: 7,
    fruit: 'Kiwi',
    price: 16,
    country: 'Chile',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rows: any = data.map((d, idx: number) => {
  return (
    <Table.Row
      tabIndex={0}
      className={`${d.price && d.price < 10 && 'bg-success-background-200'} ${
        d.price && d.price > 10 && d.price < 16 && 'bg-warning-background-100'
      }
      ${d.price && d.price >= 16 && 'bg-error-background-200'}`}
      key={`row-${idx}`}
    >
      <Table.Column tabIndex={0}>
        <span>{d.fruit}</span>
      </Table.Column>
      <Table.Column tabIndex={0}>
        <span>{`${d.price ? `${d.price} kr` : '-'}`}</span>
      </Table.Column>
      <Table.Column tabIndex={0}>
        <span>{d.country}</span>
      </Table.Column>
    </Table.Row>
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
      <Table.Footer>
        <div className="sk-table-bottom-section">En footergrej</div>
        <div className="sk-table-bottom-section">En annan footergrej</div>
        <div className="sk-table-bottom-section">
          <Icon name="alarm-clock" />
        </div>
      </Table.Footer>
    </Table>
  </div>
);

Template.story = { name: 'Table' };
