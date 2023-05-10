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
}

const _placement = {
  left: 'form-input-addin-left',
  right: 'form-input-addin-right',
};

const sizes = {
  xs: 'form-input-addin-xs',
  sm: 'form-input-addin-sm',
  md: 'form-input-addin-md',
  lg: 'form-input-addin-lg',
  xl: 'form-input-addin-xl',
};

export interface InputAddinProps extends React.HTMLAttributes<HTMLDivElement>, IInputAddinProps {}

const InputAddin: React.FC<InputAddinProps> = ({ placement = 'left', size = 'md', className, ...props }) => {
  const classes = cx('form-input-addin', sizes[size], _placement[placement], className);

  return <div className={classes} {...props} />;
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
