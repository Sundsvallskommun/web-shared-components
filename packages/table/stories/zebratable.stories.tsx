import React, { Fragment } from 'react';
import { Meta } from '@storybook/react';
import { ZebraTable, ZebraTableColumn, ZebraTableHeader, ZebraTableProps} from "../src/zebratable";

export default {
  title: "Komponenter/Tabeller/ZebraTable",
  component: ZebraTable,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta;

const ongoingCaseLabels: any = [
  { label: 'Ärende', screenReaderOnly: false, sortable: true },
  { label: 'ID', screenReaderOnly: false, sortable: true },
  { label: 'Status', screenReaderOnly: false, sortable: true },
  { label: 'Ärendeknapp', screenReaderOnly: true, sortable: false },
];

const ongoingCases: any = {
  "data": [
    {
      "caseType": "Trasig bänk",
      "id": "000-0005",
      "status": "Inskickat",
    },
    {
      "caseType": "Skräp i parken",
      "id": "000-0006",
      "status": "Inskickat",
    },
    {
      "caseType": "Tillstånd",
      "id": "000-0007",
      "status": "Inskickat",
    }
  ],
  "message": "success"
}

const headers: ZebraTableHeader[] = ongoingCaseLabels.map((l:any, idx: number) => ({
  element: <span key={`mh${idx}`}>{l.label}</span>,
  isShown: true,
  isColumnSortable: l.sortable,
  screenReaderOnly: l.screenReaderOnly,
}));

const rows: ZebraTableColumn[][] = ongoingCases.data.map((r:any, idx: number) => [
  {
    element: (
      <div key={`mr${idx}`} className="w-80">
        <span className="inline lg:hidden">Ärendetyp: </span>
        <div>
          <strong>{r.caseType}</strong>
        </div>
      </div>
    ),
    isShown: true,
  },
  {
    element: (
      <Fragment key={`mr${idx}`}>
        <span className="inline lg:hidden">ID: </span>
        <span>{r.id}</span>
      </Fragment>
    ),
    isShown: true,
  },
  {
    element: (
      <Fragment key={`mr${idx}`}>
        <span className="inline lg:sr-only">Status: </span>
        <span>
          {r.status}
        </span>
      </Fragment>
    ),
    isShown: true,
  },
  {
    element: (
      <button
        aria-label={`Till ärende ${r.id}`}
        key={`mr${idx}`}
        color="primary"
        className="w-full bg-primary p-3 text-white lg:w-64 rounded-lg"
      >
        Till ärendet
      </button>
    ),
    isShown: true,
  },
]);



export const Template = (args: ZebraTableProps) => <ZebraTable
headers={headers}
rows={[
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
  ...rows,
]}
tableSortable={true}
sortHandler={()=> console.log('sort')}
/>;

Template.argTypes = {

};

Template.story = { name: 'ZebraTable' };
