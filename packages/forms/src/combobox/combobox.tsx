import { __DEV__, cx, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useFormControl } from '../form-control';
import { ComboboxContext, UseComboboxProps } from './combobox-context';

export interface ComboboxBaseProps extends UseComboboxProps, Omit<React.ComponentPropsWithRef<'input'>, 'size'> {}

export const ComboboxBase = React.forwardRef<HTMLInputElement, ComboboxBaseProps>((props, ref) => {
  const { multiple, className, id: _id, children, autofilter = true, size: _size, ...rest } = props;

  const [open, setOpen] = React.useState<boolean>(false);
  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const [labels, setLabels] = React.useState<Record<string, string>>({});
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [active, setActive] = React.useState<number>(-1);
  const [total, setTotal] = React.useState<number>(0);

  const internalRef = React.useRef<HTMLInputElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { id: fcId, size: fcSize } = useFormControl(props);

  const autoId = React.useId();
  const id = _id || fcId || `sk-form-combobox-${autoId}`;
  const listId = `${id}-list`;
  const name = `${id}-option`;
  const size = _size || fcSize || 'md';

  useOnClickOutside(internalRef, () => {
    setOpen(false);
  });

  const addLabel = (label: string, value: string) => {
    const newLabels = labels;
    newLabels[value] = label;
    setLabels(newLabels);
  };

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
  };

  const onRemove = (value: string) => {
    if (multiple && internalValue.includes(value)) {
      const newValues = internalValue.filter((oldOpt) => !!value && oldOpt !== value);
      setInternalValue(newValues);
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
    searchValue: searchValue,
    setSearchValue: setSearchValue,
    active,
    setActive,
    total,
    setTotal,
    next,
    prev,
    focusInput,
    autofilter,
    inputRef,
  };

  return (
    <ComboboxContext.Provider value={context}>
      <div
        className={cx('sk-combobox-base', className)}
        role="combobox"
        aria-controls={listId}
        ref={useForkRef(internalRef, ref)}
        aria-expanded={open}
        {...rest}
      >
        {children}
      </div>
    </ComboboxContext.Provider>
  );
});

if (__DEV__) {
  ComboboxBase.displayName = 'ComboBoxBase';
}

export default ComboboxBase;
