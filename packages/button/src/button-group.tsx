import { DefaultProps } from '@sk-web-gui/utils';
import { cx, getValidChildren, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { Divider } from '@sk-web-gui/divider';

import { ButtonProps } from './button';

export interface ButtonGroupProps extends DefaultProps {
  /** Set all wrapped button disabled */
  disabled?: boolean;
  /** Set all wrapped button size */
  size?: ButtonProps['size'];
  /** Set all wrapped button appearance */
  variant?: ButtonProps['variant'];
  inverted?: boolean;
  children?: React.ReactNode;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
  const { size = 'sm', variant = 'tertiary', disabled, children, className, ...rest } = props;

  const validChildren = getValidChildren(children);
  const clones = validChildren.map((child, i) => {
    if (React.isValidElement<ButtonProps>(child)) {
      return React.cloneElement(child, {
        size: size || child.props.size,
        variant: child.props.variant || variant,
        disabled: child.props.disabled || disabled,
        key: `sk-btn-group-button-${i}`,
      });
    } else {
      return React.cloneElement(child, {
        key: `sk-btn-group-button-${i}`,
      });
    }
  });

  return (
    <div ref={ref} role="group" className={cx('sk-btn-group', 'sk-btn-group-attached', className)} {...rest}>
      {React.Children.map(clones, (clone, i) => {
        return (
          <>
            {clone}
            {i !== clones.length - 1 && (
              <div key={`sk-btn-group-divider-${i}`} className="sk-btn-group-divider">
                <Divider orientation="vertical" />
              </div>
            )}
          </>
        );
      })}
    </div>
  );
});

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}

export default ButtonGroup;
