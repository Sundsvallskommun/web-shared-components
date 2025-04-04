import { DefaultProps } from '@sk-web-gui/utils';
import { cx, getValidChildren, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';

import { Input, InputProps } from '../input/input';
import { useInputGroupClass } from './styles';
import { InputAddinProps, InputLeftAddin, InputRightAddin } from '../input-addin';

export interface InputGroupProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
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

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>((props, ref) => {
  const { children, className, size = 'md', invalid, disabled, readOnly, ...rest } = props;
  const classes = useInputGroupClass({ size });

  const validChildren = getValidChildren(children);

  return (
    <div
      ref={ref}
      role="group"
      aria-invalid={invalid}
      aria-disabled={disabled}
      area-readonly={readOnly}
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
        return child;
      })}
    </div>
  );
});

if (__DEV__) {
  InputGroup.displayName = 'InputGroup';
}

export default InputGroup;
