import React from 'react';

import { ButtonContent, Button as InternalButton, ButtonProps as InternalButtonProps } from './button';
import { ButtonGroup } from './button-group';

interface ButtonProps extends React.ForwardRefExoticComponent<InternalButtonProps> {
  Component: typeof InternalButton;
  Group: typeof ButtonGroup;
  Content: typeof ButtonContent;
}

export const Button = {
  ...InternalButton,
  Component: InternalButton,
  Group: ButtonGroup,
  Content: ButtonContent,
} as ButtonProps;

export type { ButtonProps };
export default Button;
