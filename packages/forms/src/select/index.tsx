import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

import { useFormControl } from '../form-control';
import { IInputProps } from '../input/input';
import { useSelectClass } from './styles';

export interface SelectOptionProps extends React.ComponentPropsWithRef<'option'> {
  value?: string | number;
}

const Option = React.forwardRef<HTMLOptionElement, SelectOptionProps>((props, ref) => {
  return <option ref={ref} {...props} />;
});

export interface SelectOptgroupProps extends React.ComponentPropsWithRef<'optgroup'> {
  label?: string;
}

const Optgroup = React.forwardRef<HTMLOptGroupElement, SelectOptgroupProps>((props, ref) => {
  return <optgroup ref={ref} {...props} />;
});

export interface InternalSelectProps
  extends IInputProps<HTMLSelectElement>,
    Omit<React.ComponentPropsWithRef<'select'>, 'size' | 'value'> {
  onSelectValue?: (value: string) => void;
  variant?: 'primary' | 'tertiary';
}

const InternalSelect = React.forwardRef<HTMLSelectElement, InternalSelectProps>((props, ref) => {
  const { className, size: _size, onSelectValue, onChange, invalid: _invalid, variant = 'primary', ...rest } = props;

  const { disabled, required, errorId, helpTextId, hasErrorText, hasHelpText, id, ...formControl } =
    useFormControl(props);
  const size = _size || formControl.size || 'md';
  const invalid = _invalid !== undefined ? _invalid : formControl.invalid;

  const classes = useSelectClass({ size, disabled, variant });

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(event);
    onSelectValue && onSelectValue(event?.target?.value);
  };

  return (
    <select
      ref={ref}
      disabled={disabled}
      aria-disabled={disabled}
      aria-invalid={invalid}
      required={required}
      aria-required={required}
      aria-describedby={
        (hasErrorText && errorId) || (hasHelpText && helpTextId)
          ? `${hasErrorText ? errorId : ''} ${hasHelpText ? helpTextId : ''}`
          : undefined
      }
      className={cx(classes, className)}
      id={id}
      onChange={handleSelect}
      {...rest}
    />
  );
});

if (__DEV__) {
  InternalSelect.displayName = 'Select';
}

interface SelectProps extends React.ForwardRefExoticComponent<InternalSelectProps> {
  Component: typeof InternalSelect;
  Option: typeof Option;
  Optgroup: typeof Optgroup;
}

export const Select = {
  ...InternalSelect,
  Component: InternalSelect,
  Option: Option,
  Optgroup: Optgroup,
} as SelectProps;

export type { SelectProps };
export default Select;
