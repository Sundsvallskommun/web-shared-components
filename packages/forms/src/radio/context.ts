import React from 'react';
import { RadioButtonProps } from './radio';

export interface UseRadioButtonGroupData {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  size?: RadioButtonProps['size'];
  color?: RadioButtonProps['color'];
  name?: RadioButtonProps['name'];
  value?: RadioButtonProps['value'] | null;
}

export const RadioButtonGroupContext = React.createContext<UseRadioButtonGroupData>({});
