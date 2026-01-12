import React from 'react';
import { cx, DefaultProps } from '@sk-web-gui/utils';
import Icon, { IconProps } from '@sk-web-gui/icon';
import { useAlert } from './context';

export type AlertIconProps = DefaultProps & React.ComponentProps<IconProps['Component']>;

const translateIconSize = (size: string) => {
  switch (size) {
    case 'sm':
      return 18;
    case 'md':
      return 20;
    case 'lg':
      return 22;
    default:
      return 20;
  }
};

export const AlertIcon = React.forwardRef<HTMLSpanElement, AlertIconProps>((props) => {
  const { size: iconSize, icon, iconColor } = useAlert();
  const { className, size = translateIconSize(iconSize), ...rest } = props;

  return <Icon icon={icon} color={iconColor} size={size} className={cx('sk-alert-icon', className)} {...rest} />;
});
