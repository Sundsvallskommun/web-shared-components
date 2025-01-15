import { TableComponent, TableComponentProps } from './table';
import { TableFooter } from './table-footer';
import { TableHeader } from './table-header';
import { TableHeaderColumn } from './table-header-column';
import { TableBody } from './table-body';
import { TableRow } from './table-row';
import { TableRowColumn } from './table-row-column';
import { TableSortButton } from './table-sort-button';
import AutoTable, { AutoTableProps, AutoTableHeader } from './auto-table';
import { SortMode } from './types';

interface TableProps extends TableComponentProps, React.ForwardRefExoticComponent<TableComponentProps> {
  Component: typeof TableComponent;
  Header: typeof TableHeader;
  HeaderColumn: typeof TableHeaderColumn;
  SortButton: typeof TableSortButton;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Column: typeof TableRowColumn;
  Footer: typeof TableFooter;
}

const Table = {
  ...TableComponent,
  Component: TableComponent,
  Header: TableHeader,
  HeaderColumn: TableHeaderColumn,
  SortButton: TableSortButton,
  Body: TableBody,
  Row: TableRow,
  Column: TableRowColumn,
  Footer: TableFooter,
} as TableProps;

export { Table, AutoTable, SortMode };
export type { TableProps, AutoTableProps, AutoTableHeader };
export default Table;
