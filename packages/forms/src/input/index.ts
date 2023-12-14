import React from 'react';

import { InputLeftAddin, InputRightAddin } from '../input-addin';
import { InputGroup } from '../input-group';
import { Input as InternalInput, InputProps as InternalInputProps } from './input';

interface InputProps extends React.ForwardRefExoticComponent<InternalInputProps> {
  Component: typeof InternalInput;
  Group: typeof InputGroup;
  LeftAddin: typeof InputLeftAddin;
  RightAddin: typeof InputRightAddin;
}

export const Input = {
  ...InternalInput,
  Component: InternalInput,
  Group: InputGroup,
  LeftAddin: InputLeftAddin,
  RightAddin: InputRightAddin,
} as InputProps;

export type { InputProps };
export default Input;
