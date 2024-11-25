import { Meta } from '@storybook/react';
import React from 'react';
import { FileUpload, FileUploadProps } from '../../src';

export default {
  title: 'Komponenter/FileUpload/List',
  component: FileUpload.List,
  tags: ['autodocs'],
} as Meta<typeof FileUpload.List>;

export const Template = (args: React.ComponentProps<FileUploadProps['List']>) => {
  return (
    <FileUpload.List {...args}>
      <FileUpload.ListItem index={0}>
        <FileUpload.ListItemIcon />
        <FileUpload.ListItemContent>
          <FileUpload.ListItemContentName heading="Bild1.png" description="placeholder" />
          <FileUpload.ListItemContentCategory
            category="category1"
            categories={{
              category1: 'Category 1',
              category2: 'Category 2',
            }}
          />
        </FileUpload.ListItemContent>
        <FileUpload.ListItemActions />
      </FileUpload.ListItem>
    </FileUpload.List>
  );
};

Template.storyName = 'FileUpload.List';

export const FileUploadListNoItems = (args: React.ComponentProps<FileUploadProps['List']>) => {
  return <FileUpload.List />;
};
