import { TableComponent, TableComponentProps } from './table';
import { TableFooter } from './table-footer';
import { TableHeader } from './table-header';
import { TableHeaderColumn } from './table-header-column';
import { TableRow } from './table-row';
import { TableRowColumn } from './table-row-column';

interface TableProps extends TableComponentProps, React.ForwardRefExoticComponent<TableComponentProps> {
  Component: typeof TableComponent;
  Header: typeof TableHeader;
  HeaderColumn: typeof TableHeaderColumn;
  TableRow: typeof TableRow;
  TableRowColumn: typeof TableRowColumn;
  TableFooter: typeof TableFooter;
}

const Table = {
  ...TableComponent,
  Component: TableComponent,
  Header: TableHeader,
  HeaderColumn: TableHeaderColumn,
  TableRow: TableRow,
  TableRowColumn: TableRowColumn,
  TableFooter: TableFooter,
} as TableProps;

export { Table };
export type { TableProps };
export default Table;
