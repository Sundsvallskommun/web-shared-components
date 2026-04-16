import React from 'react';
import { FileUploadListItemActions } from './file-upload-list-item-actions';
import { FileUploadListItemContentCategory } from './file-upload-list-item-content-category';
import { FileUploadListItemContentName } from './file-upload-list-item-content-name';
import { FileUploadListItemIcon } from './file-upload-list-item-icon';
import { UploadFile } from './types';

export interface FileUploadListItemContextProps {
  index: number;
  /** @default false */
  isEdit?: boolean;
  name?: string;
  file?: UploadFile;
  uploadProgress?: number;
  /** @default false */
  showLabels?: boolean;
  /** @default true */
  showIcon?: boolean;
  iconProps?: React.ComponentProps<typeof FileUploadListItemIcon>;
  nameProps?: React.ComponentProps<typeof FileUploadListItemContentName>;
  actionsProps?: React.ComponentProps<typeof FileUploadListItemActions>;
  categoryProps?: React.ComponentProps<typeof FileUploadListItemContentCategory>;
}
export const FileUploadListItemContext = React.createContext<FileUploadListItemContextProps>({ index: 0 });

export interface FileUploadListContextProps {
  /** @default false */
  showBorder?: boolean;
  size?: 'sm' | 'md';
  name?: string;
  isEdit?: boolean;
  /** @default false */
  showLabels?: boolean;
  /** @default false */
  sortable?: boolean;
  /** @default true */
  showIcon?: boolean;
  iconProps?: React.ComponentProps<typeof FileUploadListItemIcon>;
  nameProps?: React.ComponentProps<typeof FileUploadListItemContentName>;
  actionsProps?: React.ComponentProps<typeof FileUploadListItemActions>;
  categoryProps?: React.ComponentProps<typeof FileUploadListItemContentCategory>;
  files?: UploadFile[];
}

export interface FileUploadListContextValue extends FileUploadListContextProps {
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  dragItemIndex?: number | null;
  dragOverIndex?: number | null;
  setDragItemIndex?: (index: number | null) => void;
  setDragOverIndex?: (index: number | null) => void;
  focusedIndex?: number | null;
  setFocusedIndex?: (index: number | null) => void;
  moveItem?: (from: number, to: number) => void;
}
export const FileUploadListContext = React.createContext<FileUploadListContextValue>({
  name: 'files',
  size: 'md',
  isEdit: false,
  showBorder: false,
});
