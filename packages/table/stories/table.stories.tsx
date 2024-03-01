import { Meta } from '@storybook/react';
import React from 'react';
import { Table, TableProps } from '../src';
import { Icon } from '@sk-web-gui/icon';
import { Button } from '@sk-web-gui/button';
import { AutoTableHeader, TableHeader, AutoTableColumn, sortMode } from '../src/auto-table';
import { Input, Select } from '@sk-web-gui/forms';
import { Pagination } from '@sk-web-gui/pagination';
import _ from 'lodash';

export default {
  title: 'Komponenter/Table/Table',
  component: Table,
  tags: ['autodocs'],
} as Meta<typeof Table>;

//eslint-disable-next-line
type TableValue = any;
type TableItem = Record<string | number, TableValue>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const headerLabels = [{ label: 'Column 1' }, { label: 'Column 2' }, { label: 'Column 3' }];

const data = [
  {
    id: 1,
    column1: 'cell',
    column2: 'cell',
    column3: 'cell',
  },
  {
    id: 2,
    column1: 'cell',
    column2: 'cell',
    column3: 'cell',
  },
  {
    id: 3,
    column1: 'cell',
    column2: 'cell',
    column3: 'cell',
  },
  {
    id: 4,
    column1: 'cell',
    column2: 'cell',
    column3: 'cell',
  },
  {
    id: 5,
    column1: 'cell',
    column2: 'cell',
    column3: 'cell',
  },
  {
    id: 6,
    column1: 'cell',
    column2: 'cell',
    column3: 'cell',
  },

  {
    id: 7,
    column1: 'cell',
    column2: 'cell',
    column3: 'cell',
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rows: any = data.map((d, idx: number) => {
  return (
    <Table.Row key={`row-${idx}`}>
      <Table.Column>
        <span>{d.column1}</span>
      </Table.Column>
      <Table.Column>
        <span>{d.column2}</span>
      </Table.Column>
      <Table.Column>
        <span>{d.column3}</span>
      </Table.Column>
    </Table.Row>
  );
});

export const Template = (args: TableProps) => (
  <div className="flex flex-col gap-16">
    <Table className="table-column-group border-none rounded-0" {...args}>
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

export const DataTable = (args: TableProps) => {
  const autoheaders: Array<AutoTableHeader | string> = [
    {
      label: 'Ärende',
      property: 'caseType',
      renderColumn: (value) => <strong>{value}</strong>,
    },
    'status',
    'handler',
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
    {
      id: 6,
      caseType: 'Tillstånd',
      status: 'Pågående',
      handler: 'Anders',
    },

    {
      id: 7,
      caseType: 'Klotter i parken',
      status: 'Avslutat',
      handler: 'Kristina',
    },
  ];
  const defaultSort = {
    idx: 0,
    sortMode: sortMode.ASC,
  };
  const page = 1;
  const [sortModeOrder, setSortModeOrder] = React.useState(defaultSort.sortMode);
  const [_pageSize, setPageSize] = React.useState<number>(5);
  const pageSize = _pageSize || 1;
  const [sortIndex, setSortIndex] = React.useState<number>(defaultSort.idx);
  const [currentPage, setCurrentPage] = React.useState<number>(page);

  const [rowHeight, setRowHeight] = React.useState<string>('normal');

  const [autoHeaders] = React.useState<Array<AutoTableHeader | string>>(
    autoheaders?.length === 0 || autoheaders === undefined ? [] : (autoheaders as Array<AutoTableHeader | string>)
  );
  const autoData =
    dataTableData?.length === 0 || dataTableData === undefined ? [] : (dataTableData as Array<TableItem>);
  const [tableData, setTableData] = React.useState<TableItem[]>(dataTableData as Array<TableItem>);

  const getValue = (item: TableItem, header: string | AutoTableHeader): TableValue => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let headerparts: any[] = [];

    switch (typeof header) {
      case 'string':
        headerparts = header.split('.');
        break;

      default:
        headerparts = header?.property ? header?.property.split('.') : [];
        break;
    }
    const value = headerparts.reduce((value, headerpart) => {
      if (value !== null) {
        if (value) {
          return value[headerpart] ? value[headerpart] : undefined;
        }
        return undefined;
      }

      return item[headerpart];
    }, null);

    return value || '';
  };

  const getLabel = (header: AutoTableHeader | string) => {
    let headerparts;
    switch (typeof header) {
      case 'string':
        headerparts = header.split('.');
        return _.upperFirst(_.lowerCase(headerparts[headerparts.length - 1]));

      default:
        if (header.label) {
          return header.label;
        }
        headerparts = header.property ? header.property.split('.') : [];
        return headerparts.length ? _.upperFirst(_.lowerCase(headerparts[headerparts.length - 1])) : '';
    }
  };

  const headers: TableHeader[] | string = autoHeaders?.map((header) => {
    let label: string;
    let isSortable = true;
    let show = true;
    let isScreenReaderOnly = false;

    switch (typeof header) {
      case 'string':
        label = getLabel(header);
        break;

      default:
        const { isColumnSortable = true, isShown = true, screenReaderOnly = false } = header;
        label = getLabel(header);
        isSortable = isColumnSortable;
        show = isShown;
        isScreenReaderOnly = screenReaderOnly;
        break;
    }

    return {
      element: <span>{label}</span>,
      isColumnSortable: isSortable,
      isShown: show,
      screenReaderOnly: isScreenReaderOnly,
    };
  });

  const autoTableRows = (): AutoTableColumn[][] => {
    if (autoData.length < 1) return [[]];
    return tableData?.map((item) => {
      return autoHeaders?.map((header) => {
        let position = 'left';
        let show = true;
        switch (typeof header) {
          case 'string':
            break;

          default:
            const { isShown = true } = header;
            show = isShown;
            position = header?.columnPosition || 'left';
            break;
        }

        const value = getValue(item, header);

        let element = <div className={`w-full text-${position}`}>{value}</div>;
        if (typeof header !== 'string' && header.renderColumn) {
          element = header.renderColumn(value, item);
        }
        return { element: element, isShown: show };
      });
    });
  };

  const tableRows: AutoTableColumn[][] = autoTableRows();
  const _pages = 0;
  const highlightedItemIndex = 0;
  const tableSortable = true;
  const [managedRows, setManagedRows] = React.useState(tableRows);
  const [pages, setPages] = React.useState<number>(Math.ceil(_pages || tableRows.length / pageSize));

  const handleSort = React.useCallback((colIndex: number, asc: boolean) => {
    if (autoData.length < 1) return;
    const mode = asc ? 1 : -1;
    const value = getValue(tableData[0], autoHeaders[colIndex]);
    let sortedData = [...autoData];
    switch (typeof value) {
      case 'number':
        sortedData = sortedData.sort(
          (a, b) => getValue(asc ? a : b, autoHeaders[colIndex]) - getValue(asc ? b : a, autoHeaders[colIndex])
        );

        break;
      case 'string':
        sortedData = sortedData.sort((a, b) =>
          getValue(a, autoHeaders[colIndex]).toLowerCase() > getValue(b, autoHeaders[colIndex]).toLowerCase()
            ? 1 * mode
            : getValue(a, autoHeaders[colIndex]).toLowerCase() < getValue(b, autoHeaders[colIndex]).toLowerCase()
              ? -1 * mode
              : 0
        );
        break;
      default:
        sortedData = sortedData.sort((a, b) =>
          getValue(a, autoHeaders[colIndex]) > getValue(b, autoHeaders[colIndex])
            ? 1 * mode
            : getValue(a, autoHeaders[colIndex]) < getValue(b, autoHeaders[colIndex])
              ? -1 * mode
              : 0
        );
        break;
    }
    setTableData(sortedData);
  }, []);

  const internalSortHandler = (idx: number) => {
    setSortModeOrder(
      sortIndex === idx ? (sortModeOrder === sortMode.DESC ? sortMode.ASC : sortMode.DESC) : sortMode.ASC
    );
    setSortIndex(idx);
  };
  const [highlightedPage, setHighlightedPage] = React.useState<number>(0);

  React.useEffect(() => {
    handleSort(sortIndex, sortModeOrder === sortMode.DESC ? false : true);
  }, [sortIndex, sortModeOrder, handleSort]);

  React.useEffect(() => {
    setSortIndex(defaultSort.idx);
    setSortModeOrder(defaultSort.sortMode);
  }, []);

  React.useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  React.useEffect(() => {
    if (_pageSize) {
      setPageSize(_pageSize);
    }
  }, [_pageSize]);

  // React.useEffect(() => {
  //   changePage && changePage(currentPage);
  // }, [currentPage]);

  React.useEffect(() => {
    if (highlightedItemIndex !== undefined) {
      const itemPage = Math.floor(highlightedItemIndex / pageSize + 1);
      setHighlightedPage(itemPage);
      setCurrentPage(itemPage);
    }
  }, [highlightedItemIndex]);

  React.useEffect(() => {
    const newRows = [...tableRows];
    if (pages > 0) {
      const newPages = Math.ceil(tableRows.length / pageSize);
      setPages(newPages);
      if (newPages < currentPage) {
        setCurrentPage(newPages);
      }
      const pageNumber = newPages < currentPage ? newPages : currentPage;
      const startIndex = pageNumber * pageSize - pageSize;

      setManagedRows(newRows.slice(startIndex, startIndex + pageSize));
    } else {
      setManagedRows(newRows);
    }
  }, [pageSize, currentPage, pages, sortModeOrder, sortIndex]);

  return (
    <>
      {managedRows.length > 0 && (
        <Table {...args} summary={'data table'} data-dense={rowHeight === 'dense'}>
          <Table.Header background={true}>
            {headers.map((h, idx) =>
              h.isShown || h.isShown === null ? (
                <Table.HeaderColumn
                  key={`header-${idx}`}
                  aria-sort={`${sortIndex == idx ? sortModeOrder : 'none'}`}
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
                      <span>{h.element}</span>
                    </Table.SortButton>
                  ) : (
                    <span className={`sk-table-sortbutton ${h.screenReaderOnly ? `sr-only` : ``}`}>{h.element}</span>
                  )}
                </Table.HeaderColumn>
              ) : (
                <></>
              )
            )}
          </Table.Header>
          <tbody>
            {managedRows.map((cols, idx) => (
              <Table.Row
                key={`row${idx}`}
                className={`${
                  highlightedItemIndex !== undefined &&
                  highlightedItemIndex % pageSize === idx &&
                  highlightedPage === currentPage
                    ? `highlighted`
                    : ``
                }`}
              >
                {cols.map(({ element, isShown = true }, idx) =>
                  isShown ? (
                    <Table.Column key={`col${idx}`}>
                      <div className="sk-table-tbody-td-content">{element}</div>
                    </Table.Column>
                  ) : (
                    <> </>
                  )
                )}
              </Table.Row>
            ))}
          </tbody>
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
                pages={pages}
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
