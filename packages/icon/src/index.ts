import React from 'react';
import { Icon as InternalIcon, IconProps as InternalIconProps } from './icon';
import { IconPadded } from './icon-padded';

interface IconProps extends React.ForwardRefExoticComponent<InternalIconProps> {
  Component: typeof InternalIcon;
  Padded: typeof IconPadded;
}

export const Icon = {
  ...InternalIcon,
  Component: InternalIcon,
  Padded: IconPadded,
} as IconProps;

export type { IconProps };
export default Icon;
