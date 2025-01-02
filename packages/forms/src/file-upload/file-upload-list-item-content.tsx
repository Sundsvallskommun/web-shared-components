import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { FileUploadListItemContentCategory } from './file-upload-list-item-content-category';
import { FileUploadListItemContentName } from './file-upload-list-item-content-name';

export interface FileUploadListItemContentProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  children?: React.ReactNode;
}

export const FileUploadListItemContent = React.forwardRef<HTMLDivElement, FileUploadListItemContentProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    if (!children) {
      return (
        <div ref={ref} className={cx('sk-form-file-upload-list-item-content', className)} {...rest}>
          <FileUploadListItemContentName />
          <FileUploadListItemContentCategory />
        </div>
      );
    } else {
      return (
        <div ref={ref} className={cx('sk-form-file-upload-list-item-content', className)} {...rest}>
          {children}
        </div>
      );
    }
  }
);
