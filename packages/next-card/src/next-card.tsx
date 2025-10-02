import type { CardProps } from '@sk-web-gui/card';
import { __DEV__, cx, getValidChildren, PolymorphicComponentPropsWithRef, PolymorphicRef } from '@sk-web-gui/utils';
import Link from 'next/link';

import React, { cloneElement } from 'react';

export type NextCardProps = React.ComponentPropsWithRef<CardProps['Component']>;

type ICardProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C, NextCardProps>;

export const NextCard: React.ForwardRefExoticComponent<NextCardProps> = React.forwardRef(
  <C extends React.ElementType = 'div'>(props: ICardProps<C>, ref: React.Ref<PolymorphicRef<C>>) => {
    const {
      children,
      className,
      color = 'mono',
      invert = false,
      layout = 'vertical',
      useHoverEffect = false,
      href = '',
      ...rest
    } = props;
    const inverted = invert.toString();

    const validChildren = getValidChildren(children);

    const clones = validChildren.map((child) => {
      if (React.isValidElement<React.ComponentProps<CardProps['Image']>>(child)) {
        return cloneElement(child, {
          color,
          inverted,
        });
      }
      if (React.isValidElement<React.ComponentProps<CardProps['Body']>>(child)) {
        return cloneElement(child, {
          color,
          inverted,
        });
      }
      if (React.isValidElement<React.ComponentProps<CardProps['Text']>>(child)) {
        return cloneElement(child, {
          color,
        });
      }
      if (React.isValidElement<React.ComponentProps<CardProps['Header']>>(child)) {
        return cloneElement(child, {
          color,
        });
      }
      if (React.isValidElement<React.ComponentProps<CardProps['Meta']>>(child)) {
        return cloneElement(child, {
          color,
        });
      }
      return child;
    });

    return href !== '' ? (
      <Link
        href={href}
        data-color={color ? color : undefined}
        data-inverted={invert ? invert : undefined}
        data-layout={layout ? layout : undefined}
        className={cx('sk-link sk-card', { 'sk-card-use-hover-effect': useHoverEffect }, className)}
        {...rest}
        ref={ref}
      >
        {clones}
      </Link>
    ) : (
      <div
        data-color={color ? color : undefined}
        data-inverted={invert ? invert : undefined}
        data-layout={layout ? layout : undefined}
        className={cx('sk-card', { 'sk-card-use-hover-effect': useHoverEffect }, className)}
        {...rest}
        ref={ref}
      >
        {clones}
      </div>
    );
  }
);

if (__DEV__) {
  NextCard.displayName = 'NextCard';
}

export default NextCard;
