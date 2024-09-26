import { __DEV__, cx } from '@sk-web-gui/utils';
import { icons } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import React from 'react';
import Icon, { type IconProps } from './icon';

type IconNames = keyof typeof dynamicIconImports;

export interface LucideIconProps extends IconProps {
  name?: IconNames;
}

function toPascalCase(text: string) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text: string) {
  return text.replace(/-/, '').toUpperCase();
}

export const LucideIcon = React.forwardRef<HTMLSpanElement, LucideIconProps>((props, ref) => {
  const { name, className, ...rest } = props;

  const LucideIcon = name ? icons[toPascalCase(name) as keyof typeof icons] : undefined;

  return (
    <Icon
      ref={ref}
      className={cx('sk-lucide-icon', className)}
      icon={LucideIcon ? <LucideIcon /> : undefined}
      data-testid={name ? `sk-icon-${name}` : undefined}
      {...rest}
    />
  );
});

if (__DEV__) {
  LucideIcon.displayName = 'LucideIcon';
}

export default LucideIcon;
