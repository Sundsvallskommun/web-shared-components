import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

import { useFormControl } from '../form-control';
import { useInputClass } from './styles';

export interface IInputProps<T = HTMLInputElement> extends DefaultProps {
  /* Makes input disabled */
  disabled?: React.InputHTMLAttributes<T>['disabled'];
  /* Makes input invalid */
  invalid?: boolean;
  /* Makes input required */
  required?: React.InputHTMLAttributes<T>['required'];
  /* Makes input readOnly */
  readOnly?: React.InputHTMLAttributes<T>['readOnly'];
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
  value?: string;
  autoFocus?: boolean;
}

export type OmittedTypes =
  | 'size'
  | 'disabled'
  | 'required'
  | 'checked'
  | 'defaultChecked'
  | 'readOnly'
  | 'nonce'
  | 'onResize'
  | 'onResizeCapture'
  | 'value';

export interface InputProps
  extends IInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, OmittedTypes>,
    React.RefAttributes<HTMLInputElement> {
  /**
   * If you want to hide native extra apperances, such as number arrows and icons
   * @default true
   */
  hideExtra?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { size: _size, as: Comp = 'input', className, type = 'text', hideExtra = true, ...rest } = props;

  const { readOnly, disabled, invalid, required, errorId, helpTextId, id, ...formControl } = useFormControl(props);

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
      aria-describedby={errorId && helpTextId ? `${errorId} ${helpTextId}` : errorId || helpTextId}
      data-hideextra={hideExtra}
      className={cx(classes, className)}
      type={type}
      id={id}
      {...rest}
    />
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}
