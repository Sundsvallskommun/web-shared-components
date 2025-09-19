import { __DEV__, cx, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';

import { InputProps } from '../input/input';

type Placement = 'left' | 'right';

export interface InputAddonProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /* Placement of the input addon */
  placement?: Placement;
  /* Size of the input addon */
  size?: InputProps['size'];
  /* Set true if Icon addon */
  icon?: boolean;
}

const _placement = {
  left: 'sk-form-input-addon-left',
  right: 'sk-form-input-addon-right',
};

const sizes = {
  sm: 'sk-form-input-addon-sm',
  md: 'sk-form-input-addon-md',
  lg: 'sk-form-input-addon-lg',
};

const InputAddon: React.FC<InputAddonProps> = ({
  placement = 'left',
  size = 'md',
  className,
  icon,
  children,
  ...props
}) => {
  const classes = cx('sk-form-input-addon', sizes[size], _placement[placement], className);

  const validChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<{ size?: string }>(child)) {
      return React.cloneElement(child, {
        ...child?.props,
        size: child?.props?.size ?? size,
      });
    }

    return child;
  });

  return (
    <div className={classes} data-icon={icon} {...props}>
      {validChildren}
    </div>
  );
};

if (__DEV__) {
  InputAddon.displayName = 'InputAddon';
}

export const InputLeftAddon: React.FC<InputAddonProps> = (props) => <InputAddon placement="left" {...props} />;

if (__DEV__) {
  InputLeftAddon.displayName = 'InputLeftAddon';
}

export const InputRightAddon: React.FC<InputAddonProps> = (props) => <InputAddon placement="right" {...props} />;

if (__DEV__) {
  InputRightAddon.displayName = 'InputRightAddon';
}
