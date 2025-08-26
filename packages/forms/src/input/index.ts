import React from 'react';

import { InputLeftAddin, InputRightAddin } from '../input-addin';
import { InputGroup } from '../input-group';
import { Input as InternalInput, InputProps as InternalInputProps } from './input';
import { InputLeftAddon, InputRightAddon } from '../input-addon';

interface InputProps extends React.ForwardRefExoticComponent<InternalInputProps> {
  Component: typeof InternalInput;
  Group: typeof InputGroup;
  LeftAddin: typeof InputLeftAddin;
  RightAddin: typeof InputRightAddin;
  LeftAddon: typeof InputLeftAddon;
  RightAddon: typeof InputRightAddon;
}

export const Input = {
  ...InternalInput,
  Component: InternalInput,
  Group: InputGroup,
  LeftAddin: InputLeftAddin,
  RightAddin: InputRightAddin,
  LeftAddon: InputLeftAddon,
  RightAddon: InputRightAddon,
} as InputProps;

export type { InputProps };
export default Input;
