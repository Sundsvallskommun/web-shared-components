import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';

import { RadioButtonProps } from './radio';
import { useRadioButtonGroupClass } from './styles';
import { RadioButtonGroupContext } from './context';

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
  const { current: isControlled } = React.useRef(valueProp != null);
  const [value, setValue] = React.useState(defaultValue || null);
  const _value = isControlled ? valueProp : value;
  const autoId = React.useId();

  const rootRef = React.useRef<HTMLUListElement>(null);

  const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setValue(event.target.value);
    }

    if (onChange) {
      onChange(event, event.target.value);
    }
  };

  // If no name is passed, we'll generate a random, unique name
  const fallbackName = `radio-${autoId}`;
  const _name = name || fallbackName;

  const context = {
    handleChange: _onChange,
    name: _name,
    size: size,
    color: color,
    value: _value,
  };

  const validChildren = getValidChildren<RadioButtonProps>(children);

  const clones = validChildren.map((child, index) => {
    return (
      <li role="none" key={index} className={cx(child.props.className)}>
        {child}
      </li>
    );
  });

  // Calling focus() on the radiogroup should focus on the selected option or first enabled option
  React.useImperativeHandle(
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
    <RadioButtonGroupContext.Provider value={context}>
      <ul
        ref={rootRef}
        role="radiogroup"
        className={cx(classes, className)}
        data-direction={inline ? 'row' : 'column'}
        {...rest}
      >
        {clones}
      </ul>
    </RadioButtonGroupContext.Provider>
  );
});

if (__DEV__) {
  RadioButtonGroup.displayName = 'RadioButtonGroup';
}
