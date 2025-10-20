import { __DEV__, cx, DefaultProps, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';

import { InputAddonProps, InputLeftAddon, InputRightAddon } from '../input-addon';
import { InputProps } from '../input/input';

export interface InputGroupOuterProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /* Size of all wrapped input */
  size?: InputProps['size'];
}

export const InputGroupOuter = React.forwardRef<HTMLDivElement, InputGroupOuterProps>((props, ref) => {
  const { children, className, size = 'md', ...rest } = props;

  const validChildren = getValidChildren(children);
  const hasLeftAddon = validChildren.some((child) => React.isValidElement(child) && child.type === InputLeftAddon);
  const hasRightAddon = validChildren.some((child) => React.isValidElement(child) && child.type === InputRightAddon);
  return (
    <div
      ref={ref}
      className={cx('sk-form-input-group-outer', className)}
      role="group"
      data-hasleftaddon={hasLeftAddon}
      data-hasrightaddon={hasRightAddon}
      {...rest}
    >
      {validChildren.map((child) => {
        if (React.isValidElement<InputAddonProps>(child) && child.type === InputLeftAddon) {
          return React.cloneElement(child, {
            size,
            className: cx(child.props.className),
          });
        }
      })}
      {validChildren
        .filter((child) => child.type !== InputLeftAddon && child.type !== InputRightAddon)
        .map((child) => {
          if (React.isValidElement<{ size?: InputGroupOuterProps['size'] }>(child)) {
            return React.cloneElement(child, {
              size,
              ...child.props,
            });
          }
          return child;
        })}
      {validChildren.map((child) => {
        if (React.isValidElement<InputAddonProps>(child) && child.type === InputRightAddon) {
          return React.cloneElement(child, {
            size,
            className: cx(child.props.className),
          });
        }
      })}
    </div>
  );
});

if (__DEV__) {
  InputGroupOuter.displayName = 'InputGroupOuter';
}

export default InputGroupOuter;
