import { useFormControl } from '../form-control';
import { cx, useForkRef, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { useEffect, useRef } from 'react';
import { Icon } from '@sk-web-gui/icon';
import { Minus, Check } from 'lucide-react';

import { useCheckboxClass, useCheckboxLabelClass } from './styles';
import { useCheckboxGroup } from './checkbox-group';

export interface CheckboxItemProps<T = HTMLInputElement>
  extends DefaultProps,
    Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  /* Makes checkbox invalid */
  invalid?: boolean;
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
  /** Set the checkbox color
   * @default primary
   */
  color?: string;
  /** Size of the checkbox
   * @default md
   */
  size?: 'sm' | 'md' | 'lg';
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
  const checked =
    _checked !== undefined || ref
      ? _checked
      : groupContext.value
        ? (groupContext.value || []).includes(value)
        : undefined;

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
        className,
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
        className={cx(checkboxClasses)}
        {...rest}
      />
      <Icon.Padded variant="ghost" icon={indeterminate ? <Minus /> : <Check />} />
      {children && labelPosition === 'right' && <span className={cx(checkboxLabelClasses)}>{children}</span>}
    </label>
  );
});

if (__DEV__) {
  Checkbox.displayName = 'Checkbox';
}

export default Checkbox;
