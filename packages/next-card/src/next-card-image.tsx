import type { CardProps } from '@sk-web-gui/card';
import { __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import Image from 'next/image';

export type CardImageProps = React.ComponentProps<CardProps['Image']> & React.ComponentProps<typeof Image>;

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>((props, ref) => {
  const { children, className, color, ...rest } = props;

  return (
    <Image data-color={color ? color : undefined} className={cx('sk-card-image', className)} ref={ref} {...rest}>
      {children}
    </Image>
  );
});

if (__DEV__) {
  CardImage.displayName = 'CardImage';
}
