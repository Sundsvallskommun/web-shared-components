import React from 'react';
import { CheckboxItemProps } from './checkbox';

export interface UseCheckboxGroupData {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: CheckboxItemProps['size'];
  color?: CheckboxItemProps['color'];
  name?: CheckboxItemProps['name'];
  value?: Array<CheckboxItemProps['value']>;
}

export const CheckboxGroupContext = React.createContext<UseCheckboxGroupData>({});
