import React from 'react';

import { InternalRadioButton, RadioButtonProps as InternalRadioButtonProps } from './radio';
import { RadioButtonGroup } from './radio-group';

interface RadioButtonProps extends React.ForwardRefExoticComponent<InternalRadioButtonProps> {
  Component: typeof InternalRadioButton;
  Group: typeof RadioButtonGroup;
}

export const RadioButton = {
  ...InternalRadioButton,
  Component: InternalRadioButton,
  Group: RadioButtonGroup,
} as RadioButtonProps;

export type { RadioButtonProps };

export default RadioButton;
