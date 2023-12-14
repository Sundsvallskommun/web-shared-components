import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, cx, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useCombobox } from './combobox-context';

export interface ComboboxOption extends DefaultProps, Omit<React.ComponentPropsWithRef<'input'>, 'onClick'> {
  value: string;
  checked?: boolean;
  children: string;
  multiple?: boolean;
  disabled?: boolean;
  index?: number;
}

export const ComboboxOption = React.forwardRef<HTMLInputElement, ComboboxOption>((props, ref) => {
  const {
    className,
    value,
    checked: _checked,
    children,
    multiple: _multiple,
    onChange,
    disabled,
    index,
    ...rest
  } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const context = useCombobox();

  React.useEffect(() => {
    if (context.active === index && inputRef.current) {
      inputRef.current.focus();
    }
  }, [context.active]);

  React.useEffect(() => {
    if (children && value) {
      context.addLabel && context.addLabel(children, value);
    }
  }, [children, value]);

  React.useEffect(() => {
    if (_checked !== undefined) {
      if (checked) {
        context.select && context.select(value);
      } else {
        context.remove && context.remove(value);
      }
    }
  }, [_checked]);

  const checked =
    _checked !== undefined ? _checked : context?.value?.length > 0 ? context?.value.includes(value) : false;
  const multiple = _multiple !== undefined ? _multiple : context.multiple || false;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (_checked === undefined) {
      if (multiple && context.value.includes(value)) {
        context.remove && context.remove(value);
      } else {
        context.select && context.select(value);
      }
    }
    onChange && onChange(event);
  };

  const handleKeyboard = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current && inputRef.current.click();
      context.close && context.close();
    } else if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      inputRef.current && inputRef.current.click();
    } else if (event.key === 'Tab') {
      context.setOpen && context.setOpen(false);
    } else if (event.key === 'Escape') {
      context.focusInput && context.focusInput();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      context.next && context.next();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      context.prev && context.prev();
    } else if (event.key.length === 1 || event.key === 'Backspace') {
      context.focusInput && context.focusInput();
    }
  };

  return (
    <label
      onKeyDown={handleKeyboard}
      data-multiple={multiple ? multiple : undefined}
      className={cx(
        className,
        'sk-form-combobox-list-option',
        'sk-popup-menu-item',
        context.active === index ? 'active' : ''
      )}
    >
      <Icon name="check" aria-hidden className={cx(checked ? 'opacity-1' : 'opacity-0')} />
      {children}
      <input
        tabIndex={-1}
        type="checkbox"
        className={cx('sk-form-combobox-list-option-checkbox')}
        ref={useForkRef(ref, inputRef)}
        role="option"
        value={value}
        name={context.name}
        disabled={disabled}
        checked={checked}
        aria-selected={checked}
        onChange={handleChange}
        {...rest}
      />
    </label>
  );
});
