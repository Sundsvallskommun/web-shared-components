import { useFormControl } from '../form-control';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import { DefaultProps } from '@sk-web-gui/utils';
import React from 'react';

import { useRadioButtonClass, useRadioButtonLabelClass } from './styles';

export interface RadioButtonProps<T = HTMLInputElement>
  extends DefaultProps,
    Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  /* Makes radio invalid */
  invalid?: boolean;
  /* Makes radio required */
  required?: React.InputHTMLAttributes<T>['required'];
  /* Makes radio readOnly */
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
  /* Size of the radio */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The children is the label to be displayed to the right of the radio.
   */
  children?: React.ReactNode;
}

export const InternalRadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const {
    id,
    name,
    value,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedby,
    defaultChecked,
    checked,
    size = 'md',
    onChange,
    children,
    className,
    ...rest
  } = props;

  const { disabled, invalid } = useFormControl(props);

  const radioClasses = useRadioButtonClass({
    size,
    disabled,
  });

  const radioLabelClasses = useRadioButtonLabelClass({ size });

  return (
    <label className={cx(disabled && 'cursor-not-allowed', radioLabelClasses, className)} data-disabled={disabled}>
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
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        aria-disabled={disabled}
        className={cx(radioClasses)}
        {...rest}
      />
      {children}
    </label>
  );
});

if (__DEV__) {
  InternalRadioButton.displayName = 'RadioButton';
}
