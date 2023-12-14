import React from 'react';

import { CheckboxItemProps, Checkbox as InternalCheckbox } from './checkbox';
import { CheckboxGroup } from './checkbox-group';

interface CheckboxProps extends React.ForwardRefExoticComponent<CheckboxItemProps> {
  Component: typeof InternalCheckbox;
  Group: typeof CheckboxGroup;
}

export const Checkbox = {
  ...InternalCheckbox,
  Component: InternalCheckbox,
  Group: CheckboxGroup,
} as CheckboxProps;

export type { CheckboxProps };

export default Checkbox;
