import * as React from 'react';

import { Checkbox as InternalCheckbox, CheckboxProps as CheckboxPropsInternal } from './checkbox';
import { CheckboxGroup, CheckboxGroupProps } from './checkbox-group';

interface CheckboxProps
  extends CheckboxPropsInternal,
    React.ForwardRefExoticComponent<CheckboxPropsInternal & React.RefAttributes<HTMLInputElement>> {
  Group: typeof CheckboxGroup;
}

const Checkbox = InternalCheckbox as CheckboxProps;

Checkbox.Group = CheckboxGroup;

export type { CheckboxProps, CheckboxGroupProps };

export { Checkbox, CheckboxGroup };
export default Checkbox;
