import { Button } from '@sk-web-gui/button';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { Meta } from '@storybook/react';
import { Trash } from 'lucide-react';
import React from 'react';
import { FileUpload, FileUploadProps, Switch } from '../../src';

export default {
  title: 'Komponenter/FileUpload/ListItem',
  component: FileUpload.ListItem,
  tags: ['autodocs'],
  args: {
    actionsProps: {
      morePopupMenuPanel: (
        <PopupMenu.Panel>
          <PopupMenu.Items>
            <PopupMenu.Group>
              <PopupMenu.Item>
                <Button
                  onClick={() => {
                    console.log('Gör något');
                  }}
                >
                  Gör något
                </Button>
              </PopupMenu.Item>
            </PopupMenu.Group>
            <PopupMenu.Group>
              <PopupMenu.Item>
                <Button
                  onClick={() => {
                    console.log('Gör något annat');
                  }}
                >
                  Gör något annat
                </Button>
              </PopupMenu.Item>
            </PopupMenu.Group>
          </PopupMenu.Items>
        </PopupMenu.Panel>
      ),
    },
  },
} as Meta<typeof FileUpload.ListItem>;

export const Template = (args: React.ComponentProps<FileUploadProps['ListItem']>) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  return (
    <div className="min-h-[15rem] flex flex-col gap-lg">
      <Switch value={showEdit.toString()} checked={showEdit} onChange={() => setShowEdit((value) => !value)}>
        Visa redigeringspenna
      </Switch>
      <FileUpload.ListItem {...args} isEdit={args.isEdit === true ? args.isEdit : isEdit}>
        <FileUpload.ListItemIcon />
        <FileUpload.ListItemContent>
          <FileUpload.ListItemContentName heading="Heading" description="Description" />
          <FileUpload.ListItemContentCategory
            category="category1"
            categories={{
              category1: 'Category 1',
              category2: 'Category 2',
            }}
          />
        </FileUpload.ListItemContent>
        <FileUpload.ListItemActions
          showEdit={showEdit}
          onEdit={() => setIsEdit(true)}
          onEditSave={() => setIsEdit(false)}
          onEditCancel={() => setIsEdit(false)}
        />
      </FileUpload.ListItem>
    </div>
  );
};

Template.storyName = 'FileUpload.ListItem';

export const FileUploadListItemWithMorePanel = (args: React.ComponentProps<FileUploadProps['ListItem']>) => {
  return (
    <div className="min-h-[15rem]">
      <FileUpload.ListItem
        {...args}
        actionsProps={{
          ...args.actionsProps,
          showMore: true,
        }}
        nameProps={{
          heading: 'Heading',
          description: 'Description',
        }}
      />
    </div>
  );
};

export const FileUploadListItemIcon = () => {
  return <FileUpload.ListItemIcon icon={<Trash />} />;
};

export const FileUploadListItemContent = (args: React.ComponentProps<FileUploadProps['ListItem']>) => {
  return (
    <FileUpload.ListItemContent>
      <FileUpload.ListItemContentName heading="Heading" description="Description" />
      <FileUpload.ListItemContentCategory
        category="category1"
        categories={{
          category1: 'Category 1',
          category2: 'Category 2',
        }}
      />
    </FileUpload.ListItemContent>
  );
};

export const FileUploadListItemActions = (args: React.ComponentProps<FileUploadProps['ListItem']>) => {
  const handleOnRemove = () => {
    console.log('Ta bort');
  };

  return (
    <div className="w-full flex items-start justify-end min-h-[15rem]">
      <FileUpload.ListItemActions
        showRemove
        onRemove={handleOnRemove}
        showMore
        morePopupMenuPanel={args.actionsProps?.morePopupMenuPanel}
      />
    </div>
  );
};
