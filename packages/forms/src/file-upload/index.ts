import { __DEV__ } from '@sk-web-gui/utils';
import { defaults } from './defaults';
import { FileUploadArea } from './file-upload-area';
import { FileUploadButton, FileUploadButtonProps } from './file-upload-button';
import { FileUploadList } from './file-upload-list';
import { FileUploadListItem } from './file-upload-list-item';
import { FileUploadListItemActions } from './file-upload-list-item-actions';
import { FileUploadListItemContent } from './file-upload-list-item-content';
import { FileUploadListItemContentCategory } from './file-upload-list-item-content-category';
import { FileUploadListItemContentName } from './file-upload-list-item-content-name';
import { FileUploadListItemIcon } from './file-upload-list-item-icon';
import { hooks } from './hooks';
import { CustomOnChangeEventUploadFile, UploadFile } from './types';
import { utils } from './utils';
import { FileUploadField } from './file-upload-field';

interface FileUploadProps
  extends FileUploadButtonProps,
    React.ForwardRefExoticComponent<FileUploadButtonProps & React.RefAttributes<HTMLElement>> {
  Component: typeof FileUploadButton;
  Button: typeof FileUploadButton;
  List: typeof FileUploadList;
  ListItem: typeof FileUploadListItem;
  ListItemIcon: typeof FileUploadListItemIcon;
  ListItemContent: typeof FileUploadListItemContent;
  ListItemContentName: typeof FileUploadListItemContentName;
  ListItemContentCategory: typeof FileUploadListItemContentCategory;
  ListItemActions: typeof FileUploadListItemActions;
  Area: typeof FileUploadArea;
  Field: typeof FileUploadField;
  Utils: typeof utils;
  Hooks: typeof hooks;
  Defaults: typeof defaults;
}

export const FileUpload = FileUploadButton as FileUploadProps;

FileUpload.Component = FileUploadButton;
FileUpload.Button = FileUploadButton;
FileUpload.List = FileUploadList;
FileUpload.ListItem = FileUploadListItem;
FileUpload.ListItemIcon = FileUploadListItemIcon;
FileUpload.ListItemContent = FileUploadListItemContent;
FileUpload.ListItemContentName = FileUploadListItemContentName;
FileUpload.ListItemContentCategory = FileUploadListItemContentCategory;
FileUpload.ListItemActions = FileUploadListItemActions;
FileUpload.Area = FileUploadArea;
FileUpload.Field = FileUploadField;
FileUpload.Utils = utils;
FileUpload.Hooks = hooks;
FileUpload.Defaults = defaults;

if (__DEV__) {
  FileUpload.displayName = 'FileUpload';
}

export type { CustomOnChangeEventUploadFile, FileUploadProps, UploadFile };
export default FileUpload;
