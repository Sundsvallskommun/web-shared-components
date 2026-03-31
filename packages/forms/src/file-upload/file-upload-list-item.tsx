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

  const moveUpRef = React.useRef<HTMLButtonElement>(null);
  const moveDownRef = React.useRef<HTMLButtonElement>(null);

  const handleMoveUp = () => {
    if (index <= 0) return;
    onMoveUp?.(index);
    // After reorder, focus the up-button at the new position
    setTimeout(() => moveUpRef.current?.focus(), 0);
  };

  const handleMoveDown = () => {
    if (index >= (listContext?.files?.length ?? 0) - 1) return;
    onMoveDown?.(index);
    // After reorder, focus the down-button at the new position
    setTimeout(() => moveDownRef.current?.focus(), 0);
  };

  const itemName = file?.meta?.name ?? `${index + 1}`;
  const totalItems = listContext?.files?.length ?? 0;

  const sortableHandler = sortable ? (
    <div className="sk-form-file-upload-list-item-sort">
      <Button
        ref={moveUpRef}
        iconButton
        variant="secondary"
        rounded={true}
        onClick={handleMoveUp}
        disabled={index <= 0}
        aria-label={`Flytta ${itemName} uppåt, position ${index + 1} av ${totalItems}`}
      >
        <Icon icon={<ArrowUp />} />
      </Button>
      <Button
        ref={moveDownRef}
        iconButton
        variant="secondary"
        rounded={true}
        onClick={handleMoveDown}
        disabled={index >= totalItems - 1}
        aria-label={`Flytta ${itemName} nedåt, position ${index + 1} av ${totalItems}`}
      >
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

  return (
    <FileUploadListItemContext.Provider value={itemContext}>
      <li
        ref={ref}
        className={cx('sk-form-file-upload-list-item', className)}
        data-border={showBorder ? showBorder : undefined}
        data-size={size}
        data-isedit={isEdit}
        data-dragging={sortable && dragItemIndex === index ? true : undefined}
        data-drag-over={
          sortable && dragOverIndex === index && dragItemIndex !== null && dragItemIndex !== index ? true : undefined
        }
        draggable={sortable}
        onFocus={() => setFocusedIndex?.(index)}
        onBlur={() => setFocusedIndex?.(null)}
        onDragStart={() => setDragItemIndex?.(index)}
        onDragEnter={() => setDragOverIndex?.(index)}
        onDragEnd={handleOnDragEnd}
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
