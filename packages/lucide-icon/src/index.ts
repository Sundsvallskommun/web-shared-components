import React from 'react';
import { LucideIcon as InternalLucideIcon, LucideIconProps as InternalLucideIconProps } from './lucide-icon';
import LucideIconPadded from './lucide-icon-padded';

interface LucideIconProps extends React.ForwardRefExoticComponent<InternalLucideIconProps> {
  Component: typeof InternalLucideIcon;
  Padded: typeof LucideIconPadded;
}

export const LucideIcon = {
  ...InternalLucideIcon,
  Component: InternalLucideIcon,
  Padded: LucideIconPadded,
} as LucideIconProps;

export type { LucideIconProps };
export default LucideIcon;
