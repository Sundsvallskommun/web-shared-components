import { Divider } from '@sk-web-gui/divider';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FileUploadListContext, FileUploadListContextProps } from './context';
import { FileUploadListItem, FileUploadListItemProps } from './file-upload-list-item';
import { UploadFile } from './types';
import { hooks } from './hooks';
export interface FileUploadListProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLUListElement>, 'color' | 'children'>,
    FileUploadListContextProps {
  files?: UploadFile[];
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  placeholder?: React.ReactNode;
  children?: React.JSX.Element | React.JSX.Element[] | string;
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
    sortable,
    showIcon,
    iconProps,
    nameProps,
    categoryProps,
    actionsProps,
    onMoveUp,
    onMoveDown,
    ...rest
  } = props;

  const { useSortableList } = hooks;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useFormContext ? useFormContext() : null;
  const listItems: FileUploadListProps['files'] = files ? files : context && name ? context.watch(name) : null;

  const isEmpty =
    (!listItems || listItems.length === 0) && (!children || (Array.isArray(children) && children?.length === 0));

  const {
    files: listItemsState,
    dragItemIndex,
    setDragItemIndex,
    dragOverIndex,
    setDragOverIndex,
    grabbedIndex,
    setGrabbedIndex,
    focusedIndex,
    setFocusedIndex,
    reorder: moveItem,
  } = useSortableList(listItems ?? []);

  const injectItemProps = (child: React.ReactNode, index: number): React.ReactNode => {
    if (!React.isValidElement<FileUploadListItemProps>(child)) return child;

    return React.cloneElement(child, {
      index: child.props.index ?? index,
    });
  };

  const itemProps = {
    size,
    name,
    isEdit,
    showBorder,
    showLabels,
    sortable,
    showIcon,
    iconProps,
    nameProps,
    actionsProps,
    categoryProps,
    files: listItemsState,
    onMoveUp: onMoveUp ?? ((index) => moveItem(index, index - 1)),
    onMoveDown: onMoveDown ?? ((index) => moveItem(index, index + 1)),
    dragItemIndex,
    setDragItemIndex,
    dragOverIndex,
    setDragOverIndex,
    grabbedIndex,
    setGrabbedIndex,
    focusedIndex,
    setFocusedIndex,
    moveItem,
  };

  return (
    <ul
      ref={ref}
      className={cx('sk-form-file-upload-list', className)}
      data-border={showBorder ? showBorder : undefined}
      data-size={size}
      data-isempty={isEmpty === true || undefined}
      data-sortable={sortable}
      {...rest}
    >
      {isEmpty ? <li>{placeholder}</li> : null}
      {!children ? (
        <FileUploadListContext.Provider value={itemProps}>
          {!showBorder && Array.isArray(listItems) ? (
            <>
              {listItemsState.map((item, i) => (
                <React.Fragment key={item.id ?? `${i}`}>
                  <FileUploadListItem file={item} index={i} {...itemProps} />
                  {i < listItemsState.length - 1 && (
                    <li role="separator">
                      <Divider />
                    </li>
                  )}
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              {listItemsState?.map((item, i) => (
                <FileUploadListItem key={item.id ?? `${i}`} file={item} index={i} {...itemProps} />
              ))}
            </>
          )}
        </FileUploadListContext.Provider>
      ) : (
        <FileUploadListContext.Provider value={itemProps}>
          {!showBorder && Array.isArray(children)
            ? children.map((child, i) => (
                <React.Fragment key={i}>
                  {injectItemProps(child, i)}
                  {i < children.length - 1 && (
                    <li role="separator">
                      <Divider />
                    </li>
                  )}
                </React.Fragment>
              ))
            : React.Children.map(children, injectItemProps)}
        </FileUploadListContext.Provider>
      )}
    </ul>
  );
});
