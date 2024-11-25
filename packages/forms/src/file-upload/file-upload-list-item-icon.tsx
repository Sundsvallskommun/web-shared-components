import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import { File, Image } from 'lucide-react';
import React from 'react';
import { defaults } from './defaults';
import { FileUploadListContext } from './file-upload-list';
import { FileUploadListItemContext } from './file-upload-list-item';
import { UploadFile } from './types';

type UploadFileType = (typeof defaults.acceptedMimeTypes)[number] | string;

interface FileIconProps {
  type?: UploadFileType;
}

const FileIcon = ({ type }: FileIconProps) => {
  if (type) {
    if (defaults.imageMimeTypes.includes(type)) {
      return <Image />;
    } else if (defaults.documentMimeTypes.includes(type)) {
      return <File />;
    }
  }
  return <File />;
};

export interface FileUploadListItemIconProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  /** @default md */
  size?: 'sm' | 'md';
  file?: UploadFile;
  icon?: React.ReactElement;
  /** @default true */
  showIcon?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
}

export const FileUploadListItemIcon = React.forwardRef<HTMLDivElement, FileUploadListItemIconProps>((props, ref) => {
  const { className, children, size: _size, file: _file, icon: _icon, showIcon: _showIcon, ...rest } = props;
  const listContext = React.useContext(FileUploadListContext);
  const size = _size ?? listContext?.size ?? 'md';
  const itemContext = React.useContext(FileUploadListItemContext);
  const showIcon = _showIcon ?? itemContext?.showIcon ?? listContext?.showIcon ?? true;
  const file = _file ?? itemContext?.file;
  const icon = _icon ?? itemContext?.iconProps?.icon;

  if (!showIcon) return null;

  if (!children) {
    return (
      <div ref={ref} className={cx('sk-form-file-upload-list-item-icon', className)} data-size={size} {...rest}>
        <Icon icon={icon ? icon : <FileIcon type={file?.file.type} />} />
      </div>
    );
  } else {
    return (
      <div ref={ref} className={cx('sk-form-file-upload-list-item-icon', className)} data-size={size} {...rest}>
        {children}
      </div>
    );
  }
});
