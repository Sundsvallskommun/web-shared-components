import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import { File, Image } from 'lucide-react';
import React from 'react';
import { defaults } from './defaults';
import { UploadFile } from './types';
import { FileUploadListContext, FileUploadListItemContext } from './context';

interface FileIconProps {
  file?: UploadFile;
  showPreview: boolean;
}

const FileIcon = ({ file, showPreview }: FileIconProps) => {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file?.file && showPreview) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file.file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file?.file]);

  if (file) {
    if (file.file.type) {
      if (defaults.imageMimeTypes.includes(file.file.type)) {
        if (preview) {
          return <img src={preview} aria-hidden="true" style={{ maxWidth: '100%' }} />;
        } else {
          return <Icon icon={<Image />} />;
        }
      } else if (defaults.documentMimeTypes.includes(file.file.type)) {
        return <Icon icon={<File />} />;
      }
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
  /** @default true */
  showPreview?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
}

export const FileUploadListItemIcon = React.forwardRef<HTMLDivElement, FileUploadListItemIconProps>((props, ref) => {
  const {
    className,
    children,
    size: _size,
    file: _file,
    icon: _icon,
    showIcon: _showIcon,
    showPreview: _showPreview = true,
    ...rest
  } = props;
  const listContext = React.useContext(FileUploadListContext);
  const size = _size ?? listContext?.size ?? 'md';
  const itemContext = React.useContext(FileUploadListItemContext);
  const showIcon = _showIcon ?? itemContext?.showIcon ?? listContext?.showIcon ?? true;
  const file = _file ?? itemContext?.file;
  const icon = _icon ?? itemContext?.iconProps?.icon;
  const showPreview = _showPreview ?? itemContext?.iconProps?.showPreview ?? listContext?.iconProps?.showPreview;

  if (!showIcon) return null;

  if (!children) {
    return (
      <div ref={ref} className={cx('sk-form-file-upload-list-item-icon', className)} data-size={size} {...rest}>
        {icon ? icon : <FileIcon file={file} showPreview={showPreview} />}
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
