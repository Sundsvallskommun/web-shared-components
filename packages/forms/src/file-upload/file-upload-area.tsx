import { Icon } from '@sk-web-gui/icon';
import { cx, DefaultProps } from '@sk-web-gui/utils';
import { Upload } from 'lucide-react';
import React from 'react';
import { hooks, UseAddFilesProps } from './hooks';

export interface FileUploadAreaProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children' | 'onChange' | 'onInvalid'>,
    UseAddFilesProps {
  /** @default true */
  dragDropEnabled?: boolean;
  /** @default viewport */
  relativity?: 'viewport' | 'component';
  children: React.JSX.Element | React.JSX.Element[] | string;
}

export const FileUploadArea = React.forwardRef<HTMLDivElement, FileUploadAreaProps>((props, ref) => {
  const {
    className,
    children,
    dragDropEnabled = true,
    relativity = 'viewport',
    // useAddFilesProps
    onChange,
    onInvalid,
    onValid,
    name,
    allowMultiple,
    maxFileSizeMB,
    accept,
    appendFiles,
    appendToContext,
    ...rest
  } = props;
  const [isDragging, setIsDragging] = React.useState(false);

  const { addFiles } = hooks.useAddFiles({
    name,
    onChange,
    onInvalid,
    onValid,
    allowMultiple,
    maxFileSizeMB,
    accept,
    appendFiles,
    appendToContext,
  });

  const handleDragFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };
  const handleDragFileEnd = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
    event.preventDefault();
  };

  const handleDropFile = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
    setIsDragging(false);
  };

  if (dragDropEnabled) {
    return (
      <div ref={ref} className={cx('sk-form-file-upload-area', className)} data-relativity={relativity} {...rest}>
        <div className="sk-form-file-upload-area-children" onDragEnter={handleDragFile}>
          {children}
        </div>
        {isDragging && (
          <div
            className="sk-form-file-upload-area-overlay"
            data-isdragging={isDragging.toString()}
            onDrop={handleDropFile}
            onDragOver={handleDragFile}
            onDragLeave={handleDragFileEnd}
            onClick={() => setIsDragging(false)}
          >
            <div className="sk-form-file-upload-area-overlay-content">
              <div className="sk-form-file-upload-area-overlay-content-icon-wrapper">
                <Icon icon={<Upload className="sk-form-file-upload-area-overlay-content-icon" />} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div ref={ref} className={cx('sk-form-file-upload-area', className)} {...rest}>
        {children}
      </div>
    );
  }
});
