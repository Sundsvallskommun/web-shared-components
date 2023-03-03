import * as React from 'react';

import { Input as InternalInput, InputProps } from './input';
import { InputGroup, InputGroupProps } from '../input-group';
import { InputLeftAddon, InputRightAddon, InputAddonProps } from '../input-addon';
import { InputLeftElement, InputRightElement, InputElementProps } from '../input-element';
import { InputLeftAddin, InputRightAddin } from '../input-addin';

interface Input extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLElement>> {
  Group: typeof InputGroup;

  LeftAddon: typeof InputLeftAddon;
  RightAddon: typeof InputRightAddon;

  LeftAddin: typeof InputLeftAddin;
  RightAddin: typeof InputRightAddin;

  LeftElement: typeof InputLeftElement;
  RightElement: typeof InputRightElement;
}

const Input = InternalInput as Input;

Input.Group = InputGroup;
Input.LeftAddon = InputLeftAddon;
Input.RightAddon = InputRightAddon;
Input.LeftAddin = InputLeftAddin;
Input.RightAddin = InputRightAddin;
Input.LeftElement = InputLeftElement;
Input.RightElement = InputRightElement;

export type { InputProps, InputGroupProps, InputAddonProps, InputElementProps };

export { Input };
