import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { Icon, type IconProps } from '@sk-web-gui/icon';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';

export interface LucideIconProps extends React.ComponentProps<IconProps['Component']> {
  name?: IconName;
}

export const LucideIcon = React.forwardRef<HTMLSpanElement, LucideIconProps>((props, ref) => {
  const { name, className, ...rest } = props;

  return (
    <Icon
      ref={ref}
      className={cx('sk-lucide-icon', className)}
      icon={name ? <DynamicIcon name={name} /> : undefined}
      data-testid={name ? `sk-icon-${name}` : undefined}
      {...rest}
    />
  );
});

if (__DEV__) {
  LucideIcon.displayName = 'LucideIcon';
}

export default LucideIcon;
