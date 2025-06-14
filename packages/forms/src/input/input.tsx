import { DefaultProps, omit } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';

import { useFormControl } from '../form-control';
import { useInputClass } from './styles';

export interface IInputProps<T = HTMLInputElement> extends DefaultProps {
  /* Makes input invalid */
  invalid?: boolean;
  /* Makes input readOnly */
  readOnly?: React.InputHTMLAttributes<T>['readOnly'];
  /* Makes input disabled */
  disabled?: React.InputHTMLAttributes<T>['disabled'];
  /* Size of the input */
  size?: 'sm' | 'md' | 'lg';
  /**
   * The element or component to use in place of `input`
   */
  as?: React.ElementType;

  /**
   * Input type
   */
  type?: React.InputHTMLAttributes<T>['type'];
  placeholder?: React.InputHTMLAttributes<T>['placeholder'];
  value?: React.InputHTMLAttributes<T>['value'];
  autoFocus?: boolean;
}

export interface InputProps extends IInputProps, Omit<React.ComponentPropsWithRef<'input'>, 'size' | 'value'> {
  /**
   * If you want to hide native extra apperances, such as number arrows and icons
   * @default true
   */
  hideExtra?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { size: _size, as: Comp = 'input', className, type = 'text', hideExtra = true, ...rest } = props;

  const { readOnly, disabled, invalid, required, errorId, helpTextId, hasErrorText, hasHelpText, id, ...formControl } =
    useFormControl(props);

  const size = _size || formControl.size || 'md';

  const classes = useInputClass({ size, disabled });
  return (
    <Comp
      ref={ref}
      readOnly={readOnly}
      aria-readonly={readOnly}
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
      data-hideextra={hideExtra}
      className={cx(classes, className)}
      type={type}
      id={id}
      {...omit(rest, ['invalid'])}
    />
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}
