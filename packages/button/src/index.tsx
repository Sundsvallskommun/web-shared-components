import * as React from 'react';

import { Button as InternalButton, ButtonProps as InternalButtonProps, getButtonContent } from './button';
import { ButtonGroup, ButtonGroupProps } from './button-group';
// import { IconButton, IconButtonProps } from './icon-button';
interface ButtonProps
  extends InternalButtonProps,
    React.ForwardRefExoticComponent<InternalButtonProps & React.RefAttributes<HTMLButtonElement>> {
  Group: typeof ButtonGroup;
}

const Button = InternalButton as ButtonProps;

Button.Group = ButtonGroup;

export type { ButtonProps, ButtonGroupProps };

export { Button, ButtonGroup, getButtonContent };
export default Button;
