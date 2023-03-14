import { __DEV__ } from '@sk-web-gui/utils';
import _ from 'lodash';
import * as React from 'react';
import { IZebraTableProps, ZebraTable, ZebraTableColumn, ZebraTableHeader } from './zebratable';

export interface DataTableHeader {
  property?: string;
  label?: string;
  isColumnSortable?: boolean;
  isShown?: boolean;
  columnPosition?: 'left' | 'center' | 'right';
  renderColumn?: (value: any, item: any) => JSX.Element;
}

interface IDataTableProps extends Omit<IZebraTableProps, 'headers' | 'rows'> {
  headers: Array<DataTableHeader | string>;
  data: Array<any>;
}
export type DataTableProps = IDataTableProps & React.HTMLAttributes<HTMLTableElement>;

export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>((props, ref) => {
  const { data, headers, ...rest } = props;
  const [tableData, setTableData] = React.useState<any[]>(data);

  const getValue = (item: any, header: string | DataTableHeader) => {
    let headerparts = [];

    switch (typeof header) {
      case 'string':
        headerparts = header.split('.');
        break;

      default:
        headerparts = header?.property ? header?.property.split('.') : [];
        break;
    }
    const value = headerparts.reduce((value: any, headerpart) => {
      if (value) {
        return value[headerpart];
      }

      return item[headerpart];
    }, null);

    return value;
  };

  const getLabel = (header: DataTableHeader) => {
    const headerParts = header?.property ? header.property.split('.') : [];
    return headerParts.length ? _.upperFirst(_.lowerCase(headerParts[headerParts.length - 1])) : '';
  };

  const zebraTableHeaders: ZebraTableHeader[] = headers.map((header) => {
    let label: string;
    let isSortable = true;
    let show = true;

    switch (typeof header) {
      case 'string':
        const headerParts = header.split('.');
        label = _.upperFirst(_.lowerCase(headerParts[headerParts.length - 1]));
        break;

      default:
        const { isColumnSortable = true, isShown = true } = header;
        label = header.label || getLabel(header);
        isSortable = isColumnSortable;
        show = isShown;
        break;
    }

    return {
      element: <span>{label}</span>,
      isColumnSortable: isSortable,
      isShown: show,
    };
  });

  const zebraTableRows = (): ZebraTableColumn[][] => {
    if (data.length < 1) return [[]];
    return tableData.map((item) => {
      return headers.map((header) => {
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

  const handleSort = React.useCallback(
    (colIndex: number, asc: boolean) => {
      if (data.length < 1) return;

      const mode = asc ? 1 : -1;
      const value = getValue(tableData[0], headers[colIndex]);
      let sortedData = [...data];
      switch (typeof value) {
        case 'number':
          sortedData = sortedData.sort(
            (a, b) => getValue(asc ? a : b, headers[colIndex]) - getValue(asc ? b : a, headers[colIndex])
          );

          break;
        case 'string':
          sortedData = sortedData.sort((a, b) =>
            getValue(a, headers[colIndex]).toLowerCase() > getValue(b, headers[colIndex]).toLowerCase()
              ? 1 * mode
              : getValue(a, headers[colIndex]).toLowerCase() < getValue(b, headers[colIndex]).toLowerCase()
              ? -1 * mode
              : 0
          );
          break;
        default:
          sortedData = sortedData.sort((a, b) =>
            getValue(a, headers[colIndex]) > getValue(b, headers[colIndex])
              ? 1 * mode
              : getValue(a, headers[colIndex]) < getValue(b, headers[colIndex])
              ? -1 * mode
              : 0
          );
          break;
      }
      setTableData(sortedData);
    },
    [data]
  );

  return (
    <ZebraTable ref={ref} headers={zebraTableHeaders} rows={zebraTableRows()} sortHandler={handleSort} {...rest} />
  );
});

if (__DEV__) {
  DataTable.displayName = 'DataTable';
}