import React from 'react';
import { Icon as InternalIcon, IconProps as InternalIconProps } from './icon';
import { LucideIcon as InternalLucideIcon, LucideIconProps as InternalLucideIconProps } from './lucide-icon';
import { IconPadded } from './icon-padded';
import LucideIconPadded from './lucide-icon-padded';

interface IconProps extends React.ForwardRefExoticComponent<InternalIconProps> {
  Component: typeof InternalIcon;
  Padded: typeof IconPadded;
}

export const Icon = {
  ...InternalIcon,
  Component: InternalIcon,
  Padded: IconPadded,
} as IconProps;

interface LucideIconProps extends React.ForwardRefExoticComponent<InternalLucideIconProps> {
  Component: typeof InternalLucideIcon;
  Padded: typeof LucideIconPadded;
}

export const LucideIcon = {
  ...InternalLucideIcon,
  Component: InternalLucideIcon,
  Padded: LucideIconPadded,
} as LucideIconProps;

export type { IconProps, LucideIconProps };
export default LucideIcon;
