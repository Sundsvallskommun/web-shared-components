import { useId } from '@reach/auto-id';
import { cx, getValidChildren, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { cloneElement, useRef, useState } from 'react';

import { CheckboxItemProps } from './checkbox';

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
   */
  inline?: boolean;
  /* Size of all wrapped checkbox */
  size?: CheckboxItemProps['size'];
  /* Color of all wrapped checkbox */
  color?: CheckboxItemProps['color'];
}

export const CheckboxGroup = React.forwardRef<HTMLUListElement, CheckboxGroupProps>((props, ref) => {
  const { onChange, name, color, size, defaultValue, inline, value: valueProp, children, ...rest } = props;
  const [values, setValues] = useState(defaultValue || []);

  const { current: isControlled } = useRef(valueProp != null);
  const _values = isControlled ? valueProp : values;

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    let newValues;
    if (checked) {
      newValues = [...(_values || []), value];
    } else {
      newValues = (_values || []).filter((val) => val !== value);
    }

    !isControlled && setValues(newValues);
    onChange && onChange(newValues);
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `checkbox-${useId()}`;
  const _name = name || fallbackName;

  const validChildren = getValidChildren(children);

  const clones = validChildren.map((child, index) => {
    return (
      <li key={index} className={cx(inline ? 'inline-block' : 'block', child.props.className)}>
        {cloneElement(child, {
          size: size,
          color: child.props.color || color,
          name: `${_name}-${index}`,
          onChange: _onChange,
          checked: (_values || []).includes(child.props.value),
        })}
      </li>
    );
  });

  return (
    <ul className="sk-form-checkbox-group" role="group" ref={ref} {...rest}>
      {clones}
    </ul>
  );
});

if (__DEV__) {
  CheckboxGroup.displayName = 'CheckboxGroup';
}
