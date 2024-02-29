import { TableComponent, TableComponentProps } from './table';
import { TableFooter } from './table-footer';
import { TableHeader } from './table-header';
import { TableHeaderColumn } from './table-header-column';
import { TableRow } from './table-row';
import { TableRowColumn } from './table-row-column';
import { TableSortButton } from './table-sort-button';
import AutoTable, { AutoTableProps } from './auto-table';

interface TableProps extends TableComponentProps, React.ForwardRefExoticComponent<TableComponentProps> {
  Component: typeof TableComponent;
  Header: typeof TableHeader;
  HeaderColumn: typeof TableHeaderColumn;
  SortButton: typeof TableSortButton;
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
  Row: TableRow,
  Column: TableRowColumn,
  Footer: TableFooter,
} as TableProps;

export { Table, AutoTable };
export type { TableProps, AutoTableProps };
export default Table;
