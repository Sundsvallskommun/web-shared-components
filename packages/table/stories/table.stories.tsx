import { Meta } from '@storybook/react';
import React from 'react';
import { Table, TableProps } from '../src';
import { Icon } from '@sk-web-gui/icon';
import { Button } from '@sk-web-gui/button';
import { SortMode } from '../src/auto-table';
import { Input, Select } from '@sk-web-gui/forms';
import { Pagination } from '@sk-web-gui/pagination';
import { TableSortButton } from '../src/table-sort-button';

export default {
  title: 'Komponenter/Table/Table',
  component: Table,
  tags: ['autodocs'],
} as Meta<typeof Table>;

export const Template = (args: TableProps) => (
  <div className="flex flex-col gap-16">
    <Table {...args}>
      <Table.Header>
        <Table.HeaderColumn>Column 1</Table.HeaderColumn>
        <Table.HeaderColumn>Column 2</Table.HeaderColumn>
        <Table.HeaderColumn>Column 3</Table.HeaderColumn>
        <Table.HeaderColumn>Column 4</Table.HeaderColumn>
        <Table.HeaderColumn>Column 5</Table.HeaderColumn>
        <Table.HeaderColumn>Column 6</Table.HeaderColumn>
        <Table.HeaderColumn>Column 7</Table.HeaderColumn>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Column>Data 1</Table.Column>
          <Table.Column>Data 2</Table.Column>
          <Table.Column>Data 3</Table.Column>
          <Table.Column>Data 4</Table.Column>
          <Table.Column>Data 5</Table.Column>
          <Table.Column>Data 6</Table.Column>
          <Table.Column>Data 7</Table.Column>
        </Table.Row>
        <Table.Row>
          <Table.Column>Data 1</Table.Column>
          <Table.Column>Data 2</Table.Column>
          <Table.Column>Data 3</Table.Column>
          <Table.Column>Data 4</Table.Column>
          <Table.Column>Data 5</Table.Column>
          <Table.Column>Data 6</Table.Column>
          <Table.Column>Data 7</Table.Column>
        </Table.Row>
        <Table.Row>
          <Table.Column>Data 1</Table.Column>
          <Table.Column>Data 2</Table.Column>
          <Table.Column>Data 3</Table.Column>
          <Table.Column>Data 4</Table.Column>
          <Table.Column>Data 5</Table.Column>
          <Table.Column>Data 6</Table.Column>
          <Table.Column>Data 7</Table.Column>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
);

Template.story = { name: 'Table' };

