import { __DEV__, cx, DefaultProps, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';

import { InputAddinProps, InputLeftAddin, InputRightAddin } from '../input-addin';
import { InputAddonProps, InputLeftAddon, InputRightAddon } from '../input-addon';
import { Input, InputProps } from '../input/input';
import { useInputGroupClass } from './styles';

export interface InputGroupInnerProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /* Size of all wrapped input */
  size?: InputProps['size'];
  /* React node */
  children?: React.ReactNode;
  /* Makes input invalid */
  invalid?: boolean;
  /* Makes input disabled */
  disabled?: boolean;
  /* Makes input readonly */
  readOnly?: boolean;
}

export const InputGroupInner = React.forwardRef<HTMLDivElement, InputGroupInnerProps>((props, ref) => {
  const { children, className, size = 'md', invalid, disabled, readOnly, ...rest } = props;
  const classes = useInputGroupClass({ size });

  const validChildren = getValidChildren(children);

  const hasLeftAddon = validChildren.some((child) => React.isValidElement(child) && child.type === InputLeftAddon);
  const hasRightAddon = validChildren.some((child) => React.isValidElement(child) && child.type === InputRightAddon);

  return (
    <div
      ref={ref}
      role="group"
      aria-invalid={invalid}
      aria-disabled={disabled}
      aria-readonly={readOnly}
      data-hasleftaddon={hasLeftAddon}
      data-hasrightaddon={hasRightAddon}
      className={cx(classes, className)}
      {...rest}
    >
      {validChildren.map((child) => {
        if (React.isValidElement<InputProps>(child) && child.type === Input) {
          return React.cloneElement(child, {
            size,
            disabled,
            readOnly,
            className: cx(child.props.className),
          });
        }
        if (
          React.isValidElement<InputAddinProps>(child) &&
          (child.type === InputLeftAddin || child.type === InputRightAddin)
        ) {
          return React.cloneElement(child, {
            size,
            className: cx(child.props.className),
          });
        }
        if (
          React.isValidElement<InputAddonProps>(child) &&
          (child.type === InputLeftAddon || child.type === InputRightAddon)
        ) {
          return;
        }
        return child;
      })}
    </div>
  );
});

if (__DEV__) {
  InputGroupInner.displayName = 'InputGroupInner';
}

export default InputGroupInner;
