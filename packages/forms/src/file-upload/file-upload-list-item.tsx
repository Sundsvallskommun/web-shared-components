import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { FileUploadListItemActions } from './file-upload-list-item-actions';
import { FileUploadListItemContent } from './file-upload-list-item-content';
import { FileUploadListItemContentCategory } from './file-upload-list-item-content-category';
import { FileUploadListItemContentName } from './file-upload-list-item-content-name';
import { FileUploadListItemIcon } from './file-upload-list-item-icon';
import { useFormContext } from 'react-hook-form';
import { FileUploadListContext, FileUploadListItemContext, FileUploadListItemContextProps } from './context';

export interface FileUploadListItemProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'color' | 'children'>,
    FileUploadListItemContextProps {
  /** @default false */
  showBorder?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
}

export const FileUploadListItem = React.forwardRef<HTMLLIElement, FileUploadListItemProps>((props, ref) => {
  const {
    className,
    children,
    file: _file,
    name: _name,
    index,
    isEdit: _isEdit,
    uploadProgress,
    showBorder: _showBorder,
    showLabels: _showLabels,
    showIcon: _showIcon,
    // Name
    nameProps: _nameProps,
    // Icon
    iconProps: _iconProps,
    // Actions
    actionsProps: _actionsProps,
    // Category
    categoryProps: _categoryProps,
    ...rest
  } = props;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formContext = useFormContext ? useFormContext() : null;
  const listContext = React.useContext(FileUploadListContext);
  const name = _name ?? listContext?.name;
  const isEdit = (uploadProgress !== undefined ? false : undefined) ?? _isEdit ?? listContext?.isEdit;
  const size = listContext?.size;
  const showBorder = _showBorder ?? listContext?.showBorder;
  const showIcon = _showIcon ?? listContext?.showIcon;
  const showLabels = _showLabels ?? listContext?.showLabels;

  const nameProps = { ...listContext?.nameProps, ..._nameProps };
  const iconProps = { ...listContext?.iconProps, ..._iconProps };
  const actionsProps = { ...listContext?.actionsProps, ..._actionsProps };
  const categoryProps = { ...listContext?.categoryProps, ..._categoryProps };

  const fullName = `${name}.${index}`;
  const file = _file ?? listContext?.files?.[index] ?? (formContext ? formContext?.watch(`${fullName}`) : undefined);

  React.useEffect(() => {
    if (formContext) {
      formContext?.setValue(`${fullName}`, file);
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [fullName]);

  const progressAmount = uploadProgress ? Math.min(100, Math.max(0, uploadProgress)) : 0;

  const itemContext = {
    name,
    index,
    isEdit,
    file,
    showIcon,
    showLabels,
    uploadProgress,
    iconProps,
    nameProps,
    actionsProps,
    categoryProps,
  };

  return (
    <FileUploadListItemContext.Provider value={itemContext}>
      <li
        ref={ref}
        className={cx('sk-form-file-upload-list-item', className)}
        data-border={showBorder ? showBorder : undefined}
        data-size={size}
        data-isedit={isEdit}
        {...rest}
      >
        <div className="sk-form-file-upload-list-item-innerwrapper">
          {children ? (
            children
          ) : (
            <>
              <FileUploadListItemIcon {...iconProps} />
              <FileUploadListItemContent>
                <FileUploadListItemContentName {...nameProps} />
                {categoryProps?.categories ? <FileUploadListItemContentCategory {...categoryProps} /> : null}
              </FileUploadListItemContent>
              <FileUploadListItemActions {...actionsProps} />
            </>
          )}
        </div>
        {uploadProgress !== undefined ? (
          <div className="sk-form-file-upload-list-item-progress">
            <div className="sk-form-file-upload-list-item-progress-bar">
              <div
                className="sk-form-file-upload-list-item-progress-bar-amount"
                style={{ width: `${progressAmount}%` }}
              ></div>
            </div>
            <div className="sk-form-file-upload-list-item-progress-text">{`${progressAmount}%`}</div>
          </div>
        ) : null}
      </li>
    </FileUploadListItemContext.Provider>
  );
});
