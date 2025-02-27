import { CustomOnChangeEvent, __DEV__, cx, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useFormControl } from '../form-control';
import { UseComboboxProps, useCombobox } from './combobox-context';
import { useComboboxStyles } from './styles';
import _ from 'lodash';
export interface ComboboxInputProps
  extends Omit<UseComboboxProps, 'autofilter' | 'sortSelectedFirst'>,
    Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'onChange' | 'onSelect' | 'value' | 'defaultValue'> {
  /* Makes input invalid */
  disabled?: boolean;
  invalid?: boolean;
  InputComp?: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
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
    placeholder: _placeholder,
    searchPlaceholder: _searchPlaceholder,
    size: _size,
    invalid: _invalid,
    variant: _variant,
    InputComp,
    name: _name,
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
    close,
    setActive,
    open,
    setOpen,
    inputRef,
    id: _useId,
    size: _useSize,
    multiple,
    name: contextName,
    searchPlaceholder: contextSearchPlaceholder,
    placeholder: contextPlaceholder,
    variant: contextVariant,
  } = useCombobox();

  const value = contextValue || _incomingValue || '';
  const searchValue = contextSearchValue || _searchValue || '';

  React.useEffect(() => {
    const initialValue = defaultValue || [];
    setValue(typeof initialValue === 'string' ? [initialValue] : initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  React.useEffect(() => {
    const value = _searchValue || '';
    setSearchValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    name: fcName,
  } = useFormControl(props);

  const autoId = React.useId();
  const id = _id || _useId || fcId || `sk-form-combobox-${autoId}`;
  const name = _name || contextName || fcName;
  const disabled = _disabled !== undefined ? _disabled : fcDisabled;
  const size = _size || _useSize || fcSize || 'md';
  const invalid = _invalid !== undefined ? _invalid : formcontrolInvalid;
  const placeholder = _placeholder || contextPlaceholder;
  const searchPlaceholder = _searchPlaceholder || contextSearchPlaceholder;
  const variant = _variant || contextVariant || 'primary';
  const classes = useComboboxStyles({ size, variant });

  React.useEffect(() => {
    if (_incomingValue !== undefined) {
      if (typeof _incomingValue === 'string') {
        setValue([_incomingValue]);
      } else {
        setValue(_incomingValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_incomingValue]);

  const [valueMemo, setValueMemo] = React.useState<typeof value | null>(value);

  React.useEffect(() => {
    const _value = value.map((opt) => labels[opt]);

    if (_.isEqual(_value, valueMemo) === false) {
      setValueMemo(_value);
      const event = {
        target: {
          value: multiple ? _value : _value.length ? _value.join('') : '',
          name: name ?? '',
        },
      } as CustomOnChangeEvent;

      onChange?.(event);
      if (multiple || (_value.length && _value[0])) {
        onSelect?.(event);
      }

      if (value.length > 0 && value[0]) {
        onChangeSearch?.({ target: { value: '', name: name ?? '' } } as CustomOnChangeEvent<string>);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
