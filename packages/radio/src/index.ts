import React from 'react';

import { RadioButton as InternalRadioButton, RadioButtonProps as InternalRadioButtonProps } from './radio';
import { RadioButtonGroup, RadioButtonGroupProps } from './radio-group';

interface RadioButtonProps
  extends InternalRadioButtonProps,
    React.ForwardRefExoticComponent<InternalRadioButtonProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof RadioButtonGroup;
}

const RadioButton = InternalRadioButton as RadioButtonProps;

RadioButton.Group = RadioButtonGroup;

export type { RadioButtonProps, RadioButtonGroupProps };

export { RadioButton, RadioButtonGroup };
export default RadioButton;
