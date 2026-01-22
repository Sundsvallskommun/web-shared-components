import React from 'react';
import { TextareaProps as InternalTextareaProps, Textarea as InternalTextarea } from './textarea';
import { TextareaGroup } from './textarea-group';

interface TextareaProps extends React.ForwardRefExoticComponent<InternalTextareaProps> {
  Component: typeof InternalTextarea;
  Group: typeof TextareaGroup;
}

export const Textarea = {
  ...InternalTextarea,
  Component: InternalTextarea,
  Group: TextareaGroup,
} as TextareaProps;

export type { TextareaProps };
export default Textarea;