export const DataTable = (args: TableProps) => {
  const dataTableData = [
    {
      id: 1,
      caseType: 'Trasig bänk',
      status: 'Inskickat',
      handler: 'Thorleif',
    },
    {
      id: 2,
      caseType: 'Klotter i parken',
      status: 'Pågående',
      handler: 'Kristina',
    },
    {
      id: 3,
      caseType: 'Trasig gunga',
      status: 'Inskickat',
      handler: 'Björn',
    },
    {
      id: 4,
      caseType: 'Trasig bänk',
      status: 'Inskickat',
      handler: 'Björn',
    },
    {
      id: 5,
      caseType: 'Tillstånd',
      status: 'Avslutat',
      handler: 'Anders',
    },
  ];

  const [_pageSize, setPageSize] = React.useState<number>(5);
  const [sortColumn, setSortColumn] = React.useState<string>('caseType');
  const [sortOrder, setSortOrder] = React.useState(SortMode.ASC);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [rowHeight, setRowHeight] = React.useState<string>('normal');

  const handleSorting = (column: string) => {
    if (sortColumn !== column) {
      setSortColumn(column);
    } else {
      setSortOrder(sortOrder === SortMode.ASC ? SortMode.DESC : SortMode.ASC);
    }
  };

  const datarows = dataTableData
    .sort((a, b) => {
      const order = sortOrder === SortMode.ASC ? -1 : 1;
      return a[sortColumn] < b[sortColumn] ? order : a[sortColumn] > b[sortColumn] ? order * -1 : 0;
    })
    .slice((currentPage - 1) * _pageSize, currentPage * _pageSize)
    .map((d, idx: number) => {
      return (
        <Table.Row key={`row-${idx}`}>
          <Table.HeaderColumn scope="row" sticky>
            {d.caseType}
          </Table.HeaderColumn>
          <Table.Column>{d.status}</Table.Column>
          <Table.Column>{d.handler}</Table.Column>
          <Table.Column>
            <Button
              aria-label={`Till ärende ${d.id}`}
              variant="tertiary"
              onClick={() => console.log(d)}
              size="sm"
              iconButton
            >
              <Icon name="more-horizontal" />
            </Button>
          </Table.Column>
        </Table.Row>
      );
    });

  return (
    <>
      <Table {...args} background={true} dense={rowHeight === 'dense'}>
        <Table.Header>
          <Table.HeaderColumn aria-sort={sortColumn === 'caseType' ? sortOrder : 'none'} sticky>
            <TableSortButton
              isActive={sortColumn === 'caseType'}
              sortOrder={sortOrder}
              onClick={() => handleSorting('caseType')}
            >
              Ärende
            </TableSortButton>
          </Table.HeaderColumn>
          <Table.HeaderColumn aria-sort={sortColumn === 'status' ? sortOrder : 'none'}>
            <TableSortButton
              isActive={sortColumn === 'status'}
              sortOrder={sortOrder}
              onClick={() => handleSorting('status')}
            >
              Status
            </TableSortButton>
          </Table.HeaderColumn>
          <Table.HeaderColumn aria-sort={sortColumn === 'handler' ? sortOrder : 'none'}>
            <TableSortButton
              isActive={sortColumn === 'handler'}
              sortOrder={sortOrder}
              onClick={() => handleSorting('handler')}
            >
              Handläggare
            </TableSortButton>
          </Table.HeaderColumn>
          <Table.HeaderColumn>
            <span className="sr-only">Redigera</span>
          </Table.HeaderColumn>
        </Table.Header>
        <Table.Body>
          {datarows.map((row) => {
            return row;
          })}
        </Table.Body>
        <Table.Footer>
          <div className="sk-table-bottom-section sk-table-pagination-mobile">
            <label className="sk-table-bottom-section-label" htmlFor="paginationSelect">
              Sida:
            </label>
            <Select
              id="paginationSelect"
              size="sm"
              value={currentPage.toString()}
              onSelectValue={(value) => setCurrentPage(parseInt(value, 10))}
            >
              {[...Array(Math.ceil(dataTableData.length / _pageSize)).keys()].map((page) => (
                <Select.Option key={`pagipage-${page}`} value={(page + 1).toString()}>
                  {page + 1}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="sk-table-bottom-section">
            <label className="sk-table-bottom-section-label" htmlFor="pagiPageSize">
              Rader per sida:
            </label>
            <Input
              hideExtra={false}
              size="sm"
              id="pagePageSize"
              type="number"
              min={1}
              max={100}
              className="max-w-[6rem]"
              value={`${_pageSize}`}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                event.target.value && setPageSize(parseInt(event.target.value))
              }
            />
          </div>

          <div className="sk-table-paginationwrapper">
            <Pagination
              className="sk-table-pagination"
              pages={Math.ceil(dataTableData.length / _pageSize)}
              activePage={currentPage}
              showConstantPages
              pagesAfter={1}
              pagesBefore={1}
              changePage={(page: number) => setCurrentPage(page)}
              fitContainer
            />
          </div>
          <div className="sk-table-bottom-section">
            <label className="sk-table-bottom-section-label" htmlFor="pagiRowHeight">
              Radhöjd:
            </label>
            <Select
              id="pagiRowHeight"
              size="sm"
              value={rowHeight}
              onSelectValue={(value: string) => setRowHeight(value)}
            >
              <Select.Option value={'normal'}>Normal</Select.Option>
              <Select.Option value={'dense'}>Tät</Select.Option>
            </Select>
          </div>
        </Table.Footer>
      </Table>
    </>
  );
};
