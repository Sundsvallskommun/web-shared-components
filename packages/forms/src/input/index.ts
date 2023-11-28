import * as React from 'react';

import { Input as InternalInput, InputProps } from './input';
import { InputGroup, InputGroupProps } from '../input-group';
import { InputLeftAddin, InputRightAddin, InputAddinProps } from '../input-addin';

interface InputPropsComplex
  extends InputProps,
    React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLElement>> {
  Group: typeof InputGroup;

  LeftAddin: typeof InputLeftAddin;
  RightAddin: typeof InputRightAddin;
}

const Input = InternalInput as InputPropsComplex;

Input.Group = InputGroup;
Input.LeftAddin = InputLeftAddin;
Input.RightAddin = InputRightAddin;

export type { InputPropsComplex, InputProps, InputGroupProps, InputAddinProps };

export { Input };
export default Input;
