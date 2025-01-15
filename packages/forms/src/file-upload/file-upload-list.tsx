import { Divider } from '@sk-web-gui/divider';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FileUploadListContext, FileUploadListContextProps } from './context';
import { FileUploadListItem } from './file-upload-list-item';
import { UploadFile } from './types';

export interface FileUploadListProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLUListElement>, 'color' | 'children'>,
    FileUploadListContextProps {
  files?: UploadFile[];
  placeholder?: React.ReactNode;

  children?: JSX.Element | JSX.Element[] | string;
}

export const FileUploadList = React.forwardRef<HTMLUListElement, FileUploadListProps>((props, ref) => {
  const {
    className,
    children,
    size = 'md',
    name = 'files',
    files,
    showBorder = false,
    placeholder = 'Inga filer valda',
    isEdit = false,
    showLabels,
    showIcon,
    iconProps,
    nameProps,
    categoryProps,
    actionsProps,
    ...rest
  } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useFormContext ? useFormContext() : null;
  const listItems: FileUploadListProps['files'] = files ? files : context && name ? context.watch(name) : null;

  const itemProps = {
    size,
    name,
    isEdit,
    showBorder,
    showLabels,
    showIcon,
    iconProps,
    nameProps,
    actionsProps,
    categoryProps,
    files: listItems,
  };

  const isEmpty =
    (!listItems || listItems.length === 0) && (!children || (Array.isArray(children) && children?.length === 0));

  return (
    <ul
      ref={ref}
      className={cx('sk-form-file-upload-list', className)}
      data-border={showBorder ? showBorder : undefined}
      data-size={size}
      data-isempty={isEmpty === true || undefined}
      {...rest}
    >
      {isEmpty ? placeholder : null}
      {!children ? (
        <FileUploadListContext.Provider value={itemProps}>
          {!showBorder && Array.isArray(listItems) ? (
            <>
              {listItems?.map((item, i) => {
                return (
                  <React.Fragment key={`${i}`}>
                    <FileUploadListItem file={item} index={i} {...itemProps} />
                    {i < listItems.length - 1 ? (
                      <li role="separator">
                        <Divider />
                      </li>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <>{listItems?.map((item, i) => <FileUploadListItem file={item} index={i} {...itemProps} />)}</>
          )}
        </FileUploadListContext.Provider>
      ) : (
        <FileUploadListContext.Provider value={itemProps}>
          {!showBorder && Array.isArray(children) ? (
            children.map((child, i) => {
              return (
                <React.Fragment key={`${i}`}>
                  {child}
                  {i < children.length - 1 ? (
                    <li role="separator">
                      <Divider />
                    </li>
                  ) : null}
                </React.Fragment>
              );
            })
          ) : (
            <>{children}</>
          )}
        </FileUploadListContext.Provider>
      )}
    </ul>
  );
});
