import { DefaultProps } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

import { InputProps } from '../input/input';

type Placement = 'left' | 'right';

export interface IInputAddinProps extends DefaultProps {
  /* Placement of the input addin */
  placement?: Placement;
  /* Size of the input addin */
  size?: InputProps['size'];
  /* Set true if Icon addIn */
  icon?: boolean;
}

const _placement = {
  left: 'sk-input-addin-left',
  right: 'sk-input-addin-right',
};

const sizes = {
  sm: 'sk-input-addin-sm',
  md: 'sk-input-addin-md',
  lg: 'sk-input-addin-lg',
};

export interface InputAddinProps extends React.HTMLAttributes<HTMLDivElement>, IInputAddinProps {}

const InputAddin: React.FC<InputAddinProps> = ({ placement = 'left', size = 'md', className, icon, ...props }) => {
  const classes = cx('sk-input-addin', sizes[size], _placement[placement], className);

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
