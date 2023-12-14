import { __DEV__, cx, useForkRef } from '@sk-web-gui/utils';
import React, { useState } from 'react';
import { useComboboxStyles } from './styles';
import { ComboboxList } from './combobox-list';
import { ComboboxOption } from './combobox-option';
import { useClickOutside } from '@react-hookz/web';
import { UseComboboxProps, ComboboxContext } from './combobox-context';
import { useFormControl } from '../form-control';

interface ComboboxChangeEvent extends Partial<React.ChangeEvent<HTMLInputElement>> {
  target: React.ChangeEvent<HTMLInputElement>['target'];
}
export interface ComboboxBaseProps extends UseComboboxProps, Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  /**
   * ChangeEvent list
   */
  onChange?: (event: ComboboxChangeEvent) => void;
  /**
   * Value from list
   */
  value?: string | string[];
  /**
   * ChangeEvent from search input
   */
  onChangeSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Value from search input
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
  invalid?: boolean;
}

const ComboboxBase = React.forwardRef<HTMLInputElement, ComboboxBaseProps>((props, ref) => {
  const {
    multiple,
    searchValue: _value,
    value: _incomingValue,
    className,
    disabled: _disabled,
    id: _id,
    onChange,
    onChangeSearch,
    placeholder,
    searchPlaceholder,
    children,
    autofilter = true,
    size: _size,
    invalid: _invalid,
    variant = 'primary',
    ...rest
  } = props;

  const [open, setOpen] = React.useState<boolean>(false);
  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const [labels, setLabels] = React.useState<Record<string, string>>({});
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [active, setActive] = useState<number>(-1);
  const [total, setTotal] = useState<number>(0);

  const value = _value !== undefined ? _value : searchValue;

  const internalRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    readOnly,
    disabled: fcDisabled,
    invalid: formcontrolInvalid,
    required,
    errorId,
    helpTextId,
    id: fcId,
    size: fcSize,
  } = useFormControl(props);

  const autoId = React.useId();
  const id = _id || fcId || `sk-form-combobox-${autoId}`;
  const listId = `${id}-list`;
  const name = `${id}-option`;
  const disabled = _disabled !== undefined ? _disabled : fcDisabled;
  const size = _size || fcSize || 'md';
  const invalid = _invalid !== undefined ? _invalid : formcontrolInvalid;
  const classes = useComboboxStyles({ size, variant });

  const addLabel = (label: string, value: string) => {
    const newLabels = labels;
    newLabels[value] = label;
    setLabels(newLabels);
  };

  useClickOutside(internalRef, () => {
    setOpen(false);
  });

  React.useEffect(() => {
    if (_incomingValue !== undefined) {
      if (typeof _incomingValue === 'string') {
        setInternalValue([_incomingValue]);
      } else {
        setInternalValue(_incomingValue);
      }
    }
  });

  const close = () => {
    setSearchValue('');
    setOpen(false);
    setActive(-1);
    inputRef.current && inputRef.current.focus();
  };
  const onSelect = (value: string) => {
    if (multiple) {
      if (!internalValue.includes(value)) {
        const newValues = [...internalValue.filter((value) => !!value), value];
        setInternalValue(newValues);
      }
    } else {
      setInternalValue([value]);
      close();
    }
    if (onChange && inputRef.current) {
      const target = inputRef.current;
      target.value = value;
      target.checked = true;
      onChange && onChange({ target });
    }
  };

  const onRemove = (value: string) => {
    if (multiple && internalValue.includes(value)) {
      const newValues = internalValue.filter((oldOpt) => !!value && oldOpt !== value);
      setInternalValue(newValues);
    }
    if (onChange && inputRef.current) {
      const target = inputRef.current;
      target.value = value;
      target.checked = false;
      onChange && onChange({ target });
    }
  };

  const next = () => {
    if (!open) {
      setOpen(true);
      setActive(0);
    } else if (active >= total - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  const prev = () => {
    if (!open) {
      setOpen(true);
      setActive(total - 1);
    } else if (active <= 0) {
      setActive(total - 1);
    } else {
      setActive(active - 1);
    }
  };

  const focusInput = () => {
    inputRef.current && inputRef.current.focus();
    setActive(-1);
  };

  const context = {
    multiple,
    size,
    value: internalValue,
    select: onSelect,
    remove: onRemove,
    close,
    addLabel,
    setValue: setInternalValue,
    open,
    setOpen,
    labels,
    id,
    listId,
    name,
    searchValue: value,
    active,
    total,
    setTotal,
    next,
    prev,
    focusInput,
    autofilter,
  };

  const getValue = () => {
    switch (open) {
      case false:
        return internalValue.length > 0 ? internalValue.map((opt) => labels[opt]).join(', ') : '';
      case true:
        return value;
    }
  };

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
      } else if (active > -1) {
        document.getElementById(`${listId}-${active}`)?.click();
        setOpen(false);
      }
    } else if (event.key === ' ') {
      if (!open) {
        setOpen(!open);
      } else {
        event.preventDefault();
        event.stopPropagation();
        if (active > -1) {
          document.getElementById(`${listId}-${active}`)?.click();
        }
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

  return (
    <ComboboxContext.Provider value={context}>
      <div className={cx(classes, className)} role="combobox" aria-owns={listId} ref={internalRef}>
        <input
          ref={useForkRef(inputRef, ref)}
          className={cx(
            'sk-form-select',
            `sk-form-select-${size}`,
            `sk-form-select-${variant}`,
            'sk-form-combobox-select',
            open ? 'active' : ''
          )}
          tabIndex={0}
          onKeyDown={handleKeyboard}
          id={id}
          readOnly={readOnly}
          aria-readonly={readOnly}
          disabled={disabled}
          aria-disabled={disabled ? disabled : undefined}
          aria-invalid={invalid}
          required={required}
          aria-required={required}
          aria-describedby={errorId && helpTextId ? `${errorId} ${helpTextId}` : errorId || helpTextId}
          onClick={() => setOpen(!open)}
          placeholder={open && !value ? searchPlaceholder : internalValue.length < 1 ? placeholder : undefined}
          onChange={handleOnChange}
          aria-autocomplete="none"
          aria-controls={listId}
          value={getValue()}
          {...rest}
        ></input>

        {children}
      </div>
    </ComboboxContext.Provider>
  );
});

interface ComboboxProps extends React.ForwardRefExoticComponent<ComboboxBaseProps> {
  Component: typeof ComboboxBase;
  List: typeof ComboboxList;
  Option: typeof ComboboxOption;
}

const Combobox = {
  ...ComboboxBase,
  Component: ComboboxBase,
  List: ComboboxList,
  Option: ComboboxOption,
} as ComboboxProps;

if (__DEV__) {
  Combobox.displayName = 'ComboBox';
}

export { Combobox };
export type { ComboboxProps };
export default Combobox;
