import { __DEV__, cx } from '@sk-web-gui/utils';
import * as React from 'react';

import { useFormControl } from '../form-control';
import { IInputProps } from '../input/input';
import { useSelectClass } from './styles';

export interface SelectOptionProps extends React.HTMLAttributes<HTMLOptionElement> {
  value?: string | number;
}

const Option = React.forwardRef<HTMLOptionElement, SelectOptionProps>((props, ref) => {
  return <option ref={ref} {...props} />;
});

export interface InternalSelectProps extends IInputProps<HTMLSelectElement>, React.HTMLAttributes<HTMLSelectElement> {
  onSelectValue?: (value: string) => void;
  variant?: 'primary' | 'tertiary';
}

const InternalSelect = React.forwardRef<HTMLSelectElement, InternalSelectProps>((props, ref) => {
  const { className, size: _size, onSelectValue, onChange, invalid: _invalid, variant = 'primary', ...rest } = props;

  const { disabled, required, errorId, helpTextId, id, ...formControl } = useFormControl(props);
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
      aria-describedby={errorId && helpTextId ? `${errorId} ${helpTextId}` : errorId || helpTextId}
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

interface SelectProps
  extends React.ForwardRefExoticComponent<InternalSelectProps & React.RefAttributes<HTMLSelectElement>> {
  Option: typeof Option;
}

const Select = InternalSelect as SelectProps;

Select.Option = Option;

export { Option, Select };
export type { SelectProps };
export default Select;
