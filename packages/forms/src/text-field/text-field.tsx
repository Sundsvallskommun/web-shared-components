import React from 'react';
import Input, { InputProps } from '../input';

export interface TextFieldProps extends Omit<InputProps, 'type' | 'as'> {
  type?: 'text' | 'email' | 'password' | 'url';
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { type = 'text', ...rest } = props;
  return <Input type={type} ref={ref} {...rest} />;
});
