import { FormControl, FormLabel } from '@sk-web-gui/forms';
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
      <Pagination {...args} activePage={paginationPage} changePage={setPaginationPage} />
    </div>
  );
};

Template.storyName = 'Komponent';

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
};
