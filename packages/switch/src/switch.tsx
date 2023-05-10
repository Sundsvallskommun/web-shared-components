import { useFormControl } from '@sk-web-gui/forms';
import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import VisuallyHidden from '@sk-web-gui/visually-hidden';
import * as React from 'react';

import { useSwitchClass, useSwitchBoxClass } from './styles';

export interface SwitchProps<T = HTMLInputElement> extends DefaultProps {
  /* Makes switch disabled */
  disabled?: React.InputHTMLAttributes<T>['disabled'];
  /* Makes switch invalid */
  invalid?: boolean;
  /**
   * If `true`, the switch will be initially checked.
   */
  defaultChecked?: boolean;
  /**
   * If `true`, the switch will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  checked?: boolean;
  /**
   * The callback invoked when the checked state of the `switch` changes..
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /* Switch id */
  id?: string;
  /* Switch name */
  name?: string;
  /* Switch value */
  value?: string | number;
  /* Size of the switch */
  size?: 'sm' | 'md' | 'lg';
  /* Set the switch color */
  color?: string;
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
    color = 'primary',
    defaultChecked,
    checked,
    size = 'md',

    onChange,
    children,
    className,
    autoFocus = false,
    ...rest
  } = props;

  const { disabled, invalid } = useFormControl(props);

  const switchClasses = useSwitchClass({
    size,
    disabled,
    checked,
  });

  const switchBoxClasses = useSwitchBoxClass({
    size,
    checked,
  });

  return (
    <label className="form-switch-label" {...rest}>
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
        defaultChecked={defaultChecked}
        onChange={onChange}
        checked={checked}
        data-disabled={disabled}
        disabled={disabled}
        autoFocus={autoFocus}
      />
      <div className={cx(switchClasses, className)} data-disabled={disabled} data-color={color ? color : undefined}>
        <div className={cx(switchBoxClasses)} />
        <span className={`sr-only bg-white text-black`}>{ariaLabel}</span>
      </div>
    </label>
  );
});

if (__DEV__) {
  Switch.displayName = 'Switch';
}

export default Switch;
