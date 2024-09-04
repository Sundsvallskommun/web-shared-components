import { DefaultProps } from '@sk-web-gui/utils';
import React, { cloneElement } from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';

interface IAvatarProps extends DefaultProps {
  imageAlt?: string;
  imageElement?: React.ReactElement;
  placeholderImage?: string;
  imageUrl?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'juniskar' | 'bjornstigen' | 'gronsta' | 'vattjom' | string;
  accent?: boolean;
  rounded?: boolean;
}

export interface AvatarProps extends Omit<React.ComponentPropsWithRef<'div'>, 'color'>, IAvatarProps {}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const {
    imageElement,
    imageAlt,
    placeholderImage,
    imageUrl,
    className,
    size = 'md',
    color = 'juniskar',
    accent = false,
    initials = 'NN',
    rounded,
    ...rest
  } = props;

  const profile = imageUrl || placeholderImage || undefined;

  return (
    <div
      ref={ref}
      className={cx('sk-avatar', `sk-avatar-${size}`, className ? className : '')}
      data-color={color}
      data-accent={accent ? accent : undefined}
      data-rounded={rounded ? rounded : undefined}
      data-hasimage={!!profile || !!imageElement}
      {...rest}
    >
      {imageElement ? (
        cloneElement(imageElement, { className: `${imageElement.props.className} sk-avatar-img` })
      ) : profile ? (
        <img aria-label={imageAlt} src={profile} className="sk-avatar-img" alt={imageAlt || ''} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
});

if (__DEV__) {
  Avatar.displayName = 'Avatar';
}

export default Avatar;
