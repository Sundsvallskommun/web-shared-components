import { __DEV__, CustomOnChangeEvent, cx, omit, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { useFormControl } from '../form-control';
import { ComboboxContext, UseComboboxProps } from './combobox-context';
import { useComboboxStyles } from './styles';

export interface ComboboxBaseProps
  extends UseComboboxProps,
    Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'value' | 'defaultValue' | 'onChange' | 'onSelect'> {}

export const ComboboxBase = React.forwardRef<HTMLInputElement, ComboboxBaseProps>((props, ref) => {
  const {
    multiple,
    className,
    id: _id,
    variant = 'primary',
    children,
    autofilter = true,
    size: _size,
    sortSelectedFirst = true,
    onChange,
    onSelect: _onSelect,
    onChangeSearch,
    value,
    placeholder,
    searchPlaceholder,
    name: _name,
    searchValue: _searchValue,
    ...rest
  } = props;

  const [open, setOpen] = React.useState<boolean>(false);
  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const [labels, setLabels] = React.useState<Record<string, string>>({});
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [active, setActive] = React.useState<number>(-1);
  const [total, setTotal] = React.useState<number>(0);
  const [ids, setIds] = React.useState<string[]>([]);
  const activeId = ids[active];

  const internalRef = React.useRef<HTMLInputElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { id: fcId, size: fcSize, name: fcName } = useFormControl(props);

  const autoId = React.useId();
  const id = _id || fcId || `sk-form-combobox-${autoId}`;
  const listId = `${id}-list`;
  const name = _name || fcName || `${id}-option`;
  const size = _size || fcSize || 'md';
  const classes = useComboboxStyles({ size, variant });

  React.useEffect(() => {
    if (typeof _searchValue === 'string') {
      setSearchValue(_searchValue);
    }
  }, [_searchValue]);

  React.useEffect(() => {
    onChangeSearch?.({ target: { value: searchValue, name } } as CustomOnChangeEvent<string>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  React.useEffect(() => {
    const event = {
      target: {
        value: multiple ? internalValue : internalValue.length ? internalValue.join('') : '',
        name: name ?? '',
      },
    } as CustomOnChangeEvent;

    onChange?.(event);
    if (multiple || (internalValue.length && internalValue[0])) {
      _onSelect?.(event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue]);

  //NOTE: Cast to RefObject<HTMLDivElement> to avoid type error because of bug in usehooks-ts
  //Remove this when the bug is fixed
  useOnClickOutside(internalRef as React.RefObject<HTMLDivElement>, () => {
    setOpen(false);
  });

  const addLabel = (label: string, value: string) => {
    const newLabels = labels;
    newLabels[value] = label;
    setLabels(newLabels);
  };

  const getValue = () => {
    switch (open) {
      case false:
        return internalValue.length > 0 && internalValue[0]
          ? internalValue.map((opt) => labels[opt]).join(', ')
          : searchValue;
      case true:
        return searchValue;
    }
  };

  const close = () => {
    setSearchValue('');
    setOpen(false);
    setActive(-1);
    inputRef.current?.focus();
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
    inputRef.current?.focus();
    setActive(-1);
  };

  React.useEffect(() => {
    if (value?.toString() !== internalValue.toString()) {
      if (typeof value === 'string') {
        setInternalValue([value]);
      }
      if (Array.isArray(value)) {
        setInternalValue(value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const context = {
    multiple,
    size,
    value: internalValue,
    select: onSelect,
    remove: onRemove,
    close,
    addLabel,
    setValue: setInternalValue,
    getValue,
    open,
    setOpen,
    labels,
    id,
    listId,
    name,
    searchValue,
    setSearchValue,
    active,
    setActive,
    activeId,
    setIds,
    total,
    setTotal,
    next,
    prev,
    focusInput,
    autofilter,
    sortSelectedFirst,
    inputRef,
    placeholder,
    searchPlaceholder,
    variant,
  };

  const currentInputData = getValue();

  return (
    <ComboboxContext.Provider value={context}>
      <div
        className={cx('sk-combobox-base', 'sk-form-combobox', classes, className)}
        role="combobox"
        aria-controls={listId}
        ref={useForkRef(internalRef, ref)}
        aria-expanded={open && total > 0}
        data-showvalue={currentInputData !== searchValue ? true : undefined}
        {...omit(rest, ['defaultValue'])}
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
