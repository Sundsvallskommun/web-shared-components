import React from 'react';
import { UseAccordionProps } from './accordion';

export const AccordionContext = React.createContext<UseAccordionProps>({ allowMultipleOpen: false });
