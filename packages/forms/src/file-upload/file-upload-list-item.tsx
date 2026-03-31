import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { FileUploadListItemActions } from './file-upload-list-item-actions';
import { FileUploadListItemContent } from './file-upload-list-item-content';
import { FileUploadListItemContentCategory } from './file-upload-list-item-content-category';
import { FileUploadListItemContentName } from './file-upload-list-item-content-name';
import { FileUploadListItemIcon } from './file-upload-list-item-icon';
import { useFormContext } from 'react-hook-form';
import { FileUploadListContext, FileUploadListItemContext, FileUploadListItemContextProps } from './context';
import Icon from '@sk-web-gui/icon';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Button from '@sk-web-gui/button';

export interface FileUploadListItemProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'color' | 'children'>,
    FileUploadListItemContextProps {
  /** @default false */
  showBorder?: boolean;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  dragItemIndex?: number | null;
  dragOverIndex?: number | null;
  setDragItemIndex?: (index: number | null) => void;
  setDragOverIndex?: (index: number | null) => void;
  grabbedIndex?: number | null;
  setGrabbedIndex?: (index: number | null) => void;
  focusedIndex?: number | null;
  setFocusedIndex?: (index: number | null) => void;
  moveItem?: (from: number, to: number) => void;
  children?: React.JSX.Element | React.JSX.Element[] | string;
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
    onMoveUp: _onMoveUp,
    onMoveDown: _onMoveDown,
    dragItemIndex: _dragItemIndex,
    dragOverIndex: _dragOverIndex,
    setDragItemIndex: _setDragItemIndex,
    setDragOverIndex: _setDragOverIndex,
    grabbedIndex: _grabbedIndex,
    setGrabbedIndex: _setGrabbedIndex,
    setFocusedIndex: _setFocusedIndex,
    moveItem: _moveItem,
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
  const onMoveUp = _onMoveUp ?? listContext?.onMoveUp;
  const onMoveDown = _onMoveDown ?? listContext?.onMoveDown;
  const dragItemIndex = _dragItemIndex ?? listContext?.dragItemIndex;
  const dragOverIndex = _dragOverIndex ?? listContext?.dragOverIndex;
  const setDragItemIndex = _setDragItemIndex ?? listContext?.setDragItemIndex;
  const setDragOverIndex = _setDragOverIndex ?? listContext?.setDragOverIndex;
  const grabbedIndex = _grabbedIndex ?? listContext?.grabbedIndex;
  const setGrabbedIndex = _setGrabbedIndex ?? listContext?.setGrabbedIndex;
  const setFocusedIndex = _setFocusedIndex ?? listContext?.setFocusedIndex;
  const moveItem = _moveItem ?? listContext?.moveItem;
  const showIcon = _showIcon ?? listContext?.showIcon;
  const showLabels = _showLabels ?? listContext?.showLabels;
  const sortable = listContext?.sortable;
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
    sortable,
    uploadProgress,
    iconProps,
    nameProps,
    actionsProps,
    categoryProps,
    dragItemIndex,
  };

  const sortableHandler = sortable ? (
    <div className="sk-form-file-upload-list-item-sort">
      <Button iconButton variant="secondary" rounded={true} onClick={() => onMoveUp?.(index)}>
        <Icon icon={<ArrowUp />} />
      </Button>
      <Button iconButton variant="secondary" rounded={true} onClick={() => onMoveDown?.(index)}>
        <Icon icon={<ArrowDown />} />
      </Button>
    </div>
  ) : null;

  const handleOnDragEnd = () => {
    if (dragItemIndex != null && dragOverIndex != null) {
      moveItem?.(dragItemIndex, dragOverIndex);
    }

    setDragItemIndex?.(null);
    setDragOverIndex?.(null);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (!sortable) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setGrabbedIndex?.(grabbedIndex === index ? null : index);
    }

    if (grabbedIndex == null) return;

    if (e.key === 'ArrowUp' && grabbedIndex > 0) {
      e.preventDefault();
      moveItem?.(grabbedIndex, grabbedIndex - 1);
      setGrabbedIndex?.(grabbedIndex - 1);
    }

    if (e.key === 'ArrowDown' && grabbedIndex < (listContext?.files?.length ?? 0) - 1) {
      e.preventDefault();
      moveItem?.(grabbedIndex, grabbedIndex + 1);
      setGrabbedIndex?.(grabbedIndex + 1);
    }
  };

  return (
    <FileUploadListItemContext.Provider value={itemContext}>
      <li
        ref={ref}
        className={cx('sk-form-file-upload-list-item', className)}
        data-border={showBorder ? showBorder : undefined}
        data-size={size}
        data-isedit={isEdit}
        draggable={sortable}
        tabIndex={0}
        onFocus={() => setFocusedIndex?.(index)}
        onBlur={() => setFocusedIndex?.(null)}
        onDragStart={() => setDragItemIndex?.(index)}
        onDragEnter={() => setDragOverIndex?.(index)}
        onDragEnd={handleOnDragEnd}
        onKeyDown={(e) => handleOnKeyDown(e)}
        onDragOver={(e) => e.preventDefault()}
        {...rest}
      >
        <div className="sk-form-file-upload-list-item-innerwrapper">
          {children ? (
            <>
              {children}
              {sortableHandler}
            </>
          ) : (
            <>
              <FileUploadListItemIcon {...iconProps} />
              <FileUploadListItemContent>
                <FileUploadListItemContentName {...nameProps} />
                {categoryProps?.categories ? <FileUploadListItemContentCategory {...categoryProps} /> : null}
              </FileUploadListItemContent>
              <FileUploadListItemActions {...actionsProps} />
              {sortableHandler}
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
