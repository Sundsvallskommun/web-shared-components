import { useFormControl } from '@sk-web-gui/forms';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import { DefaultProps } from '@sk-web-gui/utils';
import * as React from 'react';

import { useRadioClass, useRadioLabelClass } from './styles';

interface IRadioProps<T = HTMLInputElement> extends DefaultProps {
  /* Makes radio disabled */
  disabled?: React.InputHTMLAttributes<T>['disabled'];
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
  /* Radio id */
  id?: string;
  /* Radio name */
  name?: string;
  /* Radio value */
  value?: string | number;
  /* Size of the radio */
  size?: 'sm' | 'md' | 'lg';
  /**
   * A11y: A label that describes the input
   */
  'aria-label'?: string;
  /**
   * A11y: The id of the element that describes the input
   */
  'aria-describedby'?: string;
  /**
   * A11y: Refers to the id of the element that labels the radio element.
   */
  'aria-labelledby'?: string;
  /**
   * The children is the label to be displayed to the right of the radio.
   */
  children?: React.ReactNode;
}

export type RadioProps = IRadioProps & React.HTMLAttributes<HTMLInputElement>;

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
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

  const radioClasses = useRadioClass({
    size,
    disabled,
  });

  const radioLabelClasses = useRadioLabelClass({ size });

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
  Radio.displayName = 'Radio';
}
