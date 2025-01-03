import { cx, __DEV__, omit } from '@sk-web-gui/utils';
import { DefaultProps } from '@sk-web-gui/utils';
import React from 'react';

import { useRadioButtonClass, useRadioButtonLabelClass } from './styles';
import { useFormControl } from '../form-control';
import { useRadioButtonGroup } from './use-radio-button-group';

export interface RadioButtonProps<T = HTMLInputElement>
  extends DefaultProps,
    Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  /** Makes radio invalid */
  invalid?: boolean;
  /** Makes radio required */
  required?: React.InputHTMLAttributes<T>['required'];
  /** Makes radio readOnly */
  readOnly?: React.InputHTMLAttributes<T>['readOnly'];
  /**
   * If `true`, the radio will be initially checked.
   */
  defaultChecked?: boolean;
  /**
   * If `true`, the radio will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  checked?: boolean;
  /**
   * The callback invoked when the checked state of the `radio` changes..
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Size of the radio
   * @default md
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The children is the label to be displayed to the right of the radio.
   */
  children?: React.ReactNode;
}

export const InternalRadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const {
    id,
    name: _name,
    value,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedby,
    defaultChecked,
    color: _color,
    checked: _checked,
    size: _size,
    onChange,
    children,
    className,
    readOnly,
    ...rest
  } = props;

  const { disabled, invalid, ...formControl } = useFormControl(props);

  const groupContext = useRadioButtonGroup();

  const size = _size || groupContext?.size || formControl?.size || 'md';
  const name = _name || groupContext?.name;
  const color = _color || groupContext.color || 'primary';
  const checked =
    _checked !== undefined || ref ? _checked : groupContext.value ? groupContext.value === value : undefined;

  const radioClasses = useRadioButtonClass({
    size,
    disabled,
  });

  const radioLabelClasses = useRadioButtonLabelClass({ size });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) {
      event.preventDefault();
      return;
    }
    if (onChange) {
      onChange(event);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (readOnly) {
      event.preventDefault();
    }
  };

  return (
    <label className={cx(radioLabelClasses, className)} data-disabled={disabled}>
      <input
        type="radio"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedby}
        id={id}
        ref={ref}
        name={name}
        value={value}
        aria-invalid={invalid}
        readOnly={readOnly}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        onClick={handleClick}
        checked={checked}
        disabled={disabled}
        aria-disabled={disabled}
        data-color={color ? color : undefined}
        className={cx(radioClasses)}
        {...omit(rest, ['invalid'])}
      />
      {children}
    </label>
  );
});

if (__DEV__) {
  InternalRadioButton.displayName = 'RadioButton';
}
