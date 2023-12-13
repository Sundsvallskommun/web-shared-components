import { useFormControl } from '../form-control';
import { cx, useForkRef, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { useEffect, useRef } from 'react';
import { Icon } from '@sk-web-gui/icon';

import { useCheckboxClass, useCheckboxLabelClass } from './styles';
import { useCheckboxGroup } from './checkbox-group';

export interface ICheckboxProps<T = HTMLInputElement> extends DefaultProps {
  /* Makes checkbox disabled */
  disabled?: React.InputHTMLAttributes<T>['disabled'];
  /* Makes checkbox invalid */
  invalid?: boolean;
  /* Makes checkbox required */
  required?: React.InputHTMLAttributes<T>['required'];
  /* Makes checkbox readOnly */
  readOnly?: React.InputHTMLAttributes<T>['readOnly'];
  /* Makes checkbox indeterminate */
  indeterminate?: boolean;
  /**
   * If true, the checkbox will be initially checked.
   */
  defaultChecked?: boolean;
  /**
   * If true, the checkbox will be checked.
   * You'll need to pass `onChange` to update it's value (since it's now controlled)
   */
  checked?: boolean;
  /** Checkbox id */
  id?: string;
  /** Checkbox name */
  name?: string;
  /** Checkbox value */
  value?: string;
  /** Set the checkbox color
   * @default primary
   */
  color?: string;
  /** Size of the checkbox
   * @default md
   */
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
   * A11y: Refers to the id of the element that labels the checkbox element.
   */
  'aria-labelledby'?: string;
  /**
   * The children is the label to be displayed to the right of the checkbox.
   */
  children?: React.ReactNode;
  /**
   * The callback invoked when the checked state of the `Checkbox` changes..
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Position the label text (children) left or right of the checkbox. Defaults to right.
   * @default right
   */
  labelPosition?: 'left' | 'right';
}

export type CheckboxItemProps = ICheckboxProps & React.HTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxItemProps>((props, ref) => {
  const {
    id,
    name: _name,
    value,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedby,
    color: _color,
    defaultChecked,
    checked: _checked,
    size: _size,
    onChange,
    indeterminate,
    children,
    className,
    labelPosition = 'right',
    ...rest
  } = props;

  const { disabled, invalid, readOnly, ...formControl } = useFormControl(props);
  const groupContext = useCheckboxGroup();

  const size = _size || groupContext?.size || formControl?.size || 'md';
  const name = _name || groupContext?.name;
  const color = _color || groupContext.color || 'primary';
  const checked = _checked !== undefined || ref ? _checked : (groupContext.value || []).includes(value);

  const checkboxClasses = useCheckboxClass({
    size,
    disabled,
  });

  const checkboxLabelClasses = useCheckboxLabelClass({ size });

  const ownRef = useRef();
  const _ref = useForkRef(ownRef, ref);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (_ref.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _ref.current.indeterminate = Boolean(indeterminate);
    }
  }, [indeterminate, _ref]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    groupContext.handleChange && groupContext.handleChange(event);
    onChange && onChange(event);
  };
  return (
    <label
      className={cx(
        'sk-form-checkbox-label-wrapper',
        disabled && 'cursor-not-allowed',
        labelPosition === 'left' ? 'sk-form-checkbox-label-left' : 'sk-form-checkbox-label-right'
      )}
    >
      {children && labelPosition === 'left' && <span className={cx(checkboxLabelClasses)}>{children}</span>}
      <input
        type="checkbox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedby}
        id={id}
        ref={_ref}
        name={name}
        value={value}
        onChange={readOnly ? undefined : handleChange}
        defaultChecked={readOnly ? undefined : defaultChecked}
        checked={readOnly ? Boolean(checked) : defaultChecked ? undefined : checked}
        disabled={disabled}
        aria-disabled={disabled}
        readOnly={readOnly}
        aria-readonly={readOnly}
        aria-invalid={invalid}
        aria-checked={indeterminate ? 'mixed' : checked}
        data-color={color ? color : undefined}
        className={cx(checkboxClasses, className)}
        {...rest}
      />
      <Icon variant="ghost" name={indeterminate ? 'minus' : 'check'} />
      {children && labelPosition === 'right' && <span className={cx(checkboxLabelClasses)}>{children}</span>}
    </label>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}

export default Checkbox;
