import type { MetaCardProps } from '@sk-web-gui/card';
import { Icon } from '@sk-web-gui/icon';
import { __DEV__, cx, PolymorphicComponentPropsWithRef, PolymorphicRef } from '@sk-web-gui/utils';
import { ExternalLink, Text } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type IMetaCardProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  React.ComponentProps<MetaCardProps>
>;

export const MetaCard = React.forwardRef(
  <C extends React.ElementType = 'div'>(props: IMetaCardProps<C>, ref: React.Ref<PolymorphicRef<C>>) => {
    const {
      children,
      className,
      color = 'vattjom',
      useHoverEffect = false,
      href = '',
      size = 'sm',
      icon = <Text />,
      ...rest
    } = props;

    return useHoverEffect ? (
      <Link
        href={href}
        className={cx('sk-link sk-meta-card', { 'sk-meta-card-use-hover-effect': useHoverEffect }, className)}
        data-color={color ? color : undefined}
        data-size={size ? size : undefined}
        {...rest}
        ref={ref}
      >
        <Icon className={cx('sk-meta-card-text-icon', className)} size={36} icon={icon}></Icon>
        <div className={cx('sk-meta-card-body', className)}>{children}</div>
        <Icon className={cx('sk-meta-card-external-link-icon', className)} size={32} icon={<ExternalLink />}></Icon>
      </Link>
    ) : (
      <div
        className={cx('sk-meta-card', className)}
        data-color={color ? color : undefined}
        data-size={size ? size : undefined}
        {...rest}
        ref={ref}
      >
        <Icon className={cx('sk-meta-card-text-icon', className)} size={36} icon={icon}></Icon>
        <div className={cx('sk-meta-card-body', className)}>{children}</div>
        <div className={cx('sk-meta-card-external-link-icon', className)}></div>
      </div>
    );
  }
);

if (__DEV__) {
  MetaCard.displayName = 'MetaCard';
}
