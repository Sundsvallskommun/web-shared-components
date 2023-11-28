import * as React from 'react';
import { useFormControl } from '@sk-web-gui/forms';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import { VisuallyHidden } from '@sk-web-gui/visually-hidden';
import { Icon } from '@sk-web-gui/icon';

export interface SwitchProps extends DefaultProps {
  /** Makes switch disabled
   * @default false
   */
  disabled?: boolean;
  /** Makes switch invalid
   *  @default false
   */
  invalid?: boolean;
  /**
   * If `true`, the switch will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   * @default false
   */
  checked?: boolean;
  /**
   * The callback invoked when the checked state of the `switch` changes..
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** FormSwitch id */
  id?: string;
  /** FormSwitch name */
  name?: string;
  /** FormSwitch value */
  value?: string | number;

  /** Set the switch color
   * @default tertiary
   */
  color?: 'tertiary' | 'gronsta';

  /** Set autoFocus to switch
   * @default false
   */
  autoFocus?: boolean;
  /**
   * A11y: A label that describes the input
   */
  'aria-label'?: string;
  /**
   * A11y: The id of the element that describes the input
   */
  'aria-describedby'?: string;
  /**
   * A11y: Refers to the id of the element that labels the switch element.
   */
  'aria-labelledby'?: string;
  /**
   * The children is the label to be displayed to the right of the switch.
   */
  children?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const {
    id,
    name,
    value,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    color = 'tertiary',
    checked,
    onChange,
    children,
    className,
    autoFocus = false,
    ...rest
  } = props;

  const { disabled, invalid } = useFormControl(props);

  return (
    <label className="sk-form-switch-label" {...rest}>
      <VisuallyHidden
        as="input"
        type="checkbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        id={id}
        ref={ref}
        name={name}
        value={value}
        aria-invalid={invalid}
        onChange={onChange}
        checked={checked}
        data-disabled={disabled}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      <div className={cx('sk-form-switch', className)} data-disabled={disabled} data-color={color ? color : undefined}>
        <div className={cx('sk-form-switch-box', className)}>
          <Icon name="check" rounded size={20} className={cx('sk-switch-icon', className)} />
        </div>
        <span className={`sr-only bg-white text-black`}>{ariaLabel}</span>
      </div>
    </label>
  );
});

if (__DEV__) {
  Switch.displayName = 'Switch';
}

export default Switch;
