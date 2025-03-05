import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';

import { CheckboxItemProps } from './checkbox';
import { CheckboxGroupContext } from './context';

export interface CheckboxGroupProps extends DefaultProps {
  /**
   * The id of the checkbox group.
   */
  id?: CheckboxItemProps['id'];
  /**
   * The name of the checkbox group. This prop is passed to each checbox
   */
  name?: CheckboxItemProps['name'];
  /**
   * The content of the checkbox group. Must be the `Checkbox` component
   */
  children?: React.ReactNode;
  /**
   * The initial value of the checkbox group
   */
  defaultValue?: Array<CheckboxItemProps['value']>;
  /**
   * The value of the checkbox group
   */
  value?: Array<CheckboxItemProps['value']>;
  /**
   * The callback fired when any children Checkbox is checked or unchecked
   */
  onChange?: (value: Array<CheckboxItemProps['value']>) => void;
  /**
   * If `true`, the checkboxes will aligned horizontally.
   * @default column
   */
  direction?: 'row' | 'column';
  /* Size of all wrapped checkbox */
  size?: CheckboxItemProps['size'];
  /* Color of all wrapped checkbox */
  color?: CheckboxItemProps['color'];
}

export const CheckboxGroup = React.forwardRef<HTMLUListElement, CheckboxGroupProps>((props, ref) => {
  const { onChange, name, color, size, defaultValue, direction, value: valueProp, children, ...rest } = props;
  const [values, setValues] = React.useState(defaultValue || []);
  const autoId = React.useId();

  const { current: isControlled } = React.useRef(valueProp != null);
  const _values = isControlled ? valueProp : values;

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    let newValues;
    if (checked) {
      newValues = [...(_values || []), value];
    } else {
      newValues = (_values || []).filter((val) => val !== value);
    }

    if (!isControlled) {
      setValues(newValues);
    }
    onChange?.(newValues);
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `checkbox-${autoId}`;
  const _name = name || fallbackName;

  const context = {
    handleChange: _onChange,
    name: _name,
    size: size,
    color: color,
    value: _values,
  };

  const validChildren = getValidChildren<CheckboxItemProps>(children);

  const clones = validChildren.map((child, index) => {
    return (
      <li key={index} role="none" className={cx(child?.props?.className)}>
        {child}
      </li>
    );
  });

  return (
    <CheckboxGroupContext.Provider value={context}>
      <ul className="sk-form-checkbox-group" role="group" data-direction={direction} ref={ref} {...rest}>
        {clones}
      </ul>
    </CheckboxGroupContext.Provider>
  );
});

if (__DEV__) {
  CheckboxGroup.displayName = 'CheckboxGroup';
}
