import * as React from 'react';

import { Button as InternalButton, ButtonProps, getButtonContent } from './button';
import { ButtonGroup, ButtonGroupProps } from './button-group';

interface ButtonPropsComplex
  extends ButtonProps,
    React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>> {
  Group: typeof ButtonGroup;
}

const Button = InternalButton as ButtonPropsComplex;

Button.Group = ButtonGroup;

export type { ButtonProps, ButtonPropsComplex, ButtonGroupProps };

export { Button, ButtonGroup, getButtonContent };
export default Button;
