import React from 'react';
import { UseDisclosureProps } from './use-disclosure';
import { DisclosureDefualtProps } from './disclosure';

export const DisclosureContext = React.createContext<UseDisclosureProps>({});
export const DisclosureHeaderContext = React.createContext<Omit<DisclosureDefualtProps, 'open'>>({});
