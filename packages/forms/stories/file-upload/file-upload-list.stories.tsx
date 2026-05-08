import { Meta } from '@storybook/react';
import React from 'react';
import { FileUpload, FileUploadProps, UploadFile } from '../../src';

export default {
  title: 'Komponenter/FileUpload/List',
  component: FileUpload.List,
  tags: ['autodocs'],
} as Meta<typeof FileUpload.List>;

const files: UploadFile[] = [
  {
    id: '1',
    file: new File([''], 'Bild1.png', { type: 'image/png' }),
    meta: { name: 'Bild1', ending: 'png', category: 'category1' },
  },
  {
    id: '2',
    file: new File([''], 'Bild2.png', { type: 'image/png' }),
    meta: { name: 'Bild2', ending: 'png', category: 'category2' },
  },
  {
    id: '3',
    file: new File([''], 'Bild3.png', { type: 'image/png' }),
    meta: { name: 'Bild3', ending: 'png', category: 'category2' },
  },
];

export const Template = (args: React.ComponentProps<FileUploadProps['List']>) => {
  return (
    <FileUpload.List
      {...args}
      files={files}
      iconProps={{ showPreview: false }}
      categoryProps={{
        categories: {
          category1: 'Category 1',
          category2: 'Category 2',
        },
      }}
    />
  );
};

Template.storyName = 'FileUpload.List';

export const FileUploadListNoItems = (args: React.ComponentProps<FileUploadProps['List']>) => {
  return <FileUpload.List {...args} />;
};
