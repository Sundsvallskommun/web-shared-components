import { useState } from 'react';
import { Pagination } from '../src';

export default {
  title: 'Komponenter/Pagination/Komponent',
  component: Pagination,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export const Template = ({ ...args }: any) => {
  const [paginationPage, setPaginationPage] = useState<number>(1);
  return (
    <div>
      <div>paginationPage: {paginationPage}</div>
      <div>
        <button className="p-sm my-md border rounded-lg text-white bg-primary" onClick={() => setPaginationPage(3)}>
          Go to page 3 from parent
        </button>
      </div>
      <div className="w-full">
        <Pagination {...args} activePage={paginationPage} changePage={setPaginationPage} />
      </div>
    </div>
  );
};

Template.storyName = 'Pagination';

Template.argTypes = {
  pages: {
    type: { name: 'string', required: true },
    description: 'Sets total pages',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'number',
    defaultValue: 11,
  },
  activePage: {
    type: { name: 'string', required: true },
    description: 'Sets active page',
    table: {
      defaultValue: { summary: '1' },
    },
    control: 'number',
    defaultValue: 1,
  },
  pagesBefore: {
    type: { name: 'string', required: true },
    description: 'Number of pages to display before active page',
    table: {
      defaultValue: { summary: '2' },
    },
    control: 'number',
    defaultValue: 2,
  },
  pagesAfter: {
    type: { name: 'string', required: true },
    description: 'Number of pages to display after active page',
    table: {
      defaultValue: { summary: '2' },
    },
    control: 'number',
    defaultValue: 2,
  },
  changePage: {
    type: { name: 'function', required: true },
    description: 'Sends page number to parent',
    table: {
      defaultValue: { summary: '() => {}' },
    },
    control: 'function',
    defaultValue: () => {},
  },
  size: {
    type: { name: 'string', required: false },
    description: 'Sets size',
    table: {
      defaultValue: { summary: 'md' },
    },
    options: ['sm', 'md', 'lg'],
    control: 'select',
    defaultValue: 'md',
  },
  showFirst: {
    type: { name: 'boolean', required: false },
    description: 'Always show first page',
    table: {
      defaultValue: { summary: 'true' },
    },
    control: 'boolean',
    defaultValue: true,
  },
  showLast: {
    type: { name: 'boolean', required: false },
    description: 'Always show last page',
    table: {
      defaultValue: { summary: 'true' },
    },
    control: 'boolean',
    defaultValue: true,
  },
  nextLabel: {
    type: { name: 'string', required: false },
    description: 'Label on next button',
    table: {
      defaultValue: { summary: 'Nästa' },
    },
    control: 'text',
    defaultValue: 'Nästa',
  },
  prevLabel: {
    type: { name: 'string', required: false },
    description: 'Label on previous button',
    table: {
      defaultValue: { summary: 'Föregående' },
    },
    control: 'text',
    defaultValue: 'Föregående',
  },
  fitContainer: {
    type: { name: 'boolean', required: false },
    description: 'Stretch pagination to fit container',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  showConstantPages: {
    type: { name: 'boolean', required: false },
    description: 'Always show same number of pages',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
  asSelect: {
    type: { name: 'boolean', required: false },
    description: 'Show as Select',
    table: {
      defaultValue: { summary: 'false' },
    },
    control: 'boolean',
    defaultValue: false,
  },
};
