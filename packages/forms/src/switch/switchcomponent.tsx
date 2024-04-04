import { useFormControl } from '../form-control';
import { Icon } from '@sk-web-gui/icon';
import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

export interface SwitchProps extends Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  /** Set the switch color
   * @default tertiary
   */
  color?: 'tertiary' | 'gronsta';
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const {
    id,
    name,
    value,
    color = 'tertiary',
    checked,
    onChange,
    children,
    className,
    disabled: _disabled,
    ...rest
  } = props;

  const {
    disabled: formcontrolDisabled,
    invalid,
    hasErrorText,
    errorId,
    hasHelpText,
    helpTextId,
  } = useFormControl(props);

  const disabled = _disabled || formcontrolDisabled || false;

  return (
    <label className={cx('sk-form-switch-label', className)}>
      <input
        type="checkbox"
        id={id}
        ref={ref}
        name={name}
        value={value}
        aria-invalid={invalid}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        className="sr-only"
        aria-describedby={
          (hasErrorText && errorId) || (hasHelpText && helpTextId)
            ? `${hasErrorText ? errorId : ''} ${hasHelpText ? helpTextId : ''}`
            : undefined
        }
        {...rest}
      />

      <div className={'sk-form-switch'} data-disabled={disabled} data-color={color ? color : undefined}>
        <div className={'sk-form-switch-box'}>
          <Icon.Padded
            name="check"
            color={color}
            variant={disabled ? 'ghost' : 'tertiary'}
            rounded
            className={'sk-form-switch-icon'}
          />
        </div>
      </div>
      <span>{children}</span>
    </label>
  );
});

if (__DEV__) {
  Switch.displayName = 'Switch';
}

export default Switch;
