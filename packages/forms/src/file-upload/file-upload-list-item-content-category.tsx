import { useThemeQueries } from '@sk-web-gui/theme';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormLabel, Select } from '../index';
import { FileUploadListContext } from './file-upload-list';
import { FileUploadListItemContext } from './file-upload-list-item';
import { UploadFile } from './types';

export interface FileUploadListItemContentCategoryProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  /** @default md */
  size?: 'sm' | 'md';
  name?: string;
  file?: UploadFile;
  isEdit?: boolean;
  index?: number;
  categories?: { [key: string]: string };
  category?: string;
  defaultValue?: string;
  /** @default isMinMediumDevice ? false : true */
  showLabel?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
  // Controlled
  selectProps?: React.ComponentPropsWithRef<(typeof Select)['Component']>;
}

export const FileUploadListItemContentCategory = React.forwardRef<
  HTMLDivElement,
  FileUploadListItemContentCategoryProps
>((props, ref) => {
  const {
    className,
    children,
    name: _name,
    index: _index,
    size: _size,
    file: _file,
    isEdit: _isEdit,
    categories: _categories,
    category: _category,
    defaultValue: _defaultValue,
    showLabel: _showLabel,
    'aria-label': ariaLabel = 'Kategori',
    // Controlled
    selectProps: _selectProps,
    ...rest
  } = props;
  const { isMinMediumDevice } = useThemeQueries();

  const formContext = useFormContext ? useFormContext() : null;
  const listContext = React.useContext(FileUploadListContext);
  const itemContext = React.useContext(FileUploadListItemContext);
  const isEdit = _isEdit ?? itemContext?.isEdit ?? listContext?.isEdit;
  const file = _file ?? itemContext?.file;
  const name = _name ?? itemContext?.name ?? 'files';
  const index = _index ?? itemContext?.index ?? 0;
  const size = _size ?? listContext?.size ?? 'md';
  const showLabel =
    (_showLabel ?? itemContext?.showLabels ?? listContext?.showLabels ?? isMinMediumDevice) ? false : true;

  const fullName = `${name}.${index}`;
  const categories =
    _categories ?? itemContext?.categoryProps?.categories ?? listContext?.categoryProps?.categories ?? {};
  const defaultValue =
    _defaultValue ??
    _selectProps?.defaultValue ??
    listContext?.categoryProps?.defaultValue ??
    Object.keys(categories)[0];
  const category =
    (_selectProps?.value !== undefined ? _selectProps?.value : undefined) ??
    _category ??
    (formContext?.watch(`${fullName}`) ? formContext?.watch(`${fullName}`).meta.category : undefined) ??
    (file ? file.meta.category : undefined) ??
    defaultValue;

  const selectProps = { ..._selectProps, value: _selectProps?.value ?? file?.meta?.category };

  if (category === undefined || categories === undefined) return null;

  if (!children) {
    return (
      <div
        ref={ref}
        className={cx('sk-form-file-upload-list-item-content-category', className)}
        data-size={size}
        {...rest}
      >
        {isEdit ? (
          <FormControl id={`file-upload-list-item-content-name-${fullName}`}>
            {showLabel ? <FormLabel>{ariaLabel}</FormLabel> : null}
            <Select
              aria-label={ariaLabel}
              {...(formContext ? formContext.register(`${fullName}.meta.category`) : {})}
              {...selectProps}
            >
              {categories &&
                Object.keys(categories).map((category) => (
                  <Select.Option key={category} value={category}>
                    {categories[category]}
                  </Select.Option>
                ))}
            </Select>
          </FormControl>
        ) : (
          <>
            {category && categories && (
              <div className="sk-form-file-upload-list-item-content-category-heading">{categories[category]}</div>
            )}
          </>
        )}
      </div>
    );
  } else {
    return (
      <div
        ref={ref}
        className={cx('sk-form-file-upload-list-item-content-category', className)}
        data-size={size}
        {...rest}
      >
        {children}
      </div>
    );
  }
});
