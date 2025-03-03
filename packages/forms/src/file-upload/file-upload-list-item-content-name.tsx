import { useThemeQueries } from '@sk-web-gui/theme';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import React from 'react';
import { ErrorOption, useFormContext } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormLabel, Input } from '../index';
import { UploadFile } from './types';
import { utils } from './utils';
import { FileUploadListContext, FileUploadListItemContext } from './context';

export interface FileUploadListItemContentNameProps
  extends DefaultProps,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'color' | 'children'> {
  /** @default md */
  size?: 'sm' | 'md';
  file?: UploadFile;
  heading?: string;
  description?: string;
  isEdit?: boolean;
  children?: React.JSX.Element | React.JSX.Element[] | string;
  name?: string;
  index?: number;
  ending?: string;
  /** @default isMinMediumDevice ? false : true */
  showLabel?: boolean;
  // Controlled
  inputProps?: Omit<React.ComponentPropsWithRef<(typeof Input)['Component']>, 'value'> & { value?: string | null };
  errorMessage?: string;
  formErrors?: Record<string, unknown>;
}

export const FileUploadListItemContentName = React.forwardRef<HTMLDivElement, FileUploadListItemContentNameProps>(
  (props, ref) => {
    const {
      className,
      children,
      size: _size,
      file: _file,
      heading: _heading,
      description,
      isEdit: _isEdit,
      name: _name,
      index: _index,
      ending: _ending,
      showLabel: _showLabel,
      'aria-label': ariaLabel = 'Namn',
      // Controlled
      inputProps: _inputProps,
      errorMessage: _errorMessage,
      formErrors: _formErrors,
      ...rest
    } = props;
    const { isMinMediumDevice } = useThemeQueries();

    // eslint-disable-next-line react-hooks/rules-of-hooks
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

    const inputProps = {
      ...listContext?.nameProps?.inputProps,
      ...itemContext?.nameProps?.inputProps,
      ..._inputProps,
      value:
        listContext?.nameProps?.inputProps?.value ??
        itemContext?.nameProps?.inputProps?.value ??
        _inputProps?.value ??
        file?.meta?.name,
    };

    const ending =
      _ending ??
      (formContext?.watch(`${fullName}`) ? utils.getFileEnding(formContext?.watch(`${fullName}`)) : undefined) ??
      (file ? utils.getFileEnding(file) : undefined);
    const heading =
      (inputProps?.value ? `${inputProps.value}.${ending}` : undefined) ??
      _heading ??
      (formContext?.watch(`${fullName}`) ? utils.getFileHeading(formContext?.watch(`${fullName}`)) : undefined) ??
      (file ? utils.getFileHeading(file) : undefined);

    const formErrors = _formErrors ?? formContext?.formState?.errors;
    const errorMessage =
      (_errorMessage ??
      ((formErrors?.[name] as Record<string, UploadFile>)?.[`${index}`]?.meta?.name as ErrorOption)?.message)
        ? `${((formErrors?.[name] as Record<string, UploadFile>)?.[`${index}`]?.meta?.name as ErrorOption)?.message}`
        : undefined;

    if (!children) {
      return (
        <div
          ref={ref}
          className={cx('sk-form-file-upload-list-item-content-name', className)}
          data-size={size}
          {...rest}
        >
          {isEdit ? (
            <FormControl
              id={`file-upload-list-item-content-name-${fullName}`}
              invalid={inputProps?.invalid ?? (errorMessage !== undefined ? true : undefined)}
            >
              {showLabel ? <FormLabel>{ariaLabel}</FormLabel> : null}
              <div className="sk-form-file-upload-list-item-content-name-input-wrapper">
                <Input
                  aria-label={ariaLabel}
                  {...(formContext ? formContext.register(`${fullName}.meta.name`) : {})}
                  {...inputProps}
                />
                {ending ? (
                  <span className="sk-form-file-upload-list-item-content-name-ending">{`.${ending}`}</span>
                ) : null}
              </div>
              {errorMessage ? <FormErrorMessage>{errorMessage}</FormErrorMessage> : null}
            </FormControl>
          ) : (
            <>
              {heading && <div className="sk-form-file-upload-list-item-content-name-heading">{heading}</div>}
              {description && (
                <div className="sk-form-file-upload-list-item-content-name-description">{description}</div>
              )}
            </>
          )}
        </div>
      );
    } else {
      return (
        <div
          ref={ref}
          className={cx('sk-form-file-upload-list-item-content-name', className)}
          data-size={size}
          {...rest}
        >
          {children}
        </div>
      );
    }
  }
);
