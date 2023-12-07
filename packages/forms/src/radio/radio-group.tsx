import { useId } from '@reach/auto-id';
import { DefaultProps } from '@sk-web-gui/utils';
import { cx, getValidChildren, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { cloneElement, useImperativeHandle, useRef, useState } from 'react';

import { RadioButtonProps } from './radio';
import { useRadioButtonGroupClass } from './styles';

export interface RadioButtonGroupProps extends DefaultProps {
  /**
   * The id of the radio group.
   */
  id?: string;
  /**
   * The name of the radio group. This prop is passed to each checbox
   */
  name?: string;
  /**
   * The content of the radio group. Must be the `Radio` component
   */
  children?: React.ReactNode;
  /**
   * The initial value of the radio group
   */
  defaultValue?: RadioButtonProps['value'];
  /**
   * The value of the radio group
   */
  value?: RadioButtonProps['value'];
  /* Size of all wrapped radio */

  size?: RadioButtonProps['size'];
  /* Color of all wrapped radio */

  color?: RadioButtonProps['color'];
  /**
   * The callback fired when any children Radio is checked or unchecked
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: RadioButtonProps['value']) => void;
  /**
   * If `true`, the radio will aligned horizontally.
   */
  inline?: boolean;
}

type RadioButtonGroupElement =
  | {
      focus: () => void;
    }
  | undefined;

export const RadioButtonGroup = React.forwardRef<RadioButtonGroupElement, RadioButtonGroupProps>((props, ref) => {
  const {
    onChange,
    name,
    color,
    size = 'md',
    defaultValue,
    inline,
    value: valueProp,
    children,
    className,
    ...rest
  } = props;
  const { current: isControlled } = useRef(valueProp != null);
  const [value, setValue] = useState(defaultValue || null);
  const _value = isControlled ? valueProp : value;

  const rootRef = useRef<HTMLDivElement>(null);

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setValue(event.target.value);
    }

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `radio-${useId()}`;
  const _name = name || fallbackName;

  const validChildren = getValidChildren(children);

  const clones = validChildren.map((child, index) => {
    return (
      <div key={index}>
        {cloneElement(child, {
          size: child.props.size || size,
          color: child.props.color || color,
          name: _name,
          onChange: _onChange,
          checked: child.props.value === _value,
        })}
      </div>
    );
  });

  // Calling focus() on the radiogroup should focus on the selected option or first enabled option
  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        let input: HTMLInputElement | null = rootRef.current?.querySelector('input:not(:disabled):checked') || null;

        if (!input) {
          input = rootRef.current?.querySelector('input:not(:disabled)') || null;
        }

        if (input) {
          input.focus();
        }
      },
    }),
    []
  );

  const classes = useRadioButtonGroupClass({ size });

  return (
    <div
      ref={rootRef}
      role="radiogroup"
      className={cx(classes, className)}
      data-direction={inline ? 'row' : 'column'}
      {...rest}
    >
      {clones}
    </div>
  );
});

if (__DEV__) {
  RadioButtonGroup.displayName = 'RadioButtonGroup';
}
