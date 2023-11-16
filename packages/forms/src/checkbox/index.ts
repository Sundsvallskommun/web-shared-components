import * as React from 'react';

import { CheckboxItemProps, Checkbox as InternalCheckbox } from './checkbox';
import { CheckboxGroup, CheckboxGroupProps } from './checkbox-group';

interface CheckboxProps
  extends CheckboxItemProps,
    React.ForwardRefExoticComponent<CheckboxItemProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof CheckboxGroup;
}

const Checkbox = InternalCheckbox as CheckboxProps;

Checkbox.Group = CheckboxGroup;

export type { CheckboxGroupProps, CheckboxProps, CheckboxItemProps };

export { Checkbox, CheckboxGroup };
export default Checkbox;
