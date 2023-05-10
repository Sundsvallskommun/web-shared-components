import * as React from 'react';

import { Radio as InternalRadio, RadioProps as InternalRadioProps } from './radio';
import { RadioGroup, RadioGroupProps } from './radio-group';

interface RadioProps
  extends InternalRadioProps,
    React.ForwardRefExoticComponent<InternalRadioProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof RadioGroup;
}

const Radio = InternalRadio as RadioProps;

Radio.Group = RadioGroup;

export type { RadioProps, RadioGroupProps };

export { Radio, RadioGroup };
export default Radio;
