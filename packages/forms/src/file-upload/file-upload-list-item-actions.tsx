import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { PopupMenu } from '@sk-web-gui/popup-menu';
import { useThemeQueries } from '@sk-web-gui/theme';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import { Ellipsis, Pen, Trash, X } from 'lucide-react';
import React from 'react';
import { FieldArrayPath, useFieldArray, useFormContext } from 'react-hook-form';
import { FileUploadListItemContext } from './file-upload-list-item';
import { OnCallWithUploadFile, UploadFile } from './types';

type FormValues<FieldName extends string> = {
  [K in FieldName]: UploadFile[];
};

export interface FileUploadListItemActionsProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  file?: UploadFile;
  name?: FieldArrayPath<FormValues<string>>;
  /** @default false */
  showRemove?: boolean;
  onRemove?: OnCallWithUploadFile | (() => void);
  /** @default false */
  showMore?: boolean;
  morePopupMenuPanel?: React.ReactElement<typeof PopupMenu.Panel>;
  /** @default false */
  isEdit?: boolean;
  /** @default false */
  showEdit?: boolean;
  onEdit?: OnCallWithUploadFile | (() => void);
  /** @default false */
  showEditSave?: boolean;
  onEditSave?: OnCallWithUploadFile | (() => void);
  /** @default false */
  showEditCancel?: boolean;
  onEditCancel?: OnCallWithUploadFile | (() => void);
  onProgressCancel?: OnCallWithUploadFile | (() => void);
  extraActions?: JSX.Element | JSX.Element[] | string;
  children?: JSX.Element | JSX.Element[] | string;
}

export const FileUploadListItemActions = React.forwardRef<HTMLDivElement, FileUploadListItemActionsProps>(
  (props, ref) => {
    const {
      className,
      children,
      file: _file,
      name: _name,
      showEdit = false,
      showRemove: _showRemove,
      onRemove: _onRemove,
      showMore: _showMore,
      morePopupMenuPanel: _morePopupMenuPanel,
      isEdit: _isEdit,
      onEdit,
      showEditSave = false,
      onEditSave,
      showEditCancel = false,
      onEditCancel,
      onProgressCancel,
      extraActions = null,
      ...rest
    } = props;
    const { isMinMediumDevice } = useThemeQueries();

    const itemContext = React.useContext(FileUploadListItemContext);
    const file = _file ?? itemContext?.file;
    const name = _name ?? itemContext?.name ?? 'files';
    const isEdit = _isEdit ?? itemContext?.isEdit ?? false;
    const showRemove = _showRemove ?? itemContext?.actionsProps?.showRemove ?? false;
    const onRemove = _onRemove ?? itemContext?.actionsProps?.onRemove ?? undefined;
    const showMore = _showMore ?? itemContext?.actionsProps?.showMore ?? false;
    const morePopupMenuPanel = _morePopupMenuPanel ?? itemContext?.actionsProps?.morePopupMenuPanel ?? null;

    const context = useFormContext ? useFormContext() : null;
    const fieldArrayContext = context
      ? useFieldArray<FormValues<string>>({
          control: context?.control,
          name: name,
        })
      : null;

    const handleOnEdit = () => {
      if (file) {
        if (onEdit) {
          (onEdit as OnCallWithUploadFile)(file);
        }
      } else if (onEdit) {
        (onEdit as () => void)();
      }
    };

    const handleOnEditSave = () => {
      if (file) {
        if (onEditSave) {
          (onEditSave as OnCallWithUploadFile)(file);
        }
      } else if (onEditSave) {
        (onEditSave as () => void)();
      }
    };

    const handleOnEditCancel = () => {
      if (file) {
        if (onEditCancel) {
          (onEditCancel as OnCallWithUploadFile)(file);
        }
      } else if (onEditCancel) {
        (onEditCancel as () => void)();
      }
    };

    const handleOnRemove = () => {
      if (file) {
        // Append files to the field array
        fieldArrayContext?.remove &&
          fieldArrayContext?.remove(itemContext?.index ?? fieldArrayContext?.fields.indexOf(file));
        if (onRemove) {
          (onRemove as OnCallWithUploadFile)(file);
        }
      } else if (onRemove) {
        (onRemove as () => void)();
      }
    };

    const handleOnProgressCancel = () => {
      if (file) {
        if (onProgressCancel) {
          (onProgressCancel as OnCallWithUploadFile)(file);
        }
      } else if (onProgressCancel) {
        (onProgressCancel as () => void)();
      }
    };

    if (!children) {
      return (
        <div ref={ref} className={cx('sk-form-file-upload-list-item-actions', className)} {...rest}>
          {itemContext.uploadProgress !== undefined ? (
            <>
              <Button variant="tertiary" size="sm" leftIcon={<Icon icon={<X />} />} onClick={handleOnProgressCancel}>
                Avbryt
              </Button>
            </>
          ) : isEdit ? (
            <>
              {extraActions}
              {showEditSave ? (
                <Button size="sm" onClick={handleOnEditSave}>
                  Spara
                </Button>
              ) : null}
              {showEditCancel ? (
                <Button size="sm" variant="secondary" onClick={handleOnEditCancel}>
                  Avbryt
                </Button>
              ) : null}
              {showRemove ? (
                isMinMediumDevice ? (
                  <Button
                    className="sk-form-file-upload-list-item-actions-remove"
                    onClick={handleOnRemove}
                    variant="tertiary"
                    showBackground={false}
                    size="sm"
                    iconButton
                  >
                    <Icon icon={<Trash />} />
                  </Button>
                ) : (
                  <Button
                    className="sk-form-file-upload-list-item-actions-remove"
                    onClick={handleOnRemove}
                    variant="tertiary"
                    showBackground
                    leftIcon={<Icon icon={<Trash />} />}
                  >
                    Ta bort
                  </Button>
                )
              ) : null}
            </>
          ) : (
            <>
              {extraActions}
              {showEdit && (
                <Button
                  className="sk-form-file-upload-list-item-actions-remove"
                  onClick={handleOnEdit}
                  variant="tertiary"
                  showBackground={false}
                  size="sm"
                  iconButton
                >
                  <Icon icon={<Pen />} />
                </Button>
              )}
              {showRemove && (
                <Button
                  className="sk-form-file-upload-list-item-actions-remove"
                  onClick={handleOnRemove}
                  variant="tertiary"
                  showBackground={false}
                  size="sm"
                  iconButton
                >
                  <Icon icon={<Trash />} />
                </Button>
              )}
              {showMore && morePopupMenuPanel && (
                <div className="sk-form-file-upload-list-item-actions-more-wrapper">
                  <PopupMenu align="end">
                    <PopupMenu.Button
                      className="sk-form-file-upload-list-item-actions-more"
                      size="sm"
                      variant="tertiary"
                      showBackground={false}
                      aria-label="Fler alternativ"
                      iconButton
                    >
                      <Icon icon={<Ellipsis />} />
                    </PopupMenu.Button>
                    {morePopupMenuPanel ? morePopupMenuPanel : <PopupMenu.Panel />}
                  </PopupMenu>
                </div>
              )}
            </>
          )}
        </div>
      );
    } else {
      return (
        <div ref={ref} className={cx('sk-form-file-upload-list-item-actions', className)} {...rest}>
          {children}
        </div>
      );
    }
  }
);
