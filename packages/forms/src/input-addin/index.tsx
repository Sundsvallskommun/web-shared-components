import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

import { InputProps } from '../input/input';

type Placement = 'left' | 'right';

export interface InputAddinProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /* Placement of the input addin */
  placement?: Placement;
  /* Size of the input addin */
  size?: InputProps['size'];
  /* Set true if Icon addIn */
  icon?: boolean;
}

const _placement = {
  left: 'sk-form-input-addin-left',
  right: 'sk-form-input-addin-right',
};

const sizes = {
  sm: 'sk-form-input-addin-sm',
  md: 'sk-form-input-addin-md',
  lg: 'sk-form-input-addin-lg',
};

const InputAddin: React.FC<InputAddinProps> = ({ placement = 'left', size = 'md', className, icon, ...props }) => {
  const classes = cx('sk-form-input-addin', sizes[size], _placement[placement], className);

  return <div className={classes} data-icon={icon} {...props} />;
};

if (__DEV__) {
  InputAddin.displayName = 'InputAddin';
}

export const InputLeftAddin: React.FC<InputAddinProps> = (props) => <InputAddin placement="left" {...props} />;

if (__DEV__) {
  InputLeftAddin.displayName = 'InputLeftAddin';
}

export const InputRightAddin: React.FC<InputAddinProps> = (props) => <InputAddin placement="right" {...props} />;

if (__DEV__) {
  InputRightAddin.displayName = 'InputRightAddin';
}
