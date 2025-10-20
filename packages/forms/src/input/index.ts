import React from 'react';

import { InputLeftAddin, InputRightAddin } from '../input-addin';
import { InputGroupInner } from '../input-group/inner-group';
import { Input as InternalInput, InputProps as InternalInputProps } from './input';
import { InputLeftAddon, InputRightAddon } from '../input-addon';
import { InputGroupOuter } from '../input-group';

interface InputProps extends React.ForwardRefExoticComponent<InternalInputProps> {
  Component: typeof InternalInput;
  /** Group is replaced by innergroup
   * @deprecated
   */
  Group: typeof InputGroupInner;
  InnerGroup: typeof InputGroupInner;
  OuterGroup: typeof InputGroupOuter;
  LeftAddin: typeof InputLeftAddin;
  RightAddin: typeof InputRightAddin;
  LeftAddon: typeof InputLeftAddon;
  RightAddon: typeof InputRightAddon;
}

export const Input = {
  ...InternalInput,
  Component: InternalInput,
  Group: InputGroupInner,
  InnerGroup: InputGroupInner,
  OuterGroup: InputGroupOuter,
  LeftAddin: InputLeftAddin,
  RightAddin: InputRightAddin,
  LeftAddon: InputLeftAddon,
  RightAddon: InputRightAddon,
} as InputProps;

export type { InputProps };
export default Input;
