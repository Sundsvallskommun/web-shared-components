import { CustomOnChangeEvent, __DEV__, cx, useForkRef } from '@sk-web-gui/utils';
import React, { useEffect } from 'react';
import { useFormControl } from '../form-control';
import { UseComboboxProps, useCombobox } from './combobox-context';
import { useComboboxStyles } from './styles';
import _ from 'lodash';

interface InputCompProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Define any additional props specific to InputComp
}

export interface ComboboxInputProps
  extends UseComboboxProps,
    Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'onChange' | 'onSelect'> {
  /**
   * ChangeEvent list
   */
  onChange?: (event: CustomOnChangeEvent) => void;
  /**
   * ChangeEvent list
   */
  onSelect?: (event: CustomOnChangeEvent) => void;
  /**
   * ChangeEvent list
   */
  onChangeSearch?: (event: CustomOnChangeEvent<string>) => void;
  /**
   * Selected value
   */
  value?: string | string[];
  /**
   * Sets initial value
   */
  defaultValue?: string | string[];
  /**
   * Search input value
   */
  searchValue?: string;
  /**
   * Placeholder when search is active
   */
  searchPlaceholder?: string;
  /**
   * @default primary
   */
  variant?: 'primary' | 'tertiary';
  /* Makes input invalid */
  disabled?: boolean;
  invalid?: boolean;
  InputComp?: React.ReactElement<InputCompProps>;
}

export const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxInputProps>((props, ref) => {
  const {
    searchValue: _searchValue,
    value: _incomingValue,
    defaultValue,
    className,
    disabled: _disabled,
    id: _id,
    onChange,
    onChangeSearch,
    onSelect,
    placeholder,
    searchPlaceholder,
    size: _size,
    invalid: _invalid,
    variant = 'primary',
    InputComp,
    ...rest
  } = props;

  const {
    value: contextValue,
    setValue,
    getValue,
    searchValue: contextSearchValue,
    setSearchValue,
    labels,
    next,
    prev,
    setActive,
    open,
    setOpen,
    inputRef,
    id: _useId,
    size: _useSize,
    multiple,
  } = useCombobox();

  const value = contextValue || _incomingValue || '';
  const searchValue = contextSearchValue || _searchValue || '';

  useEffect(() => {
    const initialValue = defaultValue || [];
    setValue(typeof initialValue === 'string' ? [initialValue] : initialValue);
  }, [defaultValue]);

  useEffect(() => {
    const value = _searchValue || '';
    setSearchValue(value);
  }, [_searchValue]);

  const {
    readOnly,
    disabled: fcDisabled,
    invalid: formcontrolInvalid,
    required,
    errorId,
    hasErrorText,
    helpTextId,
    hasHelpText,
    size: fcSize,
    id: fcId,
    name,
  } = useFormControl(props);

  const autoId = React.useId();
  const id = _id || _useId || fcId || `sk-form-combobox-${autoId}`;

  const disabled = _disabled !== undefined ? _disabled : fcDisabled;
  const size = _size || _useSize || fcSize || 'md';
  const invalid = _invalid !== undefined ? _invalid : formcontrolInvalid;
  const classes = useComboboxStyles({ size, variant });

  React.useEffect(() => {
    if (_incomingValue !== undefined) {
      if (typeof _incomingValue === 'string') {
        setValue([_incomingValue]);
      } else {
        setValue(_incomingValue);
      }
    }
  }, [_incomingValue]);

  const [valueMemo, setValueMemo] = React.useState<typeof value | null>(value);
  useEffect(() => {
    const _value = value.map((opt) => labels[opt]);
    if (_.isEqual(_value, valueMemo) === false) {
      setValueMemo(_value);
      const event = {
        target: {
          value: multiple ? _value : _value.length ? _value.join('') : '',
          name: name ?? '',
        },
      } as CustomOnChangeEvent;
      onChange && onChange(event);
      if (multiple || (_value.length && _value[0])) {
        onSelect && onSelect(event);
      }
      if (value.length > 0 && value[0]) {
        onChangeSearch && onChangeSearch({ target: { value: '', name: name ?? '' } } as CustomOnChangeEvent<string>);
      }
    }
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (open) {
      if (onChangeSearch) {
        onChangeSearch(event);
      } else {
        setSearchValue(event.target.value);
      }
    }
  };

  const handleKeyboard = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!open) {
        setOpen(!open);
      }
    } else if (event.key === ' ') {
      if (!open) {
        event.preventDefault();
        setOpen(!open);
      }
    } else if (event.key === 'Escape') {
      close();
    } else if (event.key === 'Tab') {
      setOpen(false);
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      prev();
    } else if (event.key.length === 1 || event.key === 'Backspace') {
      setOpen(true);
      setActive(-1);
    }
  };

  const inputProps = {
    ref: useForkRef(inputRef, ref),
    tabIndex: 0,
    onKeyDown: handleKeyboard,
    id: id,
    readOnly: readOnly,
    'aria-readonly': readOnly,
    disabled: disabled,
    'aria-disabled': disabled ? disabled : undefined,
    'aria-invalid': invalid,
    required: required,
    'aria-required': required,
    'aria-describedby':
      (hasErrorText && errorId) || (hasHelpText && helpTextId)
        ? `${hasErrorText ? errorId : ''} ${hasHelpText ? helpTextId : ''}`
        : undefined,
    onClick: () => setOpen(!open),
    placeholder: open && !searchValue ? searchPlaceholder : searchValue.length < 1 ? placeholder : undefined,
    onChange: handleOnChange,
    'aria-autocomplete': 'none',
    autoComplete: 'off',
    value: getValue(),
    ...rest,
  } as const;

  if (InputComp) {
    return <>{React.cloneElement(InputComp, { ...InputComp.props, ...inputProps })}</>;
  }

  return (
    <input
      className={cx(
        'sk-form-select',
        `sk-form-select-${size}`,
        `sk-form-select-${variant}`,
        'sk-form-combobox-select',
        open ? 'active' : '',
        classes,
        className
      )}
      {...inputProps}
    />
  );
});

if (__DEV__) {
  ComboboxInput.displayName = 'ComboBoxInput';
}

export default ComboboxInput;
