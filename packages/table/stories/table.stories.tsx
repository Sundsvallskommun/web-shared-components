import { Meta } from '@storybook/react';
import React from 'react';
import { Table, TableProps } from '../src';
import { Icon } from '@sk-web-gui/icon';
import { Button } from '@sk-web-gui/button';
import { sortMode } from '../src/auto-table';
import { Input, Select } from '@sk-web-gui/forms';
import { Pagination } from '@sk-web-gui/pagination';

export default {
  title: 'Komponenter/Table/Table',
  component: Table,
  tags: ['autodocs'],
} as Meta<typeof Table>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const headerLabels = [{ label: 'Column 1' }, { label: 'Column 2' }, { label: 'Column 3' }];

// const data = [
//   {
//     id: 1,
//     column1: 'cell',
//     column2: 'cell',
//     column3: 'cell',
//   },
//   {
//     id: 2,
//     column1: 'cell',
//     column2: 'cell',
//     column3: 'cell',
//   },
//   {
//     id: 3,
//     column1: 'cell',
//     column2: 'cell',
//     column3: 'cell',
//   },
//   {
//     id: 4,
//     column1: 'cell',
//     column2: 'cell',
//     column3: 'cell',
//   },
//   {
//     id: 5,
//     column1: 'cell',
//     column2: 'cell',
//     column3: 'cell',
//   },
//   {
//     id: 6,
//     column1: 'cell',
//     column2: 'cell',
//     column3: 'cell',
//   },

//   {
//     id: 7,
//     column1: 'cell',
//     column2: 'cell',
//     column3: 'cell',
//   },
// ];

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const rows: any = data.map((d, idx: number) => {
//   return (
//     <Table.Row key={`row-${idx}`}>
//       <Table.Column>
//         <span>{d.column1}</span>
//       </Table.Column>
//       <Table.Column>
//         <span>{d.column2}</span>
//       </Table.Column>
//       <Table.Column>
//         <span>{d.column3}</span>
//       </Table.Column>
//     </Table.Row>
//   );
// });

export const Template = (args: TableProps) => (
  <div className="flex flex-col gap-16">
    <Table {...args}>
      <Table.Header>
        <Table.HeaderColumn>Column 1</Table.HeaderColumn>
        <Table.HeaderColumn>Column 2</Table.HeaderColumn>
        <Table.HeaderColumn>Column 3</Table.HeaderColumn>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => {
          return row;
        })}
      </Table.Body>
    </Table>
  </div>
);

Template.story = { name: 'Table' };

export const DataTable = (args: TableProps) => {
  const headerlabels = [
    { label: 'Ärende', isColumnSortable: true, screenReaderOnly: false },
    { label: 'Status', isColumnSortable: true, screenReaderOnly: false },
    { label: 'Handläggare', isColumnSortable: true, screenReaderOnly: false },
    { label: 'Ärendeknapp', isColumnSortable: false, screenReaderOnly: true },
  ];

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
  const defaultSort = {
    idx: 0,
    sortMode: sortMode.ASC,
  };
  const page = 1;

  const [_pageSize, setPageSize] = React.useState<number>(5);
  const [sortIndex, setSortIndex] = React.useState<number>(defaultSort.idx);
  const [currentPage, setCurrentPage] = React.useState<number>(page);
  const [sortModeOrder, setSortModeOrder] = React.useState(defaultSort.sortMode);
  const [rowHeight, setRowHeight] = React.useState<string>('normal');

  const tableSortable = true;

  const internalSortHandler = (idx: number) => {
    setSortModeOrder(
      sortIndex === idx ? (sortModeOrder === sortMode.DESC ? sortMode.ASC : sortMode.DESC) : sortMode.ASC
    );
    setSortIndex(idx);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const datarows: any = dataTableData.map((d, idx: number) => {
    return (
      <Table.Row key={`row-${idx}`}>
        <Table.Column>
          <span>{d.caseType}</span>
        </Table.Column>
        <Table.Column>
          <span>{d.status}</span>
        </Table.Column>
        <Table.Column>
          <span>{d.handler}</span>
        </Table.Column>
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
      {dataTableData.length > 0 && (
        <Table {...args} summary={'data table'} background={true} dense={rowHeight === 'dense'}>
          <Table.Header>
            {headerlabels.map((h, idx) => (
              <Table.HeaderColumn
                key={`header-${idx}`}
                aria-sort={sortModeOrder}
                data-iscolumnsortable={h.isColumnSortable}
              >
                {' '}
                {h.isColumnSortable && tableSortable ? (
                  <Table.SortButton
                    isActive={sortIndex == idx}
                    aria-description={sortIndex == idx ? undefined : 'sortera'}
                    sortOrder={sortModeOrder}
                    onClick={() => {
                      internalSortHandler(idx);
                    }}
                  >
                    <span>{h.label}</span>
                  </Table.SortButton>
                ) : (
                  <span className={`sk-table-sortbutton ${h.screenReaderOnly ? `sr-only` : ``}`}>{h.label}</span>
                )}
              </Table.HeaderColumn>
            ))}
          </Table.Header>
          <Table.Body>
            {datarows.map((row) => {
              return row;
            })}
          </Table.Body>
          <Table.Footer>
            <div className="sk-table-bottom-section">
              <label className="sk-table-bottom-section-label" htmlFor="pagiPageSize">
                Rader per sida:
              </label>
              <Input
                size="sm"
                id="pagePageSize"
                type="number"
                min={1}
                max={100}
                className="max-w-[6rem]"
                value={`${_pageSize}`}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPageSize(parseInt(event.target.value))}
              />
            </div>

            <div className="sk-table-paginationwrapper">
              <Pagination
                className="sk-table-pagination"
                pages={2}
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
      )}
    </>
  );
};
