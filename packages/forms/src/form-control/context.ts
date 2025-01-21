import React from 'react';
import { UseFormControlProps } from './use-form-control';

//eslint-disable-next-line
export type FormControlObject = Record<string, any>;

export const FormControlContext = React.createContext<(UseFormControlProps & FormControlObject) | undefined>(undefined);
