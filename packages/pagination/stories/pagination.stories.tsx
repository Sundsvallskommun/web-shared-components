import { useState } from 'react';
import { Pagination, PaginationProps } from '../src';
import React from 'react';

export default {
  title: 'Komponenter/Pagination/Komponent',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    pages: 11,
    activePage: 1,
    showFirst: true,
    showLast: true,
    pagesBefore: 2,
    pagesAfter: 2,
  },
};

export const Template = (args: PaginationProps) => {
  const [paginationPage, setPaginationPage] = useState<number>(args.activePage);
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
