import { Icon as InternalIcon, IconProps as InternalIconProps } from './icon';
import { IconPadded } from './icon-padded';
interface IconProps
  extends InternalIconProps,
    React.ForwardRefExoticComponent<InternalIconProps & React.RefAttributes<HTMLElement>> {
  Padded: typeof IconPadded;
}

const Icon = InternalIcon as IconProps;

Icon.Padded = IconPadded;

export type { IconProps };
export { Icon };
