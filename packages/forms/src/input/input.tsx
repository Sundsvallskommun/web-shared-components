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
  /* Set the input color */
  color?: string;
  /* Size of the input */
  size?: 'sm' | 'md' | 'lg';
  /** Controls input appearance */
  variant?: 'outline' | 'solid';
  /**
   * The element or component to use in place of `input`
   */
  as?: React.ElementType;
  /** */
  type?: React.InputHTMLAttributes<T>['type'];
  /**
   * A11y: A label that describes the input
   */
  'aria-label'?: string;
  /**
   * A11y: The id of the element that describes the input
   */
  'aria-describedby'?: string;
  /**
   * A11y: describes the type of autocompletion
   */
  'aria-autocomplete'?: React.AriaAttributes['aria-autocomplete'];
  /**
   * Border-radius is rounded
   */
  rounded?: boolean;
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

// export type InputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, OmittedTypes>;

export interface InputProps
  extends IInputProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, OmittedTypes>,
    React.RefAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    size = 'md',
    variant = 'outline',
    color = 'primary',
    as: Comp = 'input',
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    className,
    type = 'text',
    id,
    rounded = false,
    ...rest
  } = props;

  const { readOnly, disabled, invalid, required, ...formControl } = useFormControl(props);
  const classes = useInputClass({ size, variant, disabled });

  return (
    <Comp
      ref={ref}
      readOnly={readOnly}
      aria-readonly={readOnly}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-invalid={invalid}
      required={required}
      aria-required={required}
      aria-describedby={ariaDescribedby}
      data-color={color ? color : undefined}
      data-rounded={rounded ? rounded : undefined}
      className={cx(classes, className)}
      type={type}
      id={id || formControl.id}
      {...rest}
    />
  );
});

if (__DEV__) {
  Input.displayName = 'Input';
}
