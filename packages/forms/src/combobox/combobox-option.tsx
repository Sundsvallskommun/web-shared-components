import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, cx, omit, useForkRef } from '@sk-web-gui/utils';
import React from 'react';
import { useCombobox } from './combobox-context';
import { Check } from 'lucide-react';

export interface ComboboxOptionProps extends DefaultProps, Omit<React.ComponentPropsWithRef<'input'>, 'onClick'> {
  value: string;
  checked?: boolean;
  children: string;
  multiple?: boolean;
  disabled?: boolean;
  index?: number;
}

export const ComboboxOption = React.forwardRef<HTMLInputElement, ComboboxOptionProps>((props, ref) => {
  const { className, value, checked: _checked, children, multiple: _multiple, onChange, disabled, id, ...rest } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const context = useCombobox();

  React.useEffect(() => {
    if (context.activeId === id && inputRef.current) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.activeId]);

  React.useEffect(() => {
    if (children && value) {
      context.addLabel?.(children, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, value]);

  React.useEffect(() => {
    if (_checked !== undefined) {
      if (checked) {
        context.select?.(value);
      } else {
        context.remove?.(value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_checked]);

  const checked =
    _checked !== undefined ? _checked : context?.value?.length > 0 ? context?.value.includes(value) : false;
  const multiple = _multiple !== undefined ? _multiple : context.multiple || false;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (_checked === undefined) {
      if (multiple && context.value.includes(value)) {
        context.remove?.(value);
      } else {
        context.select?.(value);
      }
    }
    onChange?.(event);
  };

  const handleKeyboard = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputRef.current?.click();
      context.close?.();
    } else if (event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      inputRef.current?.click();
    } else if (event.key === 'Tab') {
      context.setOpen?.(false);
    } else if (event.key === 'Escape') {
      context.focusInput?.();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      context.next?.();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      context.prev?.();
    } else if (event.key.length === 1 || event.key === 'Backspace') {
      context.focusInput?.();
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
        context.activeId === id ? 'active' : ''
      )}
    >
      <Icon icon={<Check />} aria-hidden data-checked={checked} className="sk-form-combobox-list-option-tick" />
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
        id={id}
        {...omit(rest, ['index'])}
      />
    </label>
  );
});
